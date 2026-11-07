import fs from 'fs';
import path from 'path';

function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // ignore
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.some(f => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(f => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toCamelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, g) => g.toUpperCase());
}

async function generate() {
  const categoriesCsvPath = path.resolve(process.cwd(), 'Data/konark_categories.csv');
  const productsCsvPath = path.resolve(process.cwd(), 'Data/konark_products.csv');

  const catRows = parseCsv(fs.readFileSync(categoriesCsvPath, 'utf-8'));
  const prodRows = parseCsv(fs.readFileSync(productsCsvPath, 'utf-8'));

  const catHeaders = catRows[0];
  const prodHeaders = prodRows[0];

  console.log(`Processing ${catRows.length - 1} categories and ${prodRows.length - 1} products...`);

  // Categories
  const categories = catRows.slice(1).map((row) => {
    const slug = row[0];
    const name = row[1];
    const parentId = row[2] ? row[2] : undefined;
    const group = row[3];
    const deviceScope = (row[4] || 'both').toLowerCase() as 'desktop' | 'laptop' | 'both';
    const sortOrder = parseInt(row[5] || '0', 10);
    const description = row[6] || '';
    const iconKey = row[7] || 'Box';
    const isActive = row[8]?.toUpperCase() === 'TRUE';

    return {
      id: slug,
      name,
      slug,
      ...(parentId ? { parentId } : {}),
      sortOrder,
      isActive,
      deviceScope,
      iconKey,
      description,
      group,
    };
  });

  // Brands (dynamically collected from products)
  const brandsMap = new Map<string, { id: string; name: string; slug: string; isActive: boolean }>();

  // Products
  const products: any[] = [];
  const categoryAttrsMap = new Map<string, Set<string>>();

  for (let i = 1; i < prodRows.length; i++) {
    const row = prodRows[i];
    if (row.length < 5 || !row[0]) continue;

    const rowObj: Record<string, string> = {};
    for (let c = 0; c < prodHeaders.length; c++) {
      rowObj[prodHeaders[c]] = row[c] || '';
    }

    const sku = rowObj.sku.trim();
    const id = slugify(sku);
    const name = rowObj.name.trim();
    const slug = slugify(name) + '-' + id;
    const categoryId = rowObj.category_slug.trim();
    const brandName = rowObj.brand.trim() || 'Generic';
    const brandId = slugify(brandName);

    if (!brandsMap.has(brandId)) {
      brandsMap.set(brandId, {
        id: brandId,
        name: brandName,
        slug: brandId,
        isActive: true,
      });
    }

    const conditionRaw = (rowObj.condition || 'new').toLowerCase();
    const condition = ['original', 'compatible', 'new', 'refurbished'].includes(conditionRaw)
      ? conditionRaw
      : 'new';

    const deviceScope = (rowObj.device_scope || 'both').toLowerCase();
    const pricePaise = parseInt(rowObj.price_paise || '0', 10) || Math.round(parseFloat(rowObj.price_incl_gst_inr || '0') * 100);
    const priceIncludesGst = rowObj.price_includes_gst?.toUpperCase() === 'TRUE';
    const gstRateBps = Math.round((parseFloat(rowObj.gst_rate_percent || '18') || 18) * 100);
    const hsnClean = (rowObj.hsn_code || '847330').replace(/\s+/g, '');
    const warrantyMonths = parseInt(rowObj.warranty_months || '12', 10) || 12;

    const stockStatusRaw = (rowObj.stock_status || 'in_stock').toLowerCase();
    const stockStatus = ['in_stock', 'low', 'out_of_stock', 'on_order'].includes(stockStatusRaw)
      ? stockStatusRaw
      : 'in_stock';
    const stockQty = rowObj.stock_qty ? parseInt(rowObj.stock_qty, 10) : undefined;

    // Compatible brands & models
    const compatibleBrands = rowObj.compatible_brands
      ? rowObj.compatible_brands.split(/[|,]/).map((b) => b.trim().toLowerCase()).filter(Boolean)
      : [];
    const compatibleModels = rowObj.compatible_models
      ? rowObj.compatible_models.split(/[|,]/).map((m) => m.trim().toLowerCase()).filter(Boolean)
      : [];

    // Extract specs
    const specs: Record<string, string | number | boolean | string[]> = {};
    const skipHeaders = new Set([
      'sku', 'name', 'category_slug', 'brand', 'condition', 'device_scope',
      'price_incl_gst_inr', 'price_paise', 'price_includes_gst', 'gst_rate_percent',
      'hsn_code', 'warranty_months', 'stock_status', 'stock_qty', 'is_active',
      'compatible_brands', 'compatible_models', 'price_confidence', 'notes',
      'image_url', 'image_alt'
    ]);

    if (!categoryAttrsMap.has(categoryId)) {
      categoryAttrsMap.set(categoryId, new Set());
    }

    for (const h of prodHeaders) {
      if (skipHeaders.has(h)) continue;
      const val = rowObj[h];
      if (val && val.length > 0) {
        const camelKey = toCamelCase(h);
        categoryAttrsMap.get(categoryId)!.add(camelKey);

        // Parse numbers or boolean where appropriate
        if (/^\d+$/.test(val)) {
          specs[camelKey] = parseInt(val, 10);
        } else if (/^\d+\.\d+$/.test(val)) {
          specs[camelKey] = parseFloat(val);
        } else if (val.toUpperCase() === 'YES' || val.toUpperCase() === 'TRUE') {
          specs[camelKey] = true;
        } else if (val.toUpperCase() === 'NO' || val.toUpperCase() === 'FALSE') {
          specs[camelKey] = false;
        } else if (val.includes('|')) {
          specs[camelKey] = val.split('|').map((v) => v.trim());
        } else {
          specs[camelKey] = val;
        }
      }
    }

    // Build compat object
    const compat: Record<string, any> = {
      deviceType: deviceScope,
      compatibleBrands,
      compatibleModels,
    };

    // Promote key compatibility fields into compat
    const compatFieldKeys = [
      'memoryType', 'memoryFormFactor', 'storageInterface', 'storageFormFactor',
      'socket', 'chipset', 'boardFormFactor', 'cpuFamily', 'cpuGeneration',
      'memorySupport', 'recommendedPsuW', 'wattage', 'connectorType', 'outputVoltage',
      'screenSizeIn', 'resolution', 'screenPin', 'coolerSupportedSockets', 'caseSupportedFormFactors'
    ];
    for (const k of compatFieldKeys) {
      if (specs[k] !== undefined) {
        compat[k] = specs[k];
      }
    }

    const searchKeywords = Array.from(
      new Set(
        [
          sku.toLowerCase(),
          ...name.toLowerCase().split(/[\s,()/-]+/),
          brandName.toLowerCase(),
          categoryId.toLowerCase(),
          ...compatibleBrands,
          ...compatibleModels,
        ].filter((w) => w.length > 1)
      )
    );

    products.push({
      id,
      sku,
      name,
      slug,
      categoryId,
      brandId,
      description: rowObj.notes || `${brandName} ${name}`,
      specs,
      compat,
      condition,
      warrantyMonths,
      pricing: {
        pricePaise,
        priceIncludesGst,
        gstRateBps,
        hsnCode: hsnClean,
      },
      stock: {
        status: stockStatus,
        ...(stockQty !== undefined ? { qty: stockQty } : {}),
      },
      images: rowObj.image_url
        ? [
            {
              id: `img-${id}`,
              url: rowObj.image_url,
              pathname: `products/${id}.jpg`,
              alt: rowObj.image_alt || name,
              isPrimary: true,
              sortOrder: 0,
              contentType: 'image/jpeg',
              sizeBytes: 50000,
              uploadedAt: { seconds: 1700000000, nanoseconds: 0 },
              uploadedBy: 'seed',
            },
          ]
        : [],
      isActive: true,
      searchKeywords,
      createdAt: { seconds: 1700000000, nanoseconds: 0 },
      updatedAt: { seconds: 1700000000, nanoseconds: 0 },
      createdBy: 'system',
    });
  }

  // Brands list
  const brands = Array.from(brandsMap.values());

  // Generate Attribute Definitions
  const compatKeysSet = new Set([
    'memoryType', 'memoryFormFactor', 'storageInterface', 'storageFormFactor',
    'socket', 'chipset', 'boardFormFactor', 'cpuFamily', 'cpuGeneration',
    'memorySupport', 'recommendedPsuW', 'wattage', 'connectorType', 'outputVoltage',
    'screenSizeIn', 'resolution', 'screenPin', 'coolerSupportedSockets', 'caseSupportedFormFactors'
  ]);

  const attributes: any[] = [];
  let attrCounter = 1;

  for (const [catId, attrSet] of categoryAttrsMap.entries()) {
    let order = 1;
    for (const key of attrSet) {
      const isCompat = compatKeysSet.has(key);
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase());

      // Collect sample options
      const sampleValues = new Set<string>();
      for (const p of products) {
        if (p.categoryId === catId && p.specs[key] !== undefined) {
          const val = p.specs[key];
          if (Array.isArray(val)) {
            val.forEach((v) => sampleValues.add(String(v)));
          } else {
            sampleValues.add(String(val));
          }
        }
      }

      const options = Array.from(sampleValues).slice(0, 20);

      attributes.push({
        id: `attr-${catId}-${key}`,
        categoryId: catId,
        key,
        label,
        type: options.length > 0 && options.length <= 15 ? 'enum' : 'text',
        options,
        filterable: true,
        compatKey: isCompat,
        displayOrder: order++,
        required: false,
      });
    }
  }

  // Compatibility Rules
  const rules = [
    // CPU vs Motherboard Socket
    {
      id: 'rule-cpu-mobo-socket',
      sourceCategoryId: 'processor',
      targetCategoryId: 'motherboard',
      constraints: [
        {
          sourceField: 'socket',
          targetField: 'socket',
          operator: 'eq',
        },
      ],
      severity: 'block',
      message: 'Motherboard socket must match processor socket (e.g. LGA1700, AM4, AM5)',
      isActive: true,
    },
    // Motherboard vs RAM Memory Type
    {
      id: 'rule-mobo-ram-type',
      sourceCategoryId: 'motherboard',
      targetCategoryId: 'ram-desktop',
      constraints: [
        {
          sourceField: 'memoryType',
          targetField: 'memoryType',
          operator: 'eq',
        },
      ],
      severity: 'block',
      message: 'Motherboard DDR generation (DDR4 vs DDR5) must match Desktop RAM module',
      isActive: true,
    },
    // CPU vs RAM via memorySupport
    {
      id: 'rule-cpu-ram-support',
      sourceCategoryId: 'processor',
      targetCategoryId: 'ram-desktop',
      constraints: [
        {
          sourceField: 'memorySupport',
          targetField: 'memoryType',
          operator: 'in',
        },
      ],
      severity: 'block',
      message: 'Processor memory controller must support RAM generation',
      isActive: true,
    },
    // CPU vs Cooler Socket
    {
      id: 'rule-cpu-cooler-socket',
      sourceCategoryId: 'processor',
      targetCategoryId: 'cpu-cooler',
      constraints: [
        {
          sourceField: 'socket',
          targetField: 'coolerSupportedSockets',
          operator: 'in',
        },
      ],
      severity: 'block',
      message: 'CPU cooler mounting brackets must support the CPU socket',
      isActive: true,
    },
    // GPU vs PSU Wattage
    {
      id: 'rule-gpu-psu-wattage',
      sourceCategoryId: 'graphics-card',
      targetCategoryId: 'power-supply',
      constraints: [
        {
          sourceField: 'recommendedPsuW',
          targetField: 'wattage',
          operator: 'lte',
        },
      ],
      severity: 'warn',
      message: 'Power Supply wattage should meet or exceed GPU recommended power',
      isActive: true,
    },
    // Motherboard vs Cabinet Form Factor
    {
      id: 'rule-mobo-case-size',
      sourceCategoryId: 'motherboard',
      targetCategoryId: 'cabinet',
      constraints: [
        {
          sourceField: 'boardFormFactor',
          targetField: 'caseSupportedFormFactors',
          operator: 'in',
        },
      ],
      severity: 'warn',
      message: 'Cabinet must accommodate motherboard form factor (ATX / mATX)',
      isActive: true,
    },
    // Laptop Charger: Brand & Connector
    {
      id: 'rule-laptop-charger-brand',
      sourceCategoryId: 'laptop-charger',
      targetCategoryId: 'laptop-battery',
      constraints: [
        {
          sourceField: 'brandId',
          targetField: 'brandId',
          operator: 'eq',
        },
      ],
      severity: 'warn',
      message: 'Laptop parts should match target laptop manufacturer brand',
      isActive: true,
    },
  ];

  // Standard Services
  const services = [
    {
      id: 'srv-assembly',
      name: 'Custom Desktop PC Assembly & Cable Management',
      sacCode: '998713',
      pricePaise: 80000, // Rs. 800
      priceIncludesGst: true,
      gstRateBps: 1800,
      isActive: true,
    },
    {
      id: 'srv-os-install',
      name: 'OS & Essential Drivers Installation',
      sacCode: '998713',
      pricePaise: 50000, // Rs. 500
      priceIncludesGst: true,
      gstRateBps: 1800,
      isActive: true,
    },
    {
      id: 'srv-laptop-ram-install',
      name: 'Laptop RAM / SSD Upgrade Service',
      sacCode: '998713',
      pricePaise: 35000, // Rs. 350
      priceIncludesGst: true,
      gstRateBps: 1800,
      isActive: true,
    },
    {
      id: 'srv-laptop-screen-fit',
      name: 'Laptop Screen Replacement Labour',
      sacCode: '998713',
      pricePaise: 60000, // Rs. 600
      priceIncludesGst: true,
      gstRateBps: 1800,
      isActive: true,
    },
    {
      id: 'srv-doorstep',
      name: 'Onsite / Doorstep Tech Visit (Rajkot City)',
      sacCode: '998713',
      pricePaise: 30000, // Rs. 300
      priceIncludesGst: true,
      gstRateBps: 1800,
      isActive: true,
    },
  ];

  const taxSettings = {
    shopStateCode: 24, // Gujarat
    defaultGstRateBps: 1800, // 18%
    displayMode: 'inclusive' as const,
    roundOff: true,
    quoteValidityDays: 7,
  };

  const companySettings = {
    legalName: 'Konark Computers',
    gstin: '24AAAAA0000A1Z5',
    address: '234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India',
    phone: '+91 942 642 9416',
    email: 'omesh_tank@yahoo.com',
    bankName: 'State Bank of India',
    bankAccountNo: '12345678901234',
    bankIfsc: 'SBIN0001234',
    upiId: 'konarkcomputers@upi',
    termsAndConditions: '1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.',
    footerNote: 'Konark Computers — Serving Rajkot Since 1999.',
  };

  // Generate TypeScript seed file
  const code = `// AUTO-GENERATED FROM Data/konark_categories.csv & Data/konark_products.csv
// Comprehensive seed data for Konark Computers Quotation System

import type {
  Category,
  Brand,
  AttributeDefinition,
  CompatibilityRule,
  ServiceItem,
  TaxSettings,
  CompanySettings,
  Product,
} from './types';

export const SEED_CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export const SEED_BRANDS: Brand[] = ${JSON.stringify(brands, null, 2)};

export const SEED_ATTRIBUTES: AttributeDefinition[] = ${JSON.stringify(attributes, null, 2)};

export const SEED_COMPATIBILITY_RULES: CompatibilityRule[] = ${JSON.stringify(rules, null, 2)};

export const SEED_SERVICES: ServiceItem[] = ${JSON.stringify(services, null, 2)};

export const SEED_TAX_SETTINGS: TaxSettings = ${JSON.stringify(taxSettings, null, 2)};

export const SEED_COMPANY_SETTINGS: CompanySettings = ${JSON.stringify(companySettings, null, 2)};

export const SEED_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

  const outputPath = path.resolve(process.cwd(), 'src/lib/db/seed-data.ts');
  fs.writeFileSync(outputPath, code, 'utf-8');
  console.log(`✅ Successfully generated ${outputPath}!`);
  console.log(`- Categories: ${categories.length}`);
  console.log(`- Brands: ${brands.length}`);
  console.log(`- Attributes: ${attributes.length}`);
  console.log(`- Rules: ${rules.length}`);
  console.log(`- Products: ${products.length}`);
}

generate().catch(console.error);

