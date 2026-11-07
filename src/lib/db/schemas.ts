import { z } from 'zod';

// ---------------------------------------------------------------------------
// Primitive & Reusable Validators
// ---------------------------------------------------------------------------

export const firestoreTimestampSchema = z.object({
  seconds: z.number().int(),
  nanoseconds: z.number().int(),
});

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+91[6-9]\d{9}$/, 'Must be a valid Indian phone number starting with +91 (e.g. +919426429416)');

export const gstinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/,
    'Invalid GSTIN format (e.g. 24AAAAA0000A1Z5)'
  );

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens');

export const hsnSchema = z
  .string()
  .trim()
  .regex(/^\d{4,8}$/, 'HSN code must be 4 to 8 digits');

export const sacSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, 'SAC code must be 6 digits');

// State code is Indian GST State Code (1-37, Gujarat is 24)
export const stateCodeSchema = z.number().int().min(1).max(37);

// ---------------------------------------------------------------------------
// Category Schema
// ---------------------------------------------------------------------------

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).trim(),
  slug: slugSchema,
  parentId: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  deviceScope: z.enum(['desktop', 'laptop', 'both']).default('both'),
  iconKey: z.string().default('Box'),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
});

export const categoryInputSchema = categorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ---------------------------------------------------------------------------
// Brand Schema
// ---------------------------------------------------------------------------

export const productImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  pathname: z.string(),
  alt: z.string().default(''),
  isPrimary: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  width: z.number().optional(),
  height: z.number().optional(),
  contentType: z.string(),
  sizeBytes: z.number().int().nonnegative(),
  uploadedAt: firestoreTimestampSchema,
  uploadedBy: z.string(),
});

export const brandSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).trim(),
  slug: slugSchema,
  isActive: z.boolean().default(true),
  logoImage: productImageSchema.optional(),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
});

export const brandInputSchema = brandSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ---------------------------------------------------------------------------
// Attribute Definition Schema
// ---------------------------------------------------------------------------

export const attributeDefinitionSchema = z.object({
  id: z.string(),
  categoryId: z.string().min(1),
  key: z.string().min(1).regex(/^[a-zA-Z0-9_]+$/, 'Key must be alphanumeric/underscore'),
  label: z.string().min(1).max(100).trim(),
  type: z.enum(['enum', 'number', 'boolean', 'text', 'multi']),
  options: z.array(z.string().trim()).default([]),
  unit: z.string().optional(),
  filterable: z.boolean().default(false),
  compatKey: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
  required: z.boolean().default(false),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
});

export const attributeDefinitionInputSchema = attributeDefinitionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ---------------------------------------------------------------------------
// Product Schema
// ---------------------------------------------------------------------------

export const productPricingSchema = z.object({
  pricePaise: z.number().int().nonnegative(),
  priceIncludesGst: z.boolean().default(true),
  gstRateBps: z.number().int().min(0).max(10000).default(1800), // 1800 = 18%
  hsnCode: hsnSchema,
});

export const productStockSchema = z.object({
  status: z.enum(['in_stock', 'low', 'out_of_stock', 'on_order']).default('in_stock'),
  qty: z.number().int().nonnegative().optional(),
});

export const productCompatSchema = z.object({
  deviceType: z.enum(['desktop', 'laptop', 'both']).optional(),
  compatibleBrands: z.array(z.string().toLowerCase().trim()).default([]),
  compatibleModels: z.array(z.string().toLowerCase().trim()).default([]),
}).passthrough();

export const productSchema = z.object({
  id: z.string(),
  sku: z.string().min(1).max(50).trim().toUpperCase(),
  name: z.string().min(1).max(200).trim(),
  slug: slugSchema,
  categoryId: z.string().min(1),
  brandId: z.string().min(1),
  description: z.string().default(''),
  specs: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])).default({}),
  compat: productCompatSchema.default({ compatibleBrands: [], compatibleModels: [] }),
  condition: z.enum(['original', 'compatible', 'new', 'refurbished']).default('new'),
  warrantyMonths: z.number().int().nonnegative().default(12),
  pricing: productPricingSchema,
  stock: productStockSchema,
  images: z.array(productImageSchema).default([]),
  isActive: z.boolean().default(true),
  searchKeywords: z.array(z.string().toLowerCase().trim()).default([]),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
  createdBy: z.string().default('system'),
});

export const productInputSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ---------------------------------------------------------------------------
// Service Item Schema
// ---------------------------------------------------------------------------

export const serviceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(150).trim(),
  sacCode: sacSchema,
  pricePaise: z.number().int().nonnegative(),
  priceIncludesGst: z.boolean().default(true),
  gstRateBps: z.number().int().min(0).max(10000).default(1800),
  isActive: z.boolean().default(true),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
});

// ---------------------------------------------------------------------------
// Compatibility Rules Schema
// ---------------------------------------------------------------------------

export const compatConstraintSchema = z.object({
  sourceField: z.string().min(1),
  targetField: z.string().min(1),
  operator: z.enum(['eq', 'in', 'intersects', 'lte', 'gte']),
});

export const compatibilityRuleSchema = z.object({
  id: z.string(),
  sourceCategoryId: z.string().min(1),
  targetCategoryId: z.string().min(1),
  constraints: z.array(compatConstraintSchema).min(1),
  severity: z.enum(['block', 'warn']).default('block'),
  message: z.string().min(1).max(250).trim(),
  isActive: z.boolean().default(true),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
});

export const compatibilityRuleInputSchema = compatibilityRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ---------------------------------------------------------------------------
// Settings Schemas
// ---------------------------------------------------------------------------

export const taxSettingsSchema = z.object({
  shopStateCode: stateCodeSchema.default(24), // Gujarat
  defaultGstRateBps: z.number().int().min(0).max(10000).default(1800),
  displayMode: z.enum(['inclusive', 'exclusive']).default('inclusive'),
  roundOff: z.boolean().default(true),
  quoteValidityDays: z.number().int().min(1).max(365).default(7),
});

export const companySettingsSchema = z.object({
  legalName: z.string().min(1).max(150).default('Konark Computers'),
  gstin: z.string().default(''),
  address: z.string().min(1).default('234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India'),
  phone: z.string().min(1).default('+91 942 642 9416'),
  email: z.string().email().default('omesh_tank@yahoo.com'),
  bankName: z.string().optional(),
  bankAccountNo: z.string().optional(),
  bankIfsc: z.string().optional(),
  upiId: z.string().optional(),
  termsAndConditions: z.string().default('1. Quotation is valid for specified days only.\n2. Prices are subject to stock availability.\n3. Warranty as per manufacturer/OEM terms.'),
  footerNote: z.string().default('Thank you for choosing Konark Computers — Serving Rajkot since 1999.'),
});

// ---------------------------------------------------------------------------
// Customer & Quote Schemas
// ---------------------------------------------------------------------------

export const quoteCustomerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  phone: phoneSchema,
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  city: z.string().max(100).optional().or(z.literal('')),
  stateCode: stateCodeSchema.default(24),
  stateName: z.string().min(1).max(100).default('Gujarat'),
  company: z.string().max(150).optional().or(z.literal('')),
  gstin: gstinSchema.optional().or(z.literal('')),
});

export const quoteDeviceContextSchema = z.object({
  deviceType: z.enum(['desktop', 'laptop']).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
});

// Public Quote Submission Payload
export const quoteSubmissionSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        qty: z.number().int().min(1).max(100),
      })
    )
    .min(1, 'Please select at least one item')
    .max(50),
  customer: quoteCustomerSchema,
  deviceContext: quoteDeviceContextSchema.optional(),
  notes: z.string().max(2000).optional(),
  turnstileToken: z.string().optional(),
  honeypot: z.string().max(0, 'Bot detected').optional(), // honeypot must be empty
});

export type QuoteSubmissionInput = z.infer<typeof quoteSubmissionSchema>;
