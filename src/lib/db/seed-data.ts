// AUTO-GENERATED FROM Data/konark_categories.csv & Data/konark_products.csv
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

export const SEED_CATEGORIES: Category[] = [
  {
    "id": "ram",
    "name": "RAM Memory",
    "slug": "ram",
    "sortOrder": 1,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "memory",
    "description": "Desktop and laptop memory upgrades (DDR3 / DDR4 / DDR5)",
    "group": "Memory"
  },
  {
    "id": "ram-desktop",
    "name": "Desktop RAM (DIMM)",
    "slug": "ram-desktop",
    "parentId": "ram",
    "sortOrder": 1,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "memory",
    "description": "Full-size DIMM modules for desktop PCs",
    "group": "Memory"
  },
  {
    "id": "ram-laptop",
    "name": "Laptop RAM (SODIMM)",
    "slug": "ram-laptop",
    "parentId": "ram",
    "sortOrder": 2,
    "isActive": true,
    "deviceScope": "laptop",
    "iconKey": "memory",
    "description": "Compact SODIMM modules for laptops and mini-PCs",
    "group": "Memory"
  },
  {
    "id": "hard-disk",
    "name": "Hard Disk & SSD",
    "slug": "hard-disk",
    "sortOrder": 2,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "hard-drive",
    "description": "Internal and external drives for desktops and laptops",
    "group": "Storage"
  },
  {
    "id": "hdd-internal",
    "name": "Internal Hard Disk (HDD)",
    "slug": "hdd-internal",
    "parentId": "hard-disk",
    "sortOrder": 1,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "hard-drive",
    "description": "3.5\" desktop, 2.5\" laptop and surveillance hard disks",
    "group": "Storage"
  },
  {
    "id": "ssd-sata",
    "name": "SATA SSD (2.5\")",
    "slug": "ssd-sata",
    "parentId": "hard-disk",
    "sortOrder": 2,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "hard-drive",
    "description": "2.5-inch SATA solid-state drives",
    "group": "Storage"
  },
  {
    "id": "ssd-nvme",
    "name": "NVMe SSD (M.2)",
    "slug": "ssd-nvme",
    "parentId": "hard-disk",
    "sortOrder": 3,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "hard-drive",
    "description": "M.2 2280 PCIe NVMe solid-state drives",
    "group": "Storage"
  },
  {
    "id": "external-drive",
    "name": "External Hard Disk",
    "slug": "external-drive",
    "parentId": "hard-disk",
    "sortOrder": 4,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "hard-drive",
    "description": "Portable USB 3.0 external drives",
    "group": "Storage"
  },
  {
    "id": "usb-mouse",
    "name": "USB Mouse",
    "slug": "usb-mouse",
    "sortOrder": 3,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "mouse",
    "description": "Wired, wireless and Bluetooth mice from top brands",
    "group": "Peripherals"
  },
  {
    "id": "keyboard",
    "name": "Keyboard",
    "slug": "keyboard",
    "sortOrder": 4,
    "isActive": true,
    "deviceScope": "both",
    "iconKey": "keyboard",
    "description": "USB, wireless and combo keyboards",
    "group": "Peripherals"
  },
  {
    "id": "laptop-charger",
    "name": "Laptop Charger",
    "slug": "laptop-charger",
    "sortOrder": 5,
    "isActive": true,
    "deviceScope": "laptop",
    "iconKey": "plug",
    "description": "Original and compatible chargers for all laptop brands",
    "group": "Laptop Parts"
  },
  {
    "id": "laptop-screen",
    "name": "Laptop Screen",
    "slug": "laptop-screen",
    "sortOrder": 6,
    "isActive": true,
    "deviceScope": "laptop",
    "iconKey": "monitor",
    "description": "LCD/LED replacement screens by size, resolution and pin",
    "group": "Laptop Parts"
  },
  {
    "id": "laptop-battery",
    "name": "Laptop Battery",
    "slug": "laptop-battery",
    "sortOrder": 7,
    "isActive": true,
    "deviceScope": "laptop",
    "iconKey": "battery",
    "description": "Genuine and compatible laptop batteries",
    "group": "Laptop Parts"
  },
  {
    "id": "laptop-keyboard",
    "name": "Laptop Keyboard",
    "slug": "laptop-keyboard",
    "sortOrder": 8,
    "isActive": true,
    "deviceScope": "laptop",
    "iconKey": "keyboard",
    "description": "Replacement keyboards for all laptop brands",
    "group": "Laptop Parts"
  },
  {
    "id": "processor",
    "name": "Processor (CPU)",
    "slug": "processor",
    "sortOrder": 9,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "cpu",
    "description": "Intel and AMD desktop processors (LGA1700, LGA1851, AM4, AM5)",
    "group": "Desktop Build"
  },
  {
    "id": "motherboard",
    "name": "Motherboard",
    "slug": "motherboard",
    "sortOrder": 10,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "circuit-board",
    "description": "Intel and AMD motherboards by socket, chipset and size",
    "group": "Desktop Build"
  },
  {
    "id": "graphics-card",
    "name": "Graphics Card (GPU)",
    "slug": "graphics-card",
    "sortOrder": 11,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "gpu",
    "description": "NVIDIA and AMD graphics cards",
    "group": "Desktop Build"
  },
  {
    "id": "power-supply",
    "name": "Power Supply (SMPS)",
    "slug": "power-supply",
    "sortOrder": 12,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "zap",
    "description": "ATX power supplies from 400W to 850W",
    "group": "Desktop Build"
  },
  {
    "id": "cabinet",
    "name": "Cabinet (CPU Case)",
    "slug": "cabinet",
    "sortOrder": 13,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "box",
    "description": "ATX and mATX cabinets",
    "group": "Desktop Build"
  },
  {
    "id": "cpu-cooler",
    "name": "CPU Cooler",
    "slug": "cpu-cooler",
    "sortOrder": 14,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "fan",
    "description": "Air coolers, liquid coolers and thermal paste",
    "group": "Desktop Build"
  },
  {
    "id": "cabinet-fan",
    "name": "Cabinet Fan",
    "slug": "cabinet-fan",
    "sortOrder": 15,
    "isActive": true,
    "deviceScope": "desktop",
    "iconKey": "fan",
    "description": "120mm case fans",
    "group": "Desktop Build"
  }
];

export const SEED_BRANDS: Brand[] = [
  {
    "id": "adata",
    "name": "Adata",
    "slug": "adata",
    "isActive": true
  },
  {
    "id": "kingston",
    "name": "Kingston",
    "slug": "kingston",
    "isActive": true
  },
  {
    "id": "crucial",
    "name": "Crucial",
    "slug": "crucial",
    "isActive": true
  },
  {
    "id": "evm",
    "name": "EVM",
    "slug": "evm",
    "isActive": true
  },
  {
    "id": "corsair",
    "name": "Corsair",
    "slug": "corsair",
    "isActive": true
  },
  {
    "id": "seagate",
    "name": "Seagate",
    "slug": "seagate",
    "isActive": true
  },
  {
    "id": "wd",
    "name": "WD",
    "slug": "wd",
    "isActive": true
  },
  {
    "id": "toshiba",
    "name": "Toshiba",
    "slug": "toshiba",
    "isActive": true
  },
  {
    "id": "samsung",
    "name": "Samsung",
    "slug": "samsung",
    "isActive": true
  },
  {
    "id": "hp",
    "name": "HP",
    "slug": "hp",
    "isActive": true
  },
  {
    "id": "dell",
    "name": "Dell",
    "slug": "dell",
    "isActive": true
  },
  {
    "id": "lenovo",
    "name": "Lenovo",
    "slug": "lenovo",
    "isActive": true
  },
  {
    "id": "asus",
    "name": "Asus",
    "slug": "asus",
    "isActive": true
  },
  {
    "id": "acer",
    "name": "Acer",
    "slug": "acer",
    "isActive": true
  },
  {
    "id": "sony",
    "name": "Sony",
    "slug": "sony",
    "isActive": true
  },
  {
    "id": "universal",
    "name": "Universal",
    "slug": "universal",
    "isActive": true
  },
  {
    "id": "generic",
    "name": "Generic",
    "slug": "generic",
    "isActive": true
  },
  {
    "id": "lg-display",
    "name": "LG Display",
    "slug": "lg-display",
    "isActive": true
  },
  {
    "id": "boe",
    "name": "BOE",
    "slug": "boe",
    "isActive": true
  },
  {
    "id": "logitech",
    "name": "Logitech",
    "slug": "logitech",
    "isActive": true
  },
  {
    "id": "zebronics",
    "name": "Zebronics",
    "slug": "zebronics",
    "isActive": true
  },
  {
    "id": "redragon",
    "name": "Redragon",
    "slug": "redragon",
    "isActive": true
  },
  {
    "id": "intel",
    "name": "Intel",
    "slug": "intel",
    "isActive": true
  },
  {
    "id": "amd",
    "name": "AMD",
    "slug": "amd",
    "isActive": true
  },
  {
    "id": "gigabyte",
    "name": "Gigabyte",
    "slug": "gigabyte",
    "isActive": true
  },
  {
    "id": "msi",
    "name": "MSI",
    "slug": "msi",
    "isActive": true
  },
  {
    "id": "asrock",
    "name": "ASRock",
    "slug": "asrock",
    "isActive": true
  },
  {
    "id": "inno3d",
    "name": "Inno3D",
    "slug": "inno3d",
    "isActive": true
  },
  {
    "id": "antec",
    "name": "Antec",
    "slug": "antec",
    "isActive": true
  },
  {
    "id": "deepcool",
    "name": "Deepcool",
    "slug": "deepcool",
    "isActive": true
  },
  {
    "id": "cooler-master",
    "name": "Cooler Master",
    "slug": "cooler-master",
    "isActive": true
  },
  {
    "id": "ant-esports",
    "name": "Ant Esports",
    "slug": "ant-esports",
    "isActive": true
  },
  {
    "id": "super-flower",
    "name": "Super Flower",
    "slug": "super-flower",
    "isActive": true
  },
  {
    "id": "thermaltake",
    "name": "Thermaltake",
    "slug": "thermaltake",
    "isActive": true
  },
  {
    "id": "lian-li",
    "name": "Lian Li",
    "slug": "lian-li",
    "isActive": true
  }
];

export const SEED_ATTRIBUTES: AttributeDefinition[] = [
  {
    "id": "attr-ram-desktop-memoryType",
    "categoryId": "ram-desktop",
    "key": "memoryType",
    "label": "Memory Type",
    "type": "enum",
    "options": [
      "DDR3",
      "DDR4",
      "DDR5"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-ram-desktop-memoryFormFactor",
    "categoryId": "ram-desktop",
    "key": "memoryFormFactor",
    "label": "Memory Form Factor",
    "type": "enum",
    "options": [
      "DIMM"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-ram-desktop-capacityGb",
    "categoryId": "ram-desktop",
    "key": "capacityGb",
    "label": "Capacity Gb",
    "type": "enum",
    "options": [
      "4",
      "8",
      "16",
      "32"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-ram-desktop-speedMhz",
    "categoryId": "ram-desktop",
    "key": "speedMhz",
    "label": "Speed Mhz",
    "type": "enum",
    "options": [
      "1600",
      "2666",
      "3200",
      "4800",
      "5600",
      "6000"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-ram-desktop-modulesInPack",
    "categoryId": "ram-desktop",
    "key": "modulesInPack",
    "label": "Modules In Pack",
    "type": "enum",
    "options": [
      "1",
      "2"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-ram-laptop-memoryType",
    "categoryId": "ram-laptop",
    "key": "memoryType",
    "label": "Memory Type",
    "type": "enum",
    "options": [
      "DDR3",
      "DDR4",
      "DDR5"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-ram-laptop-memoryFormFactor",
    "categoryId": "ram-laptop",
    "key": "memoryFormFactor",
    "label": "Memory Form Factor",
    "type": "enum",
    "options": [
      "SODIMM"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-ram-laptop-capacityGb",
    "categoryId": "ram-laptop",
    "key": "capacityGb",
    "label": "Capacity Gb",
    "type": "enum",
    "options": [
      "4",
      "8",
      "16",
      "32"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-ram-laptop-speedMhz",
    "categoryId": "ram-laptop",
    "key": "speedMhz",
    "label": "Speed Mhz",
    "type": "enum",
    "options": [
      "1600",
      "2666",
      "3200",
      "4800",
      "5600"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-ram-laptop-modulesInPack",
    "categoryId": "ram-laptop",
    "key": "modulesInPack",
    "label": "Modules In Pack",
    "type": "enum",
    "options": [
      "1"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-hdd-internal-capacityGb",
    "categoryId": "hdd-internal",
    "key": "capacityGb",
    "label": "Capacity Gb",
    "type": "enum",
    "options": [
      "1000",
      "2000",
      "4000",
      "500"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-hdd-internal-storageType",
    "categoryId": "hdd-internal",
    "key": "storageType",
    "label": "Storage Type",
    "type": "enum",
    "options": [
      "HDD"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-hdd-internal-storageInterface",
    "categoryId": "hdd-internal",
    "key": "storageInterface",
    "label": "Storage Interface",
    "type": "enum",
    "options": [
      "SATA III"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-hdd-internal-storageFormFactor",
    "categoryId": "hdd-internal",
    "key": "storageFormFactor",
    "label": "Storage Form Factor",
    "type": "enum",
    "options": [
      "3.5\"",
      "2.5\""
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-hdd-internal-rpm",
    "categoryId": "hdd-internal",
    "key": "rpm",
    "label": "Rpm",
    "type": "enum",
    "options": [
      "7200",
      "5400"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-hdd-internal-usageClass",
    "categoryId": "hdd-internal",
    "key": "usageClass",
    "label": "Usage Class",
    "type": "enum",
    "options": [
      "Desktop",
      "Surveillance (CCTV/DVR)",
      "Laptop"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 6,
    "required": false
  },
  {
    "id": "attr-ssd-sata-capacityGb",
    "categoryId": "ssd-sata",
    "key": "capacityGb",
    "label": "Capacity Gb",
    "type": "enum",
    "options": [
      "120",
      "240",
      "480",
      "960",
      "500",
      "1000",
      "2000"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-ssd-sata-storageType",
    "categoryId": "ssd-sata",
    "key": "storageType",
    "label": "Storage Type",
    "type": "enum",
    "options": [
      "SSD"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-ssd-sata-storageInterface",
    "categoryId": "ssd-sata",
    "key": "storageInterface",
    "label": "Storage Interface",
    "type": "enum",
    "options": [
      "SATA III"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-ssd-sata-storageFormFactor",
    "categoryId": "ssd-sata",
    "key": "storageFormFactor",
    "label": "Storage Form Factor",
    "type": "enum",
    "options": [
      "2.5\""
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-ssd-sata-usageClass",
    "categoryId": "ssd-sata",
    "key": "usageClass",
    "label": "Usage Class",
    "type": "enum",
    "options": [
      "Desktop & Laptop"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-ssd-nvme-capacityGb",
    "categoryId": "ssd-nvme",
    "key": "capacityGb",
    "label": "Capacity Gb",
    "type": "enum",
    "options": [
      "250",
      "500",
      "1000",
      "2000",
      "256",
      "512"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-ssd-nvme-storageType",
    "categoryId": "ssd-nvme",
    "key": "storageType",
    "label": "Storage Type",
    "type": "enum",
    "options": [
      "SSD"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-ssd-nvme-storageInterface",
    "categoryId": "ssd-nvme",
    "key": "storageInterface",
    "label": "Storage Interface",
    "type": "enum",
    "options": [
      "PCIe NVMe Gen4",
      "PCIe NVMe Gen3"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-ssd-nvme-storageFormFactor",
    "categoryId": "ssd-nvme",
    "key": "storageFormFactor",
    "label": "Storage Form Factor",
    "type": "enum",
    "options": [
      "M.2 2280"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-ssd-nvme-usageClass",
    "categoryId": "ssd-nvme",
    "key": "usageClass",
    "label": "Usage Class",
    "type": "enum",
    "options": [
      "Desktop & Laptop"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-external-drive-capacityGb",
    "categoryId": "external-drive",
    "key": "capacityGb",
    "label": "Capacity Gb",
    "type": "enum",
    "options": [
      "1000",
      "2000",
      "4000"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-external-drive-storageType",
    "categoryId": "external-drive",
    "key": "storageType",
    "label": "Storage Type",
    "type": "enum",
    "options": [
      "HDD"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-external-drive-storageInterface",
    "categoryId": "external-drive",
    "key": "storageInterface",
    "label": "Storage Interface",
    "type": "enum",
    "options": [
      "USB 3.0"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-external-drive-storageFormFactor",
    "categoryId": "external-drive",
    "key": "storageFormFactor",
    "label": "Storage Form Factor",
    "type": "enum",
    "options": [
      "2.5\" portable"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-external-drive-rpm",
    "categoryId": "external-drive",
    "key": "rpm",
    "label": "Rpm",
    "type": "enum",
    "options": [
      "5400"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-external-drive-usageClass",
    "categoryId": "external-drive",
    "key": "usageClass",
    "label": "Usage Class",
    "type": "enum",
    "options": [
      "External"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 6,
    "required": false
  },
  {
    "id": "attr-laptop-charger-wattage",
    "categoryId": "laptop-charger",
    "key": "wattage",
    "label": "Wattage",
    "type": "enum",
    "options": [
      "65",
      "45",
      "90",
      "130",
      "135",
      "120"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-laptop-charger-outputVoltage",
    "categoryId": "laptop-charger",
    "key": "outputVoltage",
    "label": "Output Voltage",
    "type": "text",
    "options": [
      "19.5V 3.33A",
      "19.5V 2.31A",
      "19.5V 4.62A",
      "18.5V 3.5A",
      "19.5V 3.34A",
      "19.5V 6.67A",
      "20V 3.25A",
      "20V 2.25A",
      "20V 4.5A",
      "20V 6.75A",
      "19V 2.37A",
      "19V 3.42A",
      "19V 4.74A",
      "19.5V 3.3A",
      "19V 3.16A",
      "5-20V PD",
      "12-24V adjustable"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-laptop-charger-connectorType",
    "categoryId": "laptop-charger",
    "key": "connectorType",
    "label": "Connector Type",
    "type": "text",
    "options": [
      "4.5mm Blue Pin",
      "7.4mm Big Pin (center pin)",
      "4.5mm Small Pin",
      "4.5mm Small Pin / 7.4mm (model dependent)",
      "Square USB Pin",
      "4.0x1.7mm Slim Tip (Yellow)",
      "7.9x5.5mm Yellow Pin (center pin)",
      "Slim Tip (rectangular)",
      "4.0x1.35mm Small Pin",
      "5.5x2.5mm Big Pin",
      "3.0x1.1mm Small Pin",
      "5.5x1.7mm Big Pin",
      "6.5x4.4mm Pin",
      "5.5x3.0mm Pin",
      "5.5x2.5mm Pin",
      "USB Type-C",
      "Multi-tip"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-laptop-charger-modelOrPartNo",
    "categoryId": "laptop-charger",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "enum",
    "options": [
      "Y5Y43AA",
      "944V0AA"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-laptop-battery-modelOrPartNo",
    "categoryId": "laptop-battery",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "enum",
    "options": [
      "HS04",
      "JC04",
      "OA04",
      "L12M4E01",
      "AL12A32",
      "AS10D31",
      "A41-X550A",
      "A32-K53",
      "VERIFY"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-laptop-screen-screenSizeIn",
    "categoryId": "laptop-screen",
    "key": "screenSizeIn",
    "label": "Screen Size In",
    "type": "enum",
    "options": [
      "11.6",
      "12.5",
      "13.3",
      "14",
      "15.6",
      "17.3"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-laptop-screen-resolution",
    "categoryId": "laptop-screen",
    "key": "resolution",
    "label": "Resolution",
    "type": "enum",
    "options": [
      "HD 1366x768",
      "FHD 1920x1080",
      "WUXGA 1920x1200",
      "HD+ 1600x900"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-laptop-screen-panelType",
    "categoryId": "laptop-screen",
    "key": "panelType",
    "label": "Panel Type",
    "type": "enum",
    "options": [
      "LED (TN)",
      "IPS",
      "IPS (144Hz gaming)"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-laptop-screen-screenPin",
    "categoryId": "laptop-screen",
    "key": "screenPin",
    "label": "Screen Pin",
    "type": "enum",
    "options": [
      "30",
      "40"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-laptop-screen-screenMounting",
    "categoryId": "laptop-screen",
    "key": "screenMounting",
    "label": "Screen Mounting",
    "type": "enum",
    "options": [
      "Slim",
      "Normal"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-laptop-screen-refreshRateHz",
    "categoryId": "laptop-screen",
    "key": "refreshRateHz",
    "label": "Refresh Rate Hz",
    "type": "enum",
    "options": [
      "60",
      "144"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 6,
    "required": false
  },
  {
    "id": "attr-laptop-screen-modelOrPartNo",
    "categoryId": "laptop-screen",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "enum",
    "options": [
      "LP125WH2-TPF1",
      "LP140WU2-SPB1",
      "NV156FHM-N48",
      "LP156WFG-SPF2"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 7,
    "required": false
  },
  {
    "id": "attr-laptop-keyboard-keyboardLayout",
    "categoryId": "laptop-keyboard",
    "key": "keyboardLayout",
    "label": "Keyboard Layout",
    "type": "enum",
    "options": [
      "US"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-laptop-keyboard-backlight",
    "categoryId": "laptop-keyboard",
    "key": "backlight",
    "label": "Backlight",
    "type": "enum",
    "options": [
      "false",
      "true"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-keyboard-modelOrPartNo",
    "categoryId": "keyboard",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "enum",
    "options": [
      "K120",
      "KB216",
      "100",
      "Essential Wired",
      "Companion 107",
      "K270",
      "K380",
      "MK215",
      "MK270",
      "230",
      "KM3322W",
      "KM2100",
      "K552 Kumara"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-keyboard-keyboardLayout",
    "categoryId": "keyboard",
    "key": "keyboardLayout",
    "label": "Keyboard Layout",
    "type": "enum",
    "options": [
      "US"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-keyboard-backlight",
    "categoryId": "keyboard",
    "key": "backlight",
    "label": "Backlight",
    "type": "enum",
    "options": [
      "false"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-keyboard-connection",
    "categoryId": "keyboard",
    "key": "connection",
    "label": "Connection",
    "type": "enum",
    "options": [
      "Wired USB",
      "Wireless 2.4GHz",
      "Bluetooth",
      "Wireless 2.4GHz Combo (Keyboard+Mouse)",
      "Wired USB Combo (Keyboard+Mouse)",
      "Wired USB Mechanical"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-usb-mouse-modelOrPartNo",
    "categoryId": "usb-mouse",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "enum",
    "options": [
      "B100",
      "MS116",
      "X1000",
      "300",
      "Comfort",
      "M185",
      "M235",
      "M331 Silent",
      "S1000 Plus",
      "WM126",
      "Pebble M350",
      "G102",
      "M601 Centrophorus"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-usb-mouse-connection",
    "categoryId": "usb-mouse",
    "key": "connection",
    "label": "Connection",
    "type": "enum",
    "options": [
      "Wired USB",
      "Wireless 2.4GHz",
      "Bluetooth + 2.4GHz",
      "Wired USB Gaming"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-processor-modelOrPartNo",
    "categoryId": "processor",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "text",
    "options": [
      "i3-12100F",
      "i3-12100",
      "i3-14100F",
      "i5-12400F",
      "i5-12400",
      "i5-13400F",
      "i5-14400F",
      "i5-14400",
      "i7-14700F",
      "Ultra 5 225F",
      "Ultra 5 225",
      "Ultra 5 245K",
      "Ultra 7 265K",
      "3 4100",
      "5 4500",
      "5 5500",
      "5 5600",
      "5 5600G",
      "7 5700X",
      "5 7500F"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-processor-socket",
    "categoryId": "processor",
    "key": "socket",
    "label": "Socket",
    "type": "enum",
    "options": [
      "LGA1700",
      "LGA1851",
      "AM4",
      "AM5"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-processor-cpuFamily",
    "categoryId": "processor",
    "key": "cpuFamily",
    "label": "Cpu Family",
    "type": "enum",
    "options": [
      "Core",
      "Ryzen"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-processor-cpuGeneration",
    "categoryId": "processor",
    "key": "cpuGeneration",
    "label": "Cpu Generation",
    "type": "enum",
    "options": [
      "12th Gen",
      "14th Gen",
      "13th Gen",
      "Core Ultra 200S",
      "Ryzen 4000",
      "Ryzen 5000",
      "Ryzen 5000G",
      "Ryzen 7000",
      "Ryzen 8000",
      "Ryzen 9000"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-processor-cores",
    "categoryId": "processor",
    "key": "cores",
    "label": "Cores",
    "type": "enum",
    "options": [
      "4",
      "6",
      "10",
      "20",
      "14",
      "8"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-processor-threads",
    "categoryId": "processor",
    "key": "threads",
    "label": "Threads",
    "type": "enum",
    "options": [
      "8",
      "12",
      "16",
      "28",
      "10",
      "14",
      "20"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 6,
    "required": false
  },
  {
    "id": "attr-processor-baseClockGhz",
    "categoryId": "processor",
    "key": "baseClockGhz",
    "label": "Base Clock Ghz",
    "type": "enum",
    "options": [
      "3.3",
      "3.5",
      "2.5",
      "2.1",
      "4.2",
      "3.9",
      "3.8",
      "3.6",
      "3.4",
      "3.7"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 7,
    "required": false
  },
  {
    "id": "attr-processor-boostClockGhz",
    "categoryId": "processor",
    "key": "boostClockGhz",
    "label": "Boost Clock Ghz",
    "type": "enum",
    "options": [
      "4.3",
      "4.7",
      "4.4",
      "4.6",
      "5.4",
      "4.9",
      "5.2",
      "5.5",
      "4",
      "4.1",
      "4.2",
      "5",
      "5.1",
      "5.3"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 8,
    "required": false
  },
  {
    "id": "attr-processor-tdpW",
    "categoryId": "processor",
    "key": "tdpW",
    "label": "Tdp W",
    "type": "enum",
    "options": [
      "58",
      "60",
      "65",
      "125",
      "120"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 9,
    "required": false
  },
  {
    "id": "attr-processor-integratedGraphics",
    "categoryId": "processor",
    "key": "integratedGraphics",
    "label": "Integrated Graphics",
    "type": "enum",
    "options": [
      "false",
      "true"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 10,
    "required": false
  },
  {
    "id": "attr-processor-coolerIncluded",
    "categoryId": "processor",
    "key": "coolerIncluded",
    "label": "Cooler Included",
    "type": "enum",
    "options": [
      "true",
      "No (cooler required)",
      "Varies (box/tray)"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 11,
    "required": false
  },
  {
    "id": "attr-processor-memorySupport",
    "categoryId": "processor",
    "key": "memorySupport",
    "label": "Memory Support",
    "type": "enum",
    "options": [
      "DDR4",
      "DDR5"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 12,
    "required": false
  },
  {
    "id": "attr-motherboard-modelOrPartNo",
    "categoryId": "motherboard",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "text",
    "options": [
      "H610M S2 V2 DDR4",
      "PRO H610M-E DDR4",
      "H610M-HDV/M.2+",
      "Prime H610M-F WiFi D4",
      "PRO H610M-S DDR5",
      "Prime B760M-K D4",
      "PRO B760M-E DDR4",
      "B760 Pro RS/D4",
      "B760M-AYW WiFi D4 II",
      "B760M D2H DDR5",
      "TUF Gaming B760M-PLUS WiFi II",
      "A520M K V2",
      "MAG A520M Vector WiFi",
      "Prime B550M-K ARGB",
      "B550M DS3H AC R2",
      "B550M Gaming X WiFi6",
      "B550 UD AC WiFi",
      "Prime B550-PLUS AC-HES",
      "A620M S2H",
      "PRO A620M-E"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-motherboard-memoryType",
    "categoryId": "motherboard",
    "key": "memoryType",
    "label": "Memory Type",
    "type": "enum",
    "options": [
      "DDR4",
      "DDR5"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-motherboard-memoryFormFactor",
    "categoryId": "motherboard",
    "key": "memoryFormFactor",
    "label": "Memory Form Factor",
    "type": "enum",
    "options": [
      "DIMM"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-motherboard-socket",
    "categoryId": "motherboard",
    "key": "socket",
    "label": "Socket",
    "type": "enum",
    "options": [
      "LGA1700",
      "AM4",
      "AM5",
      "LGA1851"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-motherboard-chipset",
    "categoryId": "motherboard",
    "key": "chipset",
    "label": "Chipset",
    "type": "enum",
    "options": [
      "H610",
      "B760",
      "A520",
      "B550",
      "A620",
      "B650",
      "B850",
      "H810",
      "B860"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-motherboard-boardFormFactor",
    "categoryId": "motherboard",
    "key": "boardFormFactor",
    "label": "Board Form Factor",
    "type": "enum",
    "options": [
      "mATX",
      "ATX"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 6,
    "required": false
  },
  {
    "id": "attr-motherboard-memorySlots",
    "categoryId": "motherboard",
    "key": "memorySlots",
    "label": "Memory Slots",
    "type": "enum",
    "options": [
      "2",
      "4"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 7,
    "required": false
  },
  {
    "id": "attr-motherboard-maxMemoryGb",
    "categoryId": "motherboard",
    "key": "maxMemoryGb",
    "label": "Max Memory Gb",
    "type": "enum",
    "options": [
      "64",
      "96",
      "128",
      "192"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 8,
    "required": false
  },
  {
    "id": "attr-motherboard-m2Slots",
    "categoryId": "motherboard",
    "key": "m2Slots",
    "label": "M2 Slots",
    "type": "enum",
    "options": [
      "1",
      "2",
      "3"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 9,
    "required": false
  },
  {
    "id": "attr-motherboard-wifi",
    "categoryId": "motherboard",
    "key": "wifi",
    "label": "Wifi",
    "type": "enum",
    "options": [
      "false",
      "true"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 10,
    "required": false
  },
  {
    "id": "attr-motherboard-cpuGenSupport",
    "categoryId": "motherboard",
    "key": "cpuGenSupport",
    "label": "Cpu Gen Support",
    "type": "enum",
    "options": [
      "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)",
      "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)",
      "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)",
      "Ryzen 7000/8000/9000",
      "Intel Core Ultra 200S"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 11,
    "required": false
  },
  {
    "id": "attr-graphics-card-modelOrPartNo",
    "categoryId": "graphics-card",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "text",
    "options": [
      "GeForce GT 710 LP",
      "GeForce GT 730 LP",
      "GeForce GTX 1630 Ventus XS OC",
      "GeForce GTX 1650 D6 OC",
      "GeForce GTX 1650 D6 Ventus XS OC",
      "Dual GeForce GTX 1650 OC EVO",
      "GeForce RTX 3050 WINDFORCE OC V2",
      "GeForce RTX 3050 Ventus 2X E OC",
      "GeForce RTX 3050 Twin X2 OC",
      "GeForce RTX 5050 Twin X2",
      "Dual GeForce RTX 5050 OC",
      "GeForce RTX 5060 Twin X2 OC V2",
      "GeForce RTX 5060 WINDFORCE MAX OC",
      "GeForce RTX 5060 Ti WINDFORCE MAX OC",
      "GeForce RTX 5060 Ti Twin X2",
      "Prime Radeon RX 9060 XT OC",
      "Dual Radeon RX 9060 XT"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-graphics-card-tdpW",
    "categoryId": "graphics-card",
    "key": "tdpW",
    "label": "Tdp W",
    "type": "enum",
    "options": [
      "19",
      "25",
      "75",
      "70",
      "130",
      "145",
      "180",
      "160"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-graphics-card-gpuChipset",
    "categoryId": "graphics-card",
    "key": "gpuChipset",
    "label": "Gpu Chipset",
    "type": "enum",
    "options": [
      "NVIDIA GeForce GT 710",
      "NVIDIA GeForce GT 730",
      "NVIDIA GeForce GTX 1630",
      "NVIDIA GeForce GTX 1650",
      "NVIDIA GeForce RTX 3050",
      "NVIDIA GeForce RTX 5050",
      "NVIDIA GeForce RTX 5060",
      "NVIDIA GeForce RTX 5060 Ti",
      "AMD Radeon RX 9060 XT"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-graphics-card-vramGb",
    "categoryId": "graphics-card",
    "key": "vramGb",
    "label": "Vram Gb",
    "type": "enum",
    "options": [
      "1",
      "4",
      "6",
      "8",
      "16"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-graphics-card-gpuPowerConnector",
    "categoryId": "graphics-card",
    "key": "gpuPowerConnector",
    "label": "Gpu Power Connector",
    "type": "enum",
    "options": [
      "None (slot powered)",
      "1x 8-pin"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 5,
    "required": false
  },
  {
    "id": "attr-graphics-card-recommendedPsuW",
    "categoryId": "graphics-card",
    "key": "recommendedPsuW",
    "label": "Recommended Psu W",
    "type": "enum",
    "options": [
      "300",
      "550",
      "600",
      "500"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 6,
    "required": false
  },
  {
    "id": "attr-power-supply-modelOrPartNo",
    "categoryId": "power-supply",
    "key": "modelOrPartNo",
    "label": "Model Or Part No",
    "type": "text",
    "options": [
      "Zeb-PGP450W",
      "Atom V550",
      "Atom V650 V2",
      "NeoEco 550M",
      "PF550",
      "PK550D",
      "PL650D",
      "PN850M",
      "Elite V3",
      "MWE 450 V2",
      "MWE 550 Bronze V3",
      "MWE 650 Bronze V3",
      "MWE 750 Bronze V3",
      "MWE Gold 750 V2",
      "MWE Gold 850 V2",
      "CV550",
      "CV650",
      "CX550",
      "CX650",
      "CX750"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-power-supply-wattage",
    "categoryId": "power-supply",
    "key": "wattage",
    "label": "Wattage",
    "type": "enum",
    "options": [
      "450",
      "550",
      "650",
      "850",
      "400",
      "750"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-power-supply-psuEfficiency",
    "categoryId": "power-supply",
    "key": "psuEfficiency",
    "label": "Psu Efficiency",
    "type": "enum",
    "options": [
      "80+ Bronze",
      "Non-certified",
      "80+ Standard",
      "80+ Gold"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-power-supply-psuModular",
    "categoryId": "power-supply",
    "key": "psuModular",
    "label": "Psu Modular",
    "type": "enum",
    "options": [
      "Non-modular",
      "Semi-modular",
      "Fully modular"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-cabinet-caseSupportedFormFactors",
    "categoryId": "cabinet",
    "key": "caseSupportedFormFactors",
    "label": "Case Supported Form Factors",
    "type": "enum",
    "options": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-cabinet-casePsuIncluded",
    "categoryId": "cabinet",
    "key": "casePsuIncluded",
    "label": "Case Psu Included",
    "type": "enum",
    "options": [
      "false",
      "true"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-cabinet-color",
    "categoryId": "cabinet",
    "key": "color",
    "label": "Color",
    "type": "enum",
    "options": [
      "Black"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  },
  {
    "id": "attr-cabinet-maxGpuLengthMm",
    "categoryId": "cabinet",
    "key": "maxGpuLengthMm",
    "label": "Max Gpu Length Mm",
    "type": "enum",
    "options": [
      "370",
      "360",
      "392"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 4,
    "required": false
  },
  {
    "id": "attr-cpu-cooler-coolerType",
    "categoryId": "cpu-cooler",
    "key": "coolerType",
    "label": "Cooler Type",
    "type": "enum",
    "options": [
      "Air (stock-type)",
      "Air",
      "AIO 240mm",
      "Thermal Paste"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 1,
    "required": false
  },
  {
    "id": "attr-cpu-cooler-coolerSupportedSockets",
    "categoryId": "cpu-cooler",
    "key": "coolerSupportedSockets",
    "label": "Cooler Supported Sockets",
    "type": "enum",
    "options": [
      "LGA1700",
      "LGA1851",
      "AM4",
      "AM5"
    ],
    "filterable": true,
    "compatKey": true,
    "displayOrder": 2,
    "required": false
  },
  {
    "id": "attr-cpu-cooler-coolerTdpRatingW",
    "categoryId": "cpu-cooler",
    "key": "coolerTdpRatingW",
    "label": "Cooler Tdp Rating W",
    "type": "enum",
    "options": [
      "65",
      "220",
      "260",
      "150",
      "200",
      "250"
    ],
    "filterable": true,
    "compatKey": false,
    "displayOrder": 3,
    "required": false
  }
];

export const SEED_COMPATIBILITY_RULES: CompatibilityRule[] = [
  {
    "id": "rule-cpu-mobo-socket",
    "sourceCategoryId": "processor",
    "targetCategoryId": "motherboard",
    "constraints": [
      {
        "sourceField": "socket",
        "targetField": "socket",
        "operator": "eq"
      }
    ],
    "severity": "block",
    "message": "Motherboard socket must match processor socket (e.g. LGA1700, AM4, AM5)",
    "isActive": true
  },
  {
    "id": "rule-mobo-ram-type",
    "sourceCategoryId": "motherboard",
    "targetCategoryId": "ram-desktop",
    "constraints": [
      {
        "sourceField": "memoryType",
        "targetField": "memoryType",
        "operator": "eq"
      }
    ],
    "severity": "block",
    "message": "Motherboard DDR generation (DDR4 vs DDR5) must match Desktop RAM module",
    "isActive": true
  },
  {
    "id": "rule-cpu-ram-support",
    "sourceCategoryId": "processor",
    "targetCategoryId": "ram-desktop",
    "constraints": [
      {
        "sourceField": "memorySupport",
        "targetField": "memoryType",
        "operator": "in"
      }
    ],
    "severity": "block",
    "message": "Processor memory controller must support RAM generation",
    "isActive": true
  },
  {
    "id": "rule-cpu-cooler-socket",
    "sourceCategoryId": "processor",
    "targetCategoryId": "cpu-cooler",
    "constraints": [
      {
        "sourceField": "socket",
        "targetField": "coolerSupportedSockets",
        "operator": "in"
      }
    ],
    "severity": "block",
    "message": "CPU cooler mounting brackets must support the CPU socket",
    "isActive": true
  },
  {
    "id": "rule-gpu-psu-wattage",
    "sourceCategoryId": "graphics-card",
    "targetCategoryId": "power-supply",
    "constraints": [
      {
        "sourceField": "recommendedPsuW",
        "targetField": "wattage",
        "operator": "lte"
      }
    ],
    "severity": "warn",
    "message": "Power Supply wattage should meet or exceed GPU recommended power",
    "isActive": true
  },
  {
    "id": "rule-mobo-case-size",
    "sourceCategoryId": "motherboard",
    "targetCategoryId": "cabinet",
    "constraints": [
      {
        "sourceField": "boardFormFactor",
        "targetField": "caseSupportedFormFactors",
        "operator": "in"
      }
    ],
    "severity": "warn",
    "message": "Cabinet must accommodate motherboard form factor (ATX / mATX)",
    "isActive": true
  },
  {
    "id": "rule-laptop-charger-brand",
    "sourceCategoryId": "laptop-charger",
    "targetCategoryId": "laptop-battery",
    "constraints": [
      {
        "sourceField": "brandId",
        "targetField": "brandId",
        "operator": "eq"
      }
    ],
    "severity": "warn",
    "message": "Laptop parts should match target laptop manufacturer brand",
    "isActive": true
  }
];

export const SEED_SERVICES: ServiceItem[] = [
  {
    "id": "srv-assembly",
    "name": "Custom Desktop PC Assembly & Cable Management",
    "sacCode": "998713",
    "pricePaise": 80000,
    "priceIncludesGst": true,
    "gstRateBps": 1800,
    "isActive": true
  },
  {
    "id": "srv-os-install",
    "name": "OS & Essential Drivers Installation",
    "sacCode": "998713",
    "pricePaise": 50000,
    "priceIncludesGst": true,
    "gstRateBps": 1800,
    "isActive": true
  },
  {
    "id": "srv-laptop-ram-install",
    "name": "Laptop RAM / SSD Upgrade Service",
    "sacCode": "998713",
    "pricePaise": 35000,
    "priceIncludesGst": true,
    "gstRateBps": 1800,
    "isActive": true
  },
  {
    "id": "srv-laptop-screen-fit",
    "name": "Laptop Screen Replacement Labour",
    "sacCode": "998713",
    "pricePaise": 60000,
    "priceIncludesGst": true,
    "gstRateBps": 1800,
    "isActive": true
  },
  {
    "id": "srv-doorstep",
    "name": "Onsite / Doorstep Tech Visit (Rajkot City)",
    "sacCode": "998713",
    "pricePaise": 30000,
    "priceIncludesGst": true,
    "gstRateBps": 1800,
    "isActive": true
  }
];

export const SEED_TAX_SETTINGS: TaxSettings = {
  "shopStateCode": 24,
  "defaultGstRateBps": 1800,
  "displayMode": "inclusive",
  "roundOff": true,
  "quoteValidityDays": 7
};

export const SEED_COMPANY_SETTINGS: CompanySettings = {
  "legalName": "Konark Computers",
  "gstin": "24AAAAA0000A1Z5",
  "address": "234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India",
  "phone": "+91 942 642 9416",
  "email": "omesh_tank@yahoo.com",
  "bankName": "State Bank of India",
  "bankAccountNo": "12345678901234",
  "bankIfsc": "SBIN0001234",
  "upiId": "konarkcomputers@upi",
  "termsAndConditions": "1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.",
  "footerNote": "Konark Computers — Serving Rajkot Since 1999."
};

export const SEED_PRODUCTS: Product[] = [
  {
    "id": "kc-ramd-001",
    "sku": "KC-RAMD-001",
    "name": "Adata 4GB DDR3-1600 Desktop RAM",
    "slug": "adata-4gb-ddr3-1600-desktop-ram-kc-ramd-001",
    "categoryId": "ram-desktop",
    "brandId": "adata",
    "description": "Adata Adata 4GB DDR3-1600 Desktop RAM",
    "specs": {
      "memoryType": "DDR3",
      "memoryFormFactor": "DIMM",
      "capacityGb": 4,
      "speedMhz": 1600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR3",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-001",
      "adata",
      "4gb",
      "ddr3",
      "1600",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-002",
    "sku": "KC-RAMD-002",
    "name": "Adata 8GB DDR3-1600 Desktop RAM",
    "slug": "adata-8gb-ddr3-1600-desktop-ram-kc-ramd-002",
    "categoryId": "ram-desktop",
    "brandId": "adata",
    "description": "Adata Adata 8GB DDR3-1600 Desktop RAM",
    "specs": {
      "memoryType": "DDR3",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 1600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR3",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-002",
      "adata",
      "8gb",
      "ddr3",
      "1600",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-003",
    "sku": "KC-RAMD-003",
    "name": "Adata 4GB DDR4-2666 Desktop RAM",
    "slug": "adata-4gb-ddr4-2666-desktop-ram-kc-ramd-003",
    "categoryId": "ram-desktop",
    "brandId": "adata",
    "description": "Adata Adata 4GB DDR4-2666 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 4,
      "speedMhz": 2666,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 270000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-003",
      "adata",
      "4gb",
      "ddr4",
      "2666",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-004",
    "sku": "KC-RAMD-004",
    "name": "Kingston 4GB DDR4-2666 Desktop RAM",
    "slug": "kingston-4gb-ddr4-2666-desktop-ram-kc-ramd-004",
    "categoryId": "ram-desktop",
    "brandId": "kingston",
    "description": "Kingston Kingston 4GB DDR4-2666 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 4,
      "speedMhz": 2666,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-004",
      "kingston",
      "4gb",
      "ddr4",
      "2666",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-005",
    "sku": "KC-RAMD-005",
    "name": "Kingston 8GB DDR4-3200 Desktop RAM",
    "slug": "kingston-8gb-ddr4-3200-desktop-ram-kc-ramd-005",
    "categoryId": "ram-desktop",
    "brandId": "kingston",
    "description": "Kingston Kingston 8GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 510000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-005",
      "kingston",
      "8gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-006",
    "sku": "KC-RAMD-006",
    "name": "Crucial 8GB DDR4-3200 Desktop RAM",
    "slug": "crucial-8gb-ddr4-3200-desktop-ram-kc-ramd-006",
    "categoryId": "ram-desktop",
    "brandId": "crucial",
    "description": "Crucial Basics series",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 505000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-006",
      "crucial",
      "8gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-007",
    "sku": "KC-RAMD-007",
    "name": "Adata 8GB DDR4-3200 Desktop RAM",
    "slug": "adata-8gb-ddr4-3200-desktop-ram-kc-ramd-007",
    "categoryId": "ram-desktop",
    "brandId": "adata",
    "description": "Adata Adata 8GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 490000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-007",
      "adata",
      "8gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-008",
    "sku": "KC-RAMD-008",
    "name": "EVM 8GB DDR4-2666 Desktop RAM",
    "slug": "evm-8gb-ddr4-2666-desktop-ram-kc-ramd-008",
    "categoryId": "ram-desktop",
    "brandId": "evm",
    "description": "EVM EVM 8GB DDR4-2666 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 2666,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 480000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-008",
      "evm",
      "8gb",
      "ddr4",
      "2666",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-009",
    "sku": "KC-RAMD-009",
    "name": "Corsair 8GB DDR4-3200 Desktop RAM",
    "slug": "corsair-8gb-ddr4-3200-desktop-ram-kc-ramd-009",
    "categoryId": "ram-desktop",
    "brandId": "corsair",
    "description": "Vengeance LPX single stick",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 550000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-009",
      "corsair",
      "8gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-010",
    "sku": "KC-RAMD-010",
    "name": "Kingston 16GB DDR4-3200 Desktop RAM",
    "slug": "kingston-16gb-ddr4-3200-desktop-ram-kc-ramd-010",
    "categoryId": "ram-desktop",
    "brandId": "kingston",
    "description": "Kingston Kingston 16GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 980000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-010",
      "kingston",
      "16gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-011",
    "sku": "KC-RAMD-011",
    "name": "Crucial 16GB DDR4-3200 Desktop RAM",
    "slug": "crucial-16gb-ddr4-3200-desktop-ram-kc-ramd-011",
    "categoryId": "ram-desktop",
    "brandId": "crucial",
    "description": "Crucial Crucial 16GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 970000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-011",
      "crucial",
      "16gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-012",
    "sku": "KC-RAMD-012",
    "name": "Adata 16GB DDR4-3200 Desktop RAM",
    "slug": "adata-16gb-ddr4-3200-desktop-ram-kc-ramd-012",
    "categoryId": "ram-desktop",
    "brandId": "adata",
    "description": "Adata Adata 16GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-012",
      "adata",
      "16gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-013",
    "sku": "KC-RAMD-013",
    "name": "Corsair 16GB DDR4-3200 Desktop RAM",
    "slug": "corsair-16gb-ddr4-3200-desktop-ram-kc-ramd-013",
    "categoryId": "ram-desktop",
    "brandId": "corsair",
    "description": "Corsair Corsair 16GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1050000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-013",
      "corsair",
      "16gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-014",
    "sku": "KC-RAMD-014",
    "name": "Kingston 32GB DDR4-3200 Desktop RAM",
    "slug": "kingston-32gb-ddr4-3200-desktop-ram-kc-ramd-014",
    "categoryId": "ram-desktop",
    "brandId": "kingston",
    "description": "Kingston Kingston 32GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 32,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-014",
      "kingston",
      "32gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-015",
    "sku": "KC-RAMD-015",
    "name": "Crucial 32GB DDR4-3200 Desktop RAM",
    "slug": "crucial-32gb-ddr4-3200-desktop-ram-kc-ramd-015",
    "categoryId": "ram-desktop",
    "brandId": "crucial",
    "description": "Crucial Crucial 32GB DDR4-3200 Desktop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "capacityGb": 32,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1920000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-015",
      "crucial",
      "32gb",
      "ddr4",
      "3200",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-016",
    "sku": "KC-RAMD-016",
    "name": "Crucial 8GB DDR5-4800 Desktop RAM",
    "slug": "crucial-8gb-ddr5-4800-desktop-ram-kc-ramd-016",
    "categoryId": "ram-desktop",
    "brandId": "crucial",
    "description": "Crucial Crucial 8GB DDR5-4800 Desktop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 4800,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1100000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-016",
      "crucial",
      "8gb",
      "ddr5",
      "4800",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-017",
    "sku": "KC-RAMD-017",
    "name": "EVM 8GB DDR5-5600 Desktop RAM",
    "slug": "evm-8gb-ddr5-5600-desktop-ram-kc-ramd-017",
    "categoryId": "ram-desktop",
    "brandId": "evm",
    "description": "EVM EVM 8GB DDR5-5600 Desktop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 8,
      "speedMhz": 5600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-017",
      "evm",
      "8gb",
      "ddr5",
      "5600",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-018",
    "sku": "KC-RAMD-018",
    "name": "Kingston 16GB DDR5-4800 Desktop RAM",
    "slug": "kingston-16gb-ddr5-4800-desktop-ram-kc-ramd-018",
    "categoryId": "ram-desktop",
    "brandId": "kingston",
    "description": "Kingston Kingston 16GB DDR5-4800 Desktop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 4800,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1850000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-018",
      "kingston",
      "16gb",
      "ddr5",
      "4800",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-019",
    "sku": "KC-RAMD-019",
    "name": "Crucial 16GB DDR5-5600 Desktop RAM",
    "slug": "crucial-16gb-ddr5-5600-desktop-ram-kc-ramd-019",
    "categoryId": "ram-desktop",
    "brandId": "crucial",
    "description": "Crucial Crucial 16GB DDR5-5600 Desktop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 5600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1880000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-019",
      "crucial",
      "16gb",
      "ddr5",
      "5600",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-020",
    "sku": "KC-RAMD-020",
    "name": "Adata 16GB DDR5-5600 Desktop RAM",
    "slug": "adata-16gb-ddr5-5600-desktop-ram-kc-ramd-020",
    "categoryId": "ram-desktop",
    "brandId": "adata",
    "description": "Adata Adata 16GB DDR5-5600 Desktop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 16,
      "speedMhz": 5600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1830000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-020",
      "adata",
      "16gb",
      "ddr5",
      "5600",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-021",
    "sku": "KC-RAMD-021",
    "name": "Kingston 32GB DDR5-5600 Desktop RAM",
    "slug": "kingston-32gb-ddr5-5600-desktop-ram-kc-ramd-021",
    "categoryId": "ram-desktop",
    "brandId": "kingston",
    "description": "Kingston Kingston 32GB DDR5-5600 Desktop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 32,
      "speedMhz": 5600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3500000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-021",
      "kingston",
      "32gb",
      "ddr5",
      "5600",
      "desktop",
      "ram",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ramd-022",
    "sku": "KC-RAMD-022",
    "name": "Corsair 32GB DDR5-6000 Desktop RAM (2x16GB kit)",
    "slug": "corsair-32gb-ddr5-6000-desktop-ram-2x16gb-kit-kc-ramd-022",
    "categoryId": "ram-desktop",
    "brandId": "corsair",
    "description": "Dual-channel kit",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "capacityGb": 32,
      "speedMhz": 6000,
      "modulesInPack": 2
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [
        "any desktop with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3650000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ramd-022",
      "corsair",
      "32gb",
      "ddr5",
      "6000",
      "desktop",
      "ram",
      "2x16gb",
      "kit",
      "ram-desktop",
      "any desktop with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-001",
    "sku": "KC-RAML-001",
    "name": "Adata 4GB DDR3-1600 Laptop RAM",
    "slug": "adata-4gb-ddr3-1600-laptop-ram-kc-raml-001",
    "categoryId": "ram-laptop",
    "brandId": "adata",
    "description": "DDR3L 1.35V; works in DDR3 laptops",
    "specs": {
      "memoryType": "DDR3",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 4,
      "speedMhz": 1600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR3",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 180000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-001",
      "adata",
      "4gb",
      "ddr3",
      "1600",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-002",
    "sku": "KC-RAML-002",
    "name": "Adata 8GB DDR3-1600 Laptop RAM",
    "slug": "adata-8gb-ddr3-1600-laptop-ram-kc-raml-002",
    "categoryId": "ram-laptop",
    "brandId": "adata",
    "description": "DDR3L 1.35V; works in DDR3 laptops",
    "specs": {
      "memoryType": "DDR3",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 8,
      "speedMhz": 1600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR3",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 310000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-002",
      "adata",
      "8gb",
      "ddr3",
      "1600",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-003",
    "sku": "KC-RAML-003",
    "name": "Kingston 8GB DDR3-1600 Laptop RAM",
    "slug": "kingston-8gb-ddr3-1600-laptop-ram-kc-raml-003",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "DDR3L 1.35V; works in DDR3 laptops",
    "specs": {
      "memoryType": "DDR3",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 8,
      "speedMhz": 1600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR3",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 340000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-003",
      "kingston",
      "8gb",
      "ddr3",
      "1600",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-004",
    "sku": "KC-RAML-004",
    "name": "Kingston 4GB DDR4-2666 Laptop RAM",
    "slug": "kingston-4gb-ddr4-2666-laptop-ram-kc-raml-004",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "Kingston Kingston 4GB DDR4-2666 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 4,
      "speedMhz": 2666,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 290000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-004",
      "kingston",
      "4gb",
      "ddr4",
      "2666",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-005",
    "sku": "KC-RAML-005",
    "name": "Kingston 8GB DDR4-3200 Laptop RAM",
    "slug": "kingston-8gb-ddr4-3200-laptop-ram-kc-raml-005",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "Kingston Kingston 8GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 520000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-005",
      "kingston",
      "8gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-006",
    "sku": "KC-RAML-006",
    "name": "Crucial 8GB DDR4-3200 Laptop RAM",
    "slug": "crucial-8gb-ddr4-3200-laptop-ram-kc-raml-006",
    "categoryId": "ram-laptop",
    "brandId": "crucial",
    "description": "Crucial Crucial 8GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 510000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-006",
      "crucial",
      "8gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-007",
    "sku": "KC-RAML-007",
    "name": "Adata 8GB DDR4-3200 Laptop RAM",
    "slug": "adata-8gb-ddr4-3200-laptop-ram-kc-raml-007",
    "categoryId": "ram-laptop",
    "brandId": "adata",
    "description": "Adata Adata 8GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 8,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 500000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-007",
      "adata",
      "8gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-008",
    "sku": "KC-RAML-008",
    "name": "Kingston 16GB DDR4-3200 Laptop RAM",
    "slug": "kingston-16gb-ddr4-3200-laptop-ram-kc-raml-008",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "Kingston Kingston 16GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1000000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-008",
      "kingston",
      "16gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-009",
    "sku": "KC-RAML-009",
    "name": "Crucial 16GB DDR4-3200 Laptop RAM",
    "slug": "crucial-16gb-ddr4-3200-laptop-ram-kc-raml-009",
    "categoryId": "ram-laptop",
    "brandId": "crucial",
    "description": "Crucial Crucial 16GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 990000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-009",
      "crucial",
      "16gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-010",
    "sku": "KC-RAML-010",
    "name": "Adata 16GB DDR4-3200 Laptop RAM",
    "slug": "adata-16gb-ddr4-3200-laptop-ram-kc-raml-010",
    "categoryId": "ram-laptop",
    "brandId": "adata",
    "description": "Adata Adata 16GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 16,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 970000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-010",
      "adata",
      "16gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-011",
    "sku": "KC-RAML-011",
    "name": "Crucial 32GB DDR4-3200 Laptop RAM",
    "slug": "crucial-32gb-ddr4-3200-laptop-ram-kc-raml-011",
    "categoryId": "ram-laptop",
    "brandId": "crucial",
    "description": "Crucial Crucial 32GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 32,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2050000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-011",
      "crucial",
      "32gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-012",
    "sku": "KC-RAML-012",
    "name": "Kingston 32GB DDR4-3200 Laptop RAM",
    "slug": "kingston-32gb-ddr4-3200-laptop-ram-kc-raml-012",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "Kingston Kingston 32GB DDR4-3200 Laptop RAM",
    "specs": {
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 32,
      "speedMhz": 3200,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2080000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-012",
      "kingston",
      "32gb",
      "ddr4",
      "3200",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-013",
    "sku": "KC-RAML-013",
    "name": "Crucial 8GB DDR5-4800 Laptop RAM",
    "slug": "crucial-8gb-ddr5-4800-laptop-ram-kc-raml-013",
    "categoryId": "ram-laptop",
    "brandId": "crucial",
    "description": "Crucial Crucial 8GB DDR5-4800 Laptop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 8,
      "speedMhz": 4800,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-013",
      "crucial",
      "8gb",
      "ddr5",
      "4800",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-014",
    "sku": "KC-RAML-014",
    "name": "Kingston 16GB DDR5-4800 Laptop RAM",
    "slug": "kingston-16gb-ddr5-4800-laptop-ram-kc-raml-014",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "Kingston Kingston 16GB DDR5-4800 Laptop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 16,
      "speedMhz": 4800,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1900000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-014",
      "kingston",
      "16gb",
      "ddr5",
      "4800",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-015",
    "sku": "KC-RAML-015",
    "name": "Crucial 16GB DDR5-5600 Laptop RAM",
    "slug": "crucial-16gb-ddr5-5600-laptop-ram-kc-raml-015",
    "categoryId": "ram-laptop",
    "brandId": "crucial",
    "description": "Crucial Crucial 16GB DDR5-5600 Laptop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 16,
      "speedMhz": 5600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-015",
      "crucial",
      "16gb",
      "ddr5",
      "5600",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-raml-016",
    "sku": "KC-RAML-016",
    "name": "Kingston 32GB DDR5-5600 Laptop RAM",
    "slug": "kingston-32gb-ddr5-5600-laptop-ram-kc-raml-016",
    "categoryId": "ram-laptop",
    "brandId": "kingston",
    "description": "Kingston Kingston 32GB DDR5-5600 Laptop RAM",
    "specs": {
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM",
      "capacityGb": 32,
      "speedMhz": 5600,
      "modulesInPack": 1
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any laptop/mini-pc with matching slot"
      ],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "SODIMM"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3750000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-raml-016",
      "kingston",
      "32gb",
      "ddr5",
      "5600",
      "laptop",
      "ram",
      "ram-laptop",
      "any laptop/mini-pc with matching slot"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-001",
    "sku": "KC-HDD-001",
    "name": "Seagate Barracuda 1TB 3.5\" Internal Hard Disk (7200 RPM)",
    "slug": "seagate-barracuda-1tb-3-5-internal-hard-disk-7200-rpm-kc-hdd-001",
    "categoryId": "hdd-internal",
    "brandId": "seagate",
    "description": "Seagate Seagate Barracuda 1TB 3.5\" Internal Hard Disk (7200 RPM)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 7200,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 410000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-001",
      "seagate",
      "barracuda",
      "1tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "7200",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-002",
    "sku": "KC-HDD-002",
    "name": "WD Blue 1TB 3.5\" Internal Hard Disk (7200 RPM)",
    "slug": "wd-blue-1tb-3-5-internal-hard-disk-7200-rpm-kc-hdd-002",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "WD WD Blue 1TB 3.5\" Internal Hard Disk (7200 RPM)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 7200,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 430000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-002",
      "wd",
      "blue",
      "1tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "7200",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-003",
    "sku": "KC-HDD-003",
    "name": "Toshiba P300 1TB 3.5\" Internal Hard Disk (7200 RPM)",
    "slug": "toshiba-p300-1tb-3-5-internal-hard-disk-7200-rpm-kc-hdd-003",
    "categoryId": "hdd-internal",
    "brandId": "toshiba",
    "description": "Toshiba Toshiba P300 1TB 3.5\" Internal Hard Disk (7200 RPM)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 7200,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 400000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-003",
      "toshiba",
      "p300",
      "1tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "7200",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-004",
    "sku": "KC-HDD-004",
    "name": "Seagate Barracuda 2TB 3.5\" Internal Hard Disk (7200 RPM)",
    "slug": "seagate-barracuda-2tb-3-5-internal-hard-disk-7200-rpm-kc-hdd-004",
    "categoryId": "hdd-internal",
    "brandId": "seagate",
    "description": "Seagate Seagate Barracuda 2TB 3.5\" Internal Hard Disk (7200 RPM)",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 7200,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 640000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-004",
      "seagate",
      "barracuda",
      "2tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "7200",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-005",
    "sku": "KC-HDD-005",
    "name": "WD Blue 2TB 3.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-blue-2tb-3-5-internal-hard-disk-5400-rpm-kc-hdd-005",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "WD WD Blue 2TB 3.5\" Internal Hard Disk (5400 RPM)",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 5400,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 630000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-005",
      "wd",
      "blue",
      "2tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-006",
    "sku": "KC-HDD-006",
    "name": "Toshiba P300 2TB 3.5\" Internal Hard Disk (7200 RPM)",
    "slug": "toshiba-p300-2tb-3-5-internal-hard-disk-7200-rpm-kc-hdd-006",
    "categoryId": "hdd-internal",
    "brandId": "toshiba",
    "description": "Toshiba Toshiba P300 2TB 3.5\" Internal Hard Disk (7200 RPM)",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 7200,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 620000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-006",
      "toshiba",
      "p300",
      "2tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "7200",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-007",
    "sku": "KC-HDD-007",
    "name": "WD Blue 4TB 3.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-blue-4tb-3-5-internal-hard-disk-5400-rpm-kc-hdd-007",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "WD WD Blue 4TB 3.5\" Internal Hard Disk (5400 RPM)",
    "specs": {
      "capacityGb": 4000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 5400,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 1150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-007",
      "wd",
      "blue",
      "4tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-008",
    "sku": "KC-HDD-008",
    "name": "Seagate Barracuda 4TB 3.5\" Internal Hard Disk (5400 RPM)",
    "slug": "seagate-barracuda-4tb-3-5-internal-hard-disk-5400-rpm-kc-hdd-008",
    "categoryId": "hdd-internal",
    "brandId": "seagate",
    "description": "Seagate Seagate Barracuda 4TB 3.5\" Internal Hard Disk (5400 RPM)",
    "specs": {
      "capacityGb": 4000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 5400,
      "usageClass": "Desktop"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 1120000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-008",
      "seagate",
      "barracuda",
      "4tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-009",
    "sku": "KC-HDD-009",
    "name": "WD Purple 1TB 3.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-purple-1tb-3-5-internal-hard-disk-5400-rpm-kc-hdd-009",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "24x7 surveillance-rated",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 5400,
      "usageClass": "Surveillance (CCTV/DVR)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 460000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-009",
      "wd",
      "purple",
      "1tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-010",
    "sku": "KC-HDD-010",
    "name": "WD Purple 2TB 3.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-purple-2tb-3-5-internal-hard-disk-5400-rpm-kc-hdd-010",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "24x7 surveillance-rated",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 5400,
      "usageClass": "Surveillance (CCTV/DVR)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 690000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-010",
      "wd",
      "purple",
      "2tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-011",
    "sku": "KC-HDD-011",
    "name": "WD Purple 4TB 3.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-purple-4tb-3-5-internal-hard-disk-5400-rpm-kc-hdd-011",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "24x7 surveillance-rated",
    "specs": {
      "capacityGb": 4000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\"",
      "rpm": 5400,
      "usageClass": "Surveillance (CCTV/DVR)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "3.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 1190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-011",
      "wd",
      "purple",
      "4tb",
      "3.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-012",
    "sku": "KC-HDD-012",
    "name": "WD Blue 500GB 2.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-blue-500gb-2-5-internal-hard-disk-5400-rpm-kc-hdd-012",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "7mm/9.5mm slim",
    "specs": {
      "capacityGb": 500,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "rpm": 5400,
      "usageClass": "Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 290000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-012",
      "wd",
      "blue",
      "500gb",
      "2.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-013",
    "sku": "KC-HDD-013",
    "name": "Seagate Barracuda 500GB 2.5\" Internal Hard Disk (5400 RPM)",
    "slug": "seagate-barracuda-500gb-2-5-internal-hard-disk-5400-rpm-kc-hdd-013",
    "categoryId": "hdd-internal",
    "brandId": "seagate",
    "description": "7mm slim",
    "specs": {
      "capacityGb": 500,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "rpm": 5400,
      "usageClass": "Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-013",
      "seagate",
      "barracuda",
      "500gb",
      "2.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-014",
    "sku": "KC-HDD-014",
    "name": "WD Blue 1TB 2.5\" Internal Hard Disk (5400 RPM)",
    "slug": "wd-blue-1tb-2-5-internal-hard-disk-5400-rpm-kc-hdd-014",
    "categoryId": "hdd-internal",
    "brandId": "wd",
    "description": "9.5mm thickness",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "rpm": 5400,
      "usageClass": "Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 440000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-014",
      "wd",
      "blue",
      "1tb",
      "2.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-015",
    "sku": "KC-HDD-015",
    "name": "Seagate Barracuda 1TB 2.5\" Internal Hard Disk (5400 RPM)",
    "slug": "seagate-barracuda-1tb-2-5-internal-hard-disk-5400-rpm-kc-hdd-015",
    "categoryId": "hdd-internal",
    "brandId": "seagate",
    "description": "7mm slim",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "rpm": 5400,
      "usageClass": "Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 430000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-015",
      "seagate",
      "barracuda",
      "1tb",
      "2.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-016",
    "sku": "KC-HDD-016",
    "name": "Toshiba L200 1TB 2.5\" Internal Hard Disk (5400 RPM)",
    "slug": "toshiba-l200-1tb-2-5-internal-hard-disk-5400-rpm-kc-hdd-016",
    "categoryId": "hdd-internal",
    "brandId": "toshiba",
    "description": "9.5mm thickness",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "rpm": 5400,
      "usageClass": "Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 420000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-016",
      "toshiba",
      "l200",
      "1tb",
      "2.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-hdd-017",
    "sku": "KC-HDD-017",
    "name": "Seagate Barracuda 2TB 2.5\" Internal Hard Disk (5400 RPM)",
    "slug": "seagate-barracuda-2tb-2-5-internal-hard-disk-5400-rpm-kc-hdd-017",
    "categoryId": "hdd-internal",
    "brandId": "seagate",
    "description": "15mm thick - will NOT fit slim laptops; confirm bay height",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "rpm": 5400,
      "usageClass": "Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 760000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-hdd-017",
      "seagate",
      "barracuda",
      "2tb",
      "2.5\"",
      "internal",
      "hard",
      "disk",
      "5400",
      "rpm",
      "hdd-internal"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-001",
    "sku": "KC-SSDS-001",
    "name": "Adata Ultimate SU650 120GB 2.5\" SATA SSD",
    "slug": "adata-ultimate-su650-120gb-2-5-sata-ssd-kc-ssds-001",
    "categoryId": "ssd-sata",
    "brandId": "adata",
    "description": "Adata Adata Ultimate SU650 120GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 120,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 170000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-001",
      "adata",
      "ultimate",
      "su650",
      "120gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-002",
    "sku": "KC-SSDS-002",
    "name": "Adata Ultimate SU650 240GB 2.5\" SATA SSD",
    "slug": "adata-ultimate-su650-240gb-2-5-sata-ssd-kc-ssds-002",
    "categoryId": "ssd-sata",
    "brandId": "adata",
    "description": "Adata Adata Ultimate SU650 240GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 240,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 270000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-002",
      "adata",
      "ultimate",
      "su650",
      "240gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-003",
    "sku": "KC-SSDS-003",
    "name": "Adata Ultimate SU650 480GB 2.5\" SATA SSD",
    "slug": "adata-ultimate-su650-480gb-2-5-sata-ssd-kc-ssds-003",
    "categoryId": "ssd-sata",
    "brandId": "adata",
    "description": "Adata Adata Ultimate SU650 480GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 480,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 480000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-003",
      "adata",
      "ultimate",
      "su650",
      "480gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-004",
    "sku": "KC-SSDS-004",
    "name": "Adata Ultimate SU650 960GB 2.5\" SATA SSD",
    "slug": "adata-ultimate-su650-960gb-2-5-sata-ssd-kc-ssds-004",
    "categoryId": "ssd-sata",
    "brandId": "adata",
    "description": "Adata Adata Ultimate SU650 960GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 960,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 900000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-004",
      "adata",
      "ultimate",
      "su650",
      "960gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-005",
    "sku": "KC-SSDS-005",
    "name": "Kingston A400 240GB 2.5\" SATA SSD",
    "slug": "kingston-a400-240gb-2-5-sata-ssd-kc-ssds-005",
    "categoryId": "ssd-sata",
    "brandId": "kingston",
    "description": "Kingston Kingston A400 240GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 240,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-005",
      "kingston",
      "a400",
      "240gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-006",
    "sku": "KC-SSDS-006",
    "name": "Kingston A400 480GB 2.5\" SATA SSD",
    "slug": "kingston-a400-480gb-2-5-sata-ssd-kc-ssds-006",
    "categoryId": "ssd-sata",
    "brandId": "kingston",
    "description": "Kingston Kingston A400 480GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 480,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 500000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-006",
      "kingston",
      "a400",
      "480gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-007",
    "sku": "KC-SSDS-007",
    "name": "Kingston A400 960GB 2.5\" SATA SSD",
    "slug": "kingston-a400-960gb-2-5-sata-ssd-kc-ssds-007",
    "categoryId": "ssd-sata",
    "brandId": "kingston",
    "description": "Kingston Kingston A400 960GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 960,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 930000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-007",
      "kingston",
      "a400",
      "960gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-008",
    "sku": "KC-SSDS-008",
    "name": "Crucial BX500 240GB 2.5\" SATA SSD",
    "slug": "crucial-bx500-240gb-2-5-sata-ssd-kc-ssds-008",
    "categoryId": "ssd-sata",
    "brandId": "crucial",
    "description": "Crucial Crucial BX500 240GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 240,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-008",
      "crucial",
      "bx500",
      "240gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-009",
    "sku": "KC-SSDS-009",
    "name": "Crucial BX500 500GB 2.5\" SATA SSD",
    "slug": "crucial-bx500-500gb-2-5-sata-ssd-kc-ssds-009",
    "categoryId": "ssd-sata",
    "brandId": "crucial",
    "description": "Crucial Crucial BX500 500GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 510000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-009",
      "crucial",
      "bx500",
      "500gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-010",
    "sku": "KC-SSDS-010",
    "name": "Crucial BX500 1TB 2.5\" SATA SSD",
    "slug": "crucial-bx500-1tb-2-5-sata-ssd-kc-ssds-010",
    "categoryId": "ssd-sata",
    "brandId": "crucial",
    "description": "Crucial Crucial BX500 1TB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 920000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-010",
      "crucial",
      "bx500",
      "1tb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-011",
    "sku": "KC-SSDS-011",
    "name": "Crucial BX500 2TB 2.5\" SATA SSD",
    "slug": "crucial-bx500-2tb-2-5-sata-ssd-kc-ssds-011",
    "categoryId": "ssd-sata",
    "brandId": "crucial",
    "description": "Crucial Crucial BX500 2TB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1800000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-011",
      "crucial",
      "bx500",
      "2tb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-012",
    "sku": "KC-SSDS-012",
    "name": "WD Green SA510 240GB 2.5\" SATA SSD",
    "slug": "wd-green-sa510-240gb-2-5-sata-ssd-kc-ssds-012",
    "categoryId": "ssd-sata",
    "brandId": "wd",
    "description": "WD WD Green SA510 240GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 240,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 270000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-012",
      "wd",
      "green",
      "sa510",
      "240gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-013",
    "sku": "KC-SSDS-013",
    "name": "WD Green SA510 480GB 2.5\" SATA SSD",
    "slug": "wd-green-sa510-480gb-2-5-sata-ssd-kc-ssds-013",
    "categoryId": "ssd-sata",
    "brandId": "wd",
    "description": "WD WD Green SA510 480GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 480,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 500000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-013",
      "wd",
      "green",
      "sa510",
      "480gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-014",
    "sku": "KC-SSDS-014",
    "name": "WD Blue SA510 500GB 2.5\" SATA SSD",
    "slug": "wd-blue-sa510-500gb-2-5-sata-ssd-kc-ssds-014",
    "categoryId": "ssd-sata",
    "brandId": "wd",
    "description": "WD WD Blue SA510 500GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 530000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-014",
      "wd",
      "blue",
      "sa510",
      "500gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-015",
    "sku": "KC-SSDS-015",
    "name": "WD Blue SA510 1TB 2.5\" SATA SSD",
    "slug": "wd-blue-sa510-1tb-2-5-sata-ssd-kc-ssds-015",
    "categoryId": "ssd-sata",
    "brandId": "wd",
    "description": "WD WD Blue SA510 1TB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 960000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-015",
      "wd",
      "blue",
      "sa510",
      "1tb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-016",
    "sku": "KC-SSDS-016",
    "name": "WD Blue SA510 2TB 2.5\" SATA SSD",
    "slug": "wd-blue-sa510-2tb-2-5-sata-ssd-kc-ssds-016",
    "categoryId": "ssd-sata",
    "brandId": "wd",
    "description": "WD WD Blue SA510 2TB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1820000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-016",
      "wd",
      "blue",
      "sa510",
      "2tb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-017",
    "sku": "KC-SSDS-017",
    "name": "Samsung 870 EVO 500GB 2.5\" SATA SSD",
    "slug": "samsung-870-evo-500gb-2-5-sata-ssd-kc-ssds-017",
    "categoryId": "ssd-sata",
    "brandId": "samsung",
    "description": "Samsung Samsung 870 EVO 500GB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 820000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-017",
      "samsung",
      "870",
      "evo",
      "500gb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssds-018",
    "sku": "KC-SSDS-018",
    "name": "Samsung 870 EVO 1TB 2.5\" SATA SSD",
    "slug": "samsung-870-evo-1tb-2-5-sata-ssd-kc-ssds-018",
    "categoryId": "ssd-sata",
    "brandId": "samsung",
    "description": "Samsung Samsung 870 EVO 1TB 2.5\" SATA SSD",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\"",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "SATA III",
      "storageFormFactor": "2.5\""
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 1450000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssds-018",
      "samsung",
      "870",
      "evo",
      "1tb",
      "2.5\"",
      "sata",
      "ssd",
      "ssd-sata"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-001",
    "sku": "KC-SSDN-001",
    "name": "Kingston NV2 250GB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "kingston-nv2-250gb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-001",
    "categoryId": "ssd-nvme",
    "brandId": "kingston",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 250,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 340000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-001",
      "kingston",
      "nv2",
      "250gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-002",
    "sku": "KC-SSDN-002",
    "name": "Kingston NV2 500GB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "kingston-nv2-500gb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-002",
    "categoryId": "ssd-nvme",
    "brandId": "kingston",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 540000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-002",
      "kingston",
      "nv2",
      "500gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-003",
    "sku": "KC-SSDN-003",
    "name": "Kingston NV2 1TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "kingston-nv2-1tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-003",
    "categoryId": "ssd-nvme",
    "brandId": "kingston",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-003",
      "kingston",
      "nv2",
      "1tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-004",
    "sku": "KC-SSDN-004",
    "name": "Kingston NV2 2TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "kingston-nv2-2tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-004",
    "categoryId": "ssd-nvme",
    "brandId": "kingston",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1850000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-004",
      "kingston",
      "nv2",
      "2tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-005",
    "sku": "KC-SSDN-005",
    "name": "Crucial P3 500GB M.2 NVMe SSD (PCIe Gen3)",
    "slug": "crucial-p3-500gb-m-2-nvme-ssd-pcie-gen3-kc-ssdn-005",
    "categoryId": "ssd-nvme",
    "brandId": "crucial",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 530000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-005",
      "crucial",
      "p3",
      "500gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen3",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-006",
    "sku": "KC-SSDN-006",
    "name": "Crucial P3 1TB M.2 NVMe SSD (PCIe Gen3)",
    "slug": "crucial-p3-1tb-m-2-nvme-ssd-pcie-gen3-kc-ssdn-006",
    "categoryId": "ssd-nvme",
    "brandId": "crucial",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 940000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-006",
      "crucial",
      "p3",
      "1tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen3",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-007",
    "sku": "KC-SSDN-007",
    "name": "Crucial P3 2TB M.2 NVMe SSD (PCIe Gen3)",
    "slug": "crucial-p3-2tb-m-2-nvme-ssd-pcie-gen3-kc-ssdn-007",
    "categoryId": "ssd-nvme",
    "brandId": "crucial",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1830000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-007",
      "crucial",
      "p3",
      "2tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen3",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-008",
    "sku": "KC-SSDN-008",
    "name": "Crucial P3 Plus 500GB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "crucial-p3-plus-500gb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-008",
    "categoryId": "ssd-nvme",
    "brandId": "crucial",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 580000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-008",
      "crucial",
      "p3",
      "plus",
      "500gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-009",
    "sku": "KC-SSDN-009",
    "name": "Crucial P3 Plus 1TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "crucial-p3-plus-1tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-009",
    "categoryId": "ssd-nvme",
    "brandId": "crucial",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 990000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-009",
      "crucial",
      "p3",
      "plus",
      "1tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-010",
    "sku": "KC-SSDN-010",
    "name": "Crucial P3 Plus 2TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "crucial-p3-plus-2tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-010",
    "categoryId": "ssd-nvme",
    "brandId": "crucial",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-010",
      "crucial",
      "p3",
      "plus",
      "2tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-011",
    "sku": "KC-SSDN-011",
    "name": "WD Blue SN580 500GB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "wd-blue-sn580-500gb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-011",
    "categoryId": "ssd-nvme",
    "brandId": "wd",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 500,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 570000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-011",
      "wd",
      "blue",
      "sn580",
      "500gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-012",
    "sku": "KC-SSDN-012",
    "name": "WD Blue SN580 1TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "wd-blue-sn580-1tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-012",
    "categoryId": "ssd-nvme",
    "brandId": "wd",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 990000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-012",
      "wd",
      "blue",
      "sn580",
      "1tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-013",
    "sku": "KC-SSDN-013",
    "name": "WD Blue SN580 2TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "wd-blue-sn580-2tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-013",
    "categoryId": "ssd-nvme",
    "brandId": "wd",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1900000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-013",
      "wd",
      "blue",
      "sn580",
      "2tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-014",
    "sku": "KC-SSDN-014",
    "name": "Adata Legend 710 256GB M.2 NVMe SSD (PCIe Gen3)",
    "slug": "adata-legend-710-256gb-m-2-nvme-ssd-pcie-gen3-kc-ssdn-014",
    "categoryId": "ssd-nvme",
    "brandId": "adata",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 256,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 360000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-014",
      "adata",
      "legend",
      "710",
      "256gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen3",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-015",
    "sku": "KC-SSDN-015",
    "name": "Adata Legend 710 512GB M.2 NVMe SSD (PCIe Gen3)",
    "slug": "adata-legend-710-512gb-m-2-nvme-ssd-pcie-gen3-kc-ssdn-015",
    "categoryId": "ssd-nvme",
    "brandId": "adata",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 512,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 590000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-015",
      "adata",
      "legend",
      "710",
      "512gb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen3",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-016",
    "sku": "KC-SSDN-016",
    "name": "Adata Legend 710 1TB M.2 NVMe SSD (PCIe Gen3)",
    "slug": "adata-legend-710-1tb-m-2-nvme-ssd-pcie-gen3-kc-ssdn-016",
    "categoryId": "ssd-nvme",
    "brandId": "adata",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen3",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1020000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-016",
      "adata",
      "legend",
      "710",
      "1tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen3",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-017",
    "sku": "KC-SSDN-017",
    "name": "Samsung 990 EVO 1TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "samsung-990-evo-1tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-017",
    "categoryId": "ssd-nvme",
    "brandId": "samsung",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 1000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 1550000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-017",
      "samsung",
      "990",
      "evo",
      "1tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ssdn-018",
    "sku": "KC-SSDN-018",
    "name": "Samsung 990 EVO 2TB M.2 NVMe SSD (PCIe Gen4)",
    "slug": "samsung-990-evo-2tb-m-2-nvme-ssd-pcie-gen4-kc-ssdn-018",
    "categoryId": "ssd-nvme",
    "brandId": "samsung",
    "description": "M.2 2280. Check board/laptop supports NVMe (not SATA-only M.2).",
    "specs": {
      "capacityGb": 2000,
      "storageType": "SSD",
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280",
      "usageClass": "Desktop & Laptop"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "PCIe NVMe Gen4",
      "storageFormFactor": "M.2 2280"
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 2800000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "852351"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ssdn-018",
      "samsung",
      "990",
      "evo",
      "2tb",
      "m.2",
      "nvme",
      "ssd",
      "pcie",
      "gen4",
      "ssd-nvme"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-001",
    "sku": "KC-EXT-001",
    "name": "WD Elements 1TB Portable External Hard Disk (USB 3.0)",
    "slug": "wd-elements-1tb-portable-external-hard-disk-usb-3-0-kc-ext-001",
    "categoryId": "external-drive",
    "brandId": "wd",
    "description": "WD WD Elements 1TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 520000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-001",
      "wd",
      "elements",
      "1tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-002",
    "sku": "KC-EXT-002",
    "name": "Seagate Expansion 1TB Portable External Hard Disk (USB 3.0)",
    "slug": "seagate-expansion-1tb-portable-external-hard-disk-usb-3-0-kc-ext-002",
    "categoryId": "external-drive",
    "brandId": "seagate",
    "description": "Seagate Seagate Expansion 1TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 510000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-002",
      "seagate",
      "expansion",
      "1tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-003",
    "sku": "KC-EXT-003",
    "name": "WD My Passport 1TB Portable External Hard Disk (USB 3.0)",
    "slug": "wd-my-passport-1tb-portable-external-hard-disk-usb-3-0-kc-ext-003",
    "categoryId": "external-drive",
    "brandId": "wd",
    "description": "WD WD My Passport 1TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 590000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-003",
      "wd",
      "my",
      "passport",
      "1tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-004",
    "sku": "KC-EXT-004",
    "name": "Seagate Backup Plus Slim 1TB Portable External Hard Disk (USB 3.0)",
    "slug": "seagate-backup-plus-slim-1tb-portable-external-hard-disk-usb-3-0-kc-ext-004",
    "categoryId": "external-drive",
    "brandId": "seagate",
    "description": "Seagate Seagate Backup Plus Slim 1TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 1000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 570000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-004",
      "seagate",
      "backup",
      "plus",
      "slim",
      "1tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-005",
    "sku": "KC-EXT-005",
    "name": "WD Elements 2TB Portable External Hard Disk (USB 3.0)",
    "slug": "wd-elements-2tb-portable-external-hard-disk-usb-3-0-kc-ext-005",
    "categoryId": "external-drive",
    "brandId": "wd",
    "description": "WD WD Elements 2TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 790000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-005",
      "wd",
      "elements",
      "2tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-006",
    "sku": "KC-EXT-006",
    "name": "Seagate Expansion 2TB Portable External Hard Disk (USB 3.0)",
    "slug": "seagate-expansion-2tb-portable-external-hard-disk-usb-3-0-kc-ext-006",
    "categoryId": "external-drive",
    "brandId": "seagate",
    "description": "Seagate Seagate Expansion 2TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 780000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-006",
      "seagate",
      "expansion",
      "2tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-007",
    "sku": "KC-EXT-007",
    "name": "WD My Passport 2TB Portable External Hard Disk (USB 3.0)",
    "slug": "wd-my-passport-2tb-portable-external-hard-disk-usb-3-0-kc-ext-007",
    "categoryId": "external-drive",
    "brandId": "wd",
    "description": "WD WD My Passport 2TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 2000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 850000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-007",
      "wd",
      "my",
      "passport",
      "2tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-008",
    "sku": "KC-EXT-008",
    "name": "WD Elements 4TB Portable External Hard Disk (USB 3.0)",
    "slug": "wd-elements-4tb-portable-external-hard-disk-usb-3-0-kc-ext-008",
    "categoryId": "external-drive",
    "brandId": "wd",
    "description": "WD WD Elements 4TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 4000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 1250000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-008",
      "wd",
      "elements",
      "4tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-ext-009",
    "sku": "KC-EXT-009",
    "name": "Seagate Expansion 4TB Portable External Hard Disk (USB 3.0)",
    "slug": "seagate-expansion-4tb-portable-external-hard-disk-usb-3-0-kc-ext-009",
    "categoryId": "external-drive",
    "brandId": "seagate",
    "description": "Seagate Seagate Expansion 4TB Portable External Hard Disk (USB 3.0)",
    "specs": {
      "capacityGb": 4000,
      "storageType": "HDD",
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable",
      "rpm": 5400,
      "usageClass": "External"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [],
      "compatibleModels": [],
      "storageInterface": "USB 3.0",
      "storageFormFactor": "2.5\" portable"
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 1230000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847170"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-ext-009",
      "seagate",
      "expansion",
      "4tb",
      "portable",
      "external",
      "hard",
      "disk",
      "usb",
      "3.0",
      "external-drive"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-001",
    "sku": "KC-CHG-001",
    "name": "HP 65W 4.5mm Blue Pin Laptop Charger (Compatible)",
    "slug": "hp-65w-4-5mm-blue-pin-laptop-charger-compatible-kc-chg-001",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 65W 4.5mm Blue Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19.5V 3.33A",
      "connectorType": "4.5mm Blue Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion",
        "hp 14/15 series",
        "probook",
        "elitebook",
        "hp 240/245/250/255 g-series"
      ],
      "wattage": 65,
      "connectorType": "4.5mm Blue Pin",
      "outputVoltage": "19.5V 3.33A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-001",
      "hp",
      "65w",
      "4.5mm",
      "blue",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "hp pavilion",
      "hp 14/15 series",
      "probook",
      "elitebook",
      "hp 240/245/250/255 g-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-002",
    "sku": "KC-CHG-002",
    "name": "HP 65W 4.5mm Blue Pin Laptop Charger (Original)",
    "slug": "hp-65w-4-5mm-blue-pin-laptop-charger-original-kc-chg-002",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 65W 4.5mm Blue Pin Laptop Charger (Original)",
    "specs": {
      "modelOrPartNo": "Y5Y43AA",
      "wattage": 65,
      "outputVoltage": "19.5V 3.33A",
      "connectorType": "4.5mm Blue Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion",
        "hp 14/15 series",
        "probook",
        "elitebook",
        "hp 240/245/250/255 g-series"
      ],
      "wattage": 65,
      "connectorType": "4.5mm Blue Pin",
      "outputVoltage": "19.5V 3.33A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 295000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-002",
      "hp",
      "65w",
      "4.5mm",
      "blue",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "hp pavilion",
      "hp 14/15 series",
      "probook",
      "elitebook",
      "hp 240/245/250/255 g-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-003",
    "sku": "KC-CHG-003",
    "name": "HP 45W 4.5mm Blue Pin Laptop Charger (Compatible)",
    "slug": "hp-45w-4-5mm-blue-pin-laptop-charger-compatible-kc-chg-003",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 45W 4.5mm Blue Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19.5V 2.31A",
      "connectorType": "4.5mm Blue Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion",
        "hp 14/15 series",
        "probook",
        "elitebook",
        "hp 240/245/250/255 g-series"
      ],
      "wattage": 45,
      "connectorType": "4.5mm Blue Pin",
      "outputVoltage": "19.5V 2.31A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 100000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-003",
      "hp",
      "45w",
      "4.5mm",
      "blue",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "hp pavilion",
      "hp 14/15 series",
      "probook",
      "elitebook",
      "hp 240/245/250/255 g-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-004",
    "sku": "KC-CHG-004",
    "name": "HP 45W 4.5mm Blue Pin Laptop Charger (Original)",
    "slug": "hp-45w-4-5mm-blue-pin-laptop-charger-original-kc-chg-004",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 45W 4.5mm Blue Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19.5V 2.31A",
      "connectorType": "4.5mm Blue Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion",
        "hp 14/15 series",
        "probook",
        "elitebook",
        "hp 240/245/250/255 g-series"
      ],
      "wattage": 45,
      "connectorType": "4.5mm Blue Pin",
      "outputVoltage": "19.5V 2.31A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 260000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-004",
      "hp",
      "45w",
      "4.5mm",
      "blue",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "hp pavilion",
      "hp 14/15 series",
      "probook",
      "elitebook",
      "hp 240/245/250/255 g-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-005",
    "sku": "KC-CHG-005",
    "name": "HP 90W 4.5mm Blue Pin Laptop Charger (Compatible)",
    "slug": "hp-90w-4-5mm-blue-pin-laptop-charger-compatible-kc-chg-005",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 90W 4.5mm Blue Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19.5V 4.62A",
      "connectorType": "4.5mm Blue Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion",
        "envy",
        "probook 4xx/6xx",
        "omen (select)"
      ],
      "wattage": 90,
      "connectorType": "4.5mm Blue Pin",
      "outputVoltage": "19.5V 4.62A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-005",
      "hp",
      "90w",
      "4.5mm",
      "blue",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "hp pavilion",
      "envy",
      "probook 4xx/6xx",
      "omen (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-006",
    "sku": "KC-CHG-006",
    "name": "HP 90W 4.5mm Blue Pin Laptop Charger (Original)",
    "slug": "hp-90w-4-5mm-blue-pin-laptop-charger-original-kc-chg-006",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 90W 4.5mm Blue Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19.5V 4.62A",
      "connectorType": "4.5mm Blue Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion",
        "envy",
        "probook 4xx/6xx",
        "omen (select)"
      ],
      "wattage": 90,
      "connectorType": "4.5mm Blue Pin",
      "outputVoltage": "19.5V 4.62A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 350000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-006",
      "hp",
      "90w",
      "4.5mm",
      "blue",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "hp pavilion",
      "envy",
      "probook 4xx/6xx",
      "omen (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-007",
    "sku": "KC-CHG-007",
    "name": "HP 65W 7.4mm Big Pin (center pin) Laptop Charger (Compatible)",
    "slug": "hp-65w-7-4mm-big-pin-center-pin-laptop-charger-compatible-kc-chg-007",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 65W 7.4mm Big Pin (center pin) Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "18.5V 3.5A",
      "connectorType": "7.4mm Big Pin (center pin)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp pavilion dv/g series",
        "compaq presario",
        "older hp/compaq models"
      ],
      "wattage": 65,
      "connectorType": "7.4mm Big Pin (center pin)",
      "outputVoltage": "18.5V 3.5A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 120000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-007",
      "hp",
      "65w",
      "7.4mm",
      "big",
      "pin",
      "center",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "hp pavilion dv/g series",
      "compaq presario",
      "older hp/compaq models"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-008",
    "sku": "KC-CHG-008",
    "name": "Dell 65W 4.5mm Small Pin Laptop Charger (Compatible)",
    "slug": "dell-65w-4-5mm-small-pin-laptop-charger-compatible-kc-chg-008",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 65W 4.5mm Small Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19.5V 3.34A",
      "connectorType": "4.5mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 3000/5000/7000",
        "latitude 3000/5000",
        "vostro 3000/5000",
        "xps 13 (select)"
      ],
      "wattage": 65,
      "connectorType": "4.5mm Small Pin",
      "outputVoltage": "19.5V 3.34A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 115000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-008",
      "dell",
      "65w",
      "4.5mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "inspiron 3000/5000/7000",
      "latitude 3000/5000",
      "vostro 3000/5000",
      "xps 13 (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-009",
    "sku": "KC-CHG-009",
    "name": "Dell 65W 4.5mm Small Pin Laptop Charger (Original)",
    "slug": "dell-65w-4-5mm-small-pin-laptop-charger-original-kc-chg-009",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 65W 4.5mm Small Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19.5V 3.34A",
      "connectorType": "4.5mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 3000/5000/7000",
        "latitude 3000/5000",
        "vostro 3000/5000",
        "xps 13 (select)"
      ],
      "wattage": 65,
      "connectorType": "4.5mm Small Pin",
      "outputVoltage": "19.5V 3.34A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 225000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-009",
      "dell",
      "65w",
      "4.5mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "inspiron 3000/5000/7000",
      "latitude 3000/5000",
      "vostro 3000/5000",
      "xps 13 (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-010",
    "sku": "KC-CHG-010",
    "name": "Dell 45W 4.5mm Small Pin Laptop Charger (Compatible)",
    "slug": "dell-45w-4-5mm-small-pin-laptop-charger-compatible-kc-chg-010",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 45W 4.5mm Small Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19.5V 2.31A",
      "connectorType": "4.5mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 11/13/14",
        "latitude 3000",
        "vostro 3000 slim models"
      ],
      "wattage": 45,
      "connectorType": "4.5mm Small Pin",
      "outputVoltage": "19.5V 2.31A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-010",
      "dell",
      "45w",
      "4.5mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "inspiron 11/13/14",
      "latitude 3000",
      "vostro 3000 slim models"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-011",
    "sku": "KC-CHG-011",
    "name": "Dell 45W 4.5mm Small Pin Laptop Charger (Original)",
    "slug": "dell-45w-4-5mm-small-pin-laptop-charger-original-kc-chg-011",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 45W 4.5mm Small Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19.5V 2.31A",
      "connectorType": "4.5mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 11/13/14",
        "latitude 3000",
        "vostro 3000 slim models"
      ],
      "wattage": 45,
      "connectorType": "4.5mm Small Pin",
      "outputVoltage": "19.5V 2.31A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 220000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-011",
      "dell",
      "45w",
      "4.5mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "inspiron 11/13/14",
      "latitude 3000",
      "vostro 3000 slim models"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-012",
    "sku": "KC-CHG-012",
    "name": "Dell 90W 7.4mm Big Pin (center pin) Laptop Charger (Compatible)",
    "slug": "dell-90w-7-4mm-big-pin-center-pin-laptop-charger-compatible-kc-chg-012",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 90W 7.4mm Big Pin (center pin) Laptop Charger (Compatible)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19.5V 4.62A",
      "connectorType": "7.4mm Big Pin (center pin)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "latitude e5xxx/e6xxx",
        "inspiron 15r/n-series",
        "vostro 1xxx/3xxx (older)"
      ],
      "wattage": 90,
      "connectorType": "7.4mm Big Pin (center pin)",
      "outputVoltage": "19.5V 4.62A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 165000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-012",
      "dell",
      "90w",
      "7.4mm",
      "big",
      "pin",
      "center",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "latitude e5xxx/e6xxx",
      "inspiron 15r/n-series",
      "vostro 1xxx/3xxx (older)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-013",
    "sku": "KC-CHG-013",
    "name": "Dell 90W 7.4mm Big Pin (center pin) Laptop Charger (Original)",
    "slug": "dell-90w-7-4mm-big-pin-center-pin-laptop-charger-original-kc-chg-013",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 90W 7.4mm Big Pin (center pin) Laptop Charger (Original)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19.5V 4.62A",
      "connectorType": "7.4mm Big Pin (center pin)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "latitude e5xxx/e6xxx",
        "inspiron 15r/n-series",
        "vostro 1xxx/3xxx (older)"
      ],
      "wattage": 90,
      "connectorType": "7.4mm Big Pin (center pin)",
      "outputVoltage": "19.5V 4.62A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 290000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-013",
      "dell",
      "90w",
      "7.4mm",
      "big",
      "pin",
      "center",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "latitude e5xxx/e6xxx",
      "inspiron 15r/n-series",
      "vostro 1xxx/3xxx (older)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-014",
    "sku": "KC-CHG-014",
    "name": "Dell 130W 4.5mm Small Pin / 7.4mm (model dependent) Laptop Charger (Compatible)",
    "slug": "dell-130w-4-5mm-small-pin-7-4mm-model-dependent-laptop-charger-compatible-kc-chg-014",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Confirm tip size on old charger",
    "specs": {
      "wattage": 130,
      "outputVoltage": "19.5V 6.67A",
      "connectorType": "4.5mm Small Pin / 7.4mm (model dependent)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 15 7000 gaming",
        "xps 15",
        "precision (select)"
      ],
      "wattage": 130,
      "connectorType": "4.5mm Small Pin / 7.4mm (model dependent)",
      "outputVoltage": "19.5V 6.67A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 230000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-014",
      "dell",
      "130w",
      "4.5mm",
      "small",
      "pin",
      "7.4mm",
      "model",
      "dependent",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "inspiron 15 7000 gaming",
      "xps 15",
      "precision (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-015",
    "sku": "KC-CHG-015",
    "name": "Dell 130W 4.5mm Small Pin / 7.4mm (model dependent) Laptop Charger (Original)",
    "slug": "dell-130w-4-5mm-small-pin-7-4mm-model-dependent-laptop-charger-original-kc-chg-015",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Confirm tip size on old charger",
    "specs": {
      "wattage": 130,
      "outputVoltage": "19.5V 6.67A",
      "connectorType": "4.5mm Small Pin / 7.4mm (model dependent)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 15 7000 gaming",
        "xps 15",
        "precision (select)"
      ],
      "wattage": 130,
      "connectorType": "4.5mm Small Pin / 7.4mm (model dependent)",
      "outputVoltage": "19.5V 6.67A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 430000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-015",
      "dell",
      "130w",
      "4.5mm",
      "small",
      "pin",
      "7.4mm",
      "model",
      "dependent",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "inspiron 15 7000 gaming",
      "xps 15",
      "precision (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-016",
    "sku": "KC-CHG-016",
    "name": "Lenovo 65W Square USB Pin Laptop Charger (Compatible)",
    "slug": "lenovo-65w-square-usb-pin-laptop-charger-compatible-kc-chg-016",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 65W Square USB Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "20V 3.25A",
      "connectorType": "Square USB Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 100/110/310/320/330",
        "thinkpad e/l series",
        "v-series"
      ],
      "wattage": 65,
      "connectorType": "Square USB Pin",
      "outputVoltage": "20V 3.25A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 125000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-016",
      "lenovo",
      "65w",
      "square",
      "usb",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "ideapad 100/110/310/320/330",
      "thinkpad e/l series",
      "v-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-017",
    "sku": "KC-CHG-017",
    "name": "Lenovo 65W Square USB Pin Laptop Charger (Original)",
    "slug": "lenovo-65w-square-usb-pin-laptop-charger-original-kc-chg-017",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 65W Square USB Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "20V 3.25A",
      "connectorType": "Square USB Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 100/110/310/320/330",
        "thinkpad e/l series",
        "v-series"
      ],
      "wattage": 65,
      "connectorType": "Square USB Pin",
      "outputVoltage": "20V 3.25A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 185000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-017",
      "lenovo",
      "65w",
      "square",
      "usb",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "ideapad 100/110/310/320/330",
      "thinkpad e/l series",
      "v-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-018",
    "sku": "KC-CHG-018",
    "name": "Lenovo 45W Square USB Pin Laptop Charger (Compatible)",
    "slug": "lenovo-45w-square-usb-pin-laptop-charger-compatible-kc-chg-018",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 45W Square USB Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "20V 2.25A",
      "connectorType": "Square USB Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 100/110/310",
        "thinkpad e/l slim models"
      ],
      "wattage": 45,
      "connectorType": "Square USB Pin",
      "outputVoltage": "20V 2.25A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 115000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-018",
      "lenovo",
      "45w",
      "square",
      "usb",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "ideapad 100/110/310",
      "thinkpad e/l slim models"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-019",
    "sku": "KC-CHG-019",
    "name": "Lenovo 45W Square USB Pin Laptop Charger (Original)",
    "slug": "lenovo-45w-square-usb-pin-laptop-charger-original-kc-chg-019",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 45W Square USB Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "20V 2.25A",
      "connectorType": "Square USB Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 100/110/310",
        "thinkpad e/l slim models"
      ],
      "wattage": 45,
      "connectorType": "Square USB Pin",
      "outputVoltage": "20V 2.25A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 165000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-019",
      "lenovo",
      "45w",
      "square",
      "usb",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "ideapad 100/110/310",
      "thinkpad e/l slim models"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-020",
    "sku": "KC-CHG-020",
    "name": "Lenovo 65W 4.0x1.7mm Slim Tip (Yellow) Laptop Charger (Compatible)",
    "slug": "lenovo-65w-4-0x1-7mm-slim-tip-yellow-laptop-charger-compatible-kc-chg-020",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 65W 4.0x1.7mm Slim Tip (Yellow) Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "20V 3.25A",
      "connectorType": "4.0x1.7mm Slim Tip (Yellow)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 110/310/320/330",
        "yoga 310/510 (select)"
      ],
      "wattage": 65,
      "connectorType": "4.0x1.7mm Slim Tip (Yellow)",
      "outputVoltage": "20V 3.25A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 120000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-020",
      "lenovo",
      "65w",
      "4.0x1.7mm",
      "slim",
      "tip",
      "yellow",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "ideapad 110/310/320/330",
      "yoga 310/510 (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-021",
    "sku": "KC-CHG-021",
    "name": "Lenovo 65W 4.0x1.7mm Slim Tip (Yellow) Laptop Charger (Original)",
    "slug": "lenovo-65w-4-0x1-7mm-slim-tip-yellow-laptop-charger-original-kc-chg-021",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 65W 4.0x1.7mm Slim Tip (Yellow) Laptop Charger (Original)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "20V 3.25A",
      "connectorType": "4.0x1.7mm Slim Tip (Yellow)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 110/310/320/330",
        "yoga 310/510 (select)"
      ],
      "wattage": 65,
      "connectorType": "4.0x1.7mm Slim Tip (Yellow)",
      "outputVoltage": "20V 3.25A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-021",
      "lenovo",
      "65w",
      "4.0x1.7mm",
      "slim",
      "tip",
      "yellow",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "ideapad 110/310/320/330",
      "yoga 310/510 (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-022",
    "sku": "KC-CHG-022",
    "name": "Lenovo 65W 7.9x5.5mm Yellow Pin (center pin) Laptop Charger (Compatible)",
    "slug": "lenovo-65w-7-9x5-5mm-yellow-pin-center-pin-laptop-charger-compatible-kc-chg-022",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 65W 7.9x5.5mm Yellow Pin (center pin) Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "20V 3.25A",
      "connectorType": "7.9x5.5mm Yellow Pin (center pin)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad g/z series (older)",
        "thinkpad edge (older)"
      ],
      "wattage": 65,
      "connectorType": "7.9x5.5mm Yellow Pin (center pin)",
      "outputVoltage": "20V 3.25A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 125000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-022",
      "lenovo",
      "65w",
      "7.9x5.5mm",
      "yellow",
      "pin",
      "center",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "ideapad g/z series (older)",
      "thinkpad edge (older)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-023",
    "sku": "KC-CHG-023",
    "name": "Lenovo 90W Square USB Pin Laptop Charger (Compatible)",
    "slug": "lenovo-90w-square-usb-pin-laptop-charger-compatible-kc-chg-023",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 90W Square USB Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "20V 4.5A",
      "connectorType": "Square USB Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "thinkpad t/e/l series",
        "ideapad 500/700 (select)"
      ],
      "wattage": 90,
      "connectorType": "Square USB Pin",
      "outputVoltage": "20V 4.5A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 170000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-023",
      "lenovo",
      "90w",
      "square",
      "usb",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "thinkpad t/e/l series",
      "ideapad 500/700 (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-024",
    "sku": "KC-CHG-024",
    "name": "Lenovo 135W Slim Tip (rectangular) Laptop Charger (Compatible)",
    "slug": "lenovo-135w-slim-tip-rectangular-laptop-charger-compatible-kc-chg-024",
    "categoryId": "laptop-charger",
    "brandId": "lenovo",
    "description": "Confirm tip shape on old charger",
    "specs": {
      "wattage": 135,
      "outputVoltage": "20V 6.75A",
      "connectorType": "Slim Tip (rectangular)"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "legion y/5/7 series",
        "ideapad gaming 3 (select)"
      ],
      "wattage": 135,
      "connectorType": "Slim Tip (rectangular)",
      "outputVoltage": "20V 6.75A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 240000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-024",
      "lenovo",
      "135w",
      "slim",
      "tip",
      "rectangular",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "legion y/5/7 series",
      "ideapad gaming 3 (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-025",
    "sku": "KC-CHG-025",
    "name": "Asus 45W 4.0x1.35mm Small Pin Laptop Charger (Compatible)",
    "slug": "asus-45w-4-0x1-35mm-small-pin-laptop-charger-compatible-kc-chg-025",
    "categoryId": "laptop-charger",
    "brandId": "asus",
    "description": "Asus Asus 45W 4.0x1.35mm Small Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19V 2.37A",
      "connectorType": "4.0x1.35mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "vivobook x/s series",
        "zenbook (select)"
      ],
      "wattage": 45,
      "connectorType": "4.0x1.35mm Small Pin",
      "outputVoltage": "19V 2.37A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-025",
      "asus",
      "45w",
      "4.0x1.35mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "vivobook x/s series",
      "zenbook (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-026",
    "sku": "KC-CHG-026",
    "name": "Asus 45W 4.0x1.35mm Small Pin Laptop Charger (Original)",
    "slug": "asus-45w-4-0x1-35mm-small-pin-laptop-charger-original-kc-chg-026",
    "categoryId": "laptop-charger",
    "brandId": "asus",
    "description": "Asus Asus 45W 4.0x1.35mm Small Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19V 2.37A",
      "connectorType": "4.0x1.35mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "vivobook x/s series",
        "zenbook (select)"
      ],
      "wattage": 45,
      "connectorType": "4.0x1.35mm Small Pin",
      "outputVoltage": "19V 2.37A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-026",
      "asus",
      "45w",
      "4.0x1.35mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "vivobook x/s series",
      "zenbook (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-027",
    "sku": "KC-CHG-027",
    "name": "Asus 65W 4.0x1.35mm Small Pin Laptop Charger (Compatible)",
    "slug": "asus-65w-4-0x1-35mm-small-pin-laptop-charger-compatible-kc-chg-027",
    "categoryId": "laptop-charger",
    "brandId": "asus",
    "description": "Asus Asus 65W 4.0x1.35mm Small Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.42A",
      "connectorType": "4.0x1.35mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "vivobook x/s series",
        "expertbook",
        "zenbook (select)"
      ],
      "wattage": 65,
      "connectorType": "4.0x1.35mm Small Pin",
      "outputVoltage": "19V 3.42A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 125000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-027",
      "asus",
      "65w",
      "4.0x1.35mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "vivobook x/s series",
      "expertbook",
      "zenbook (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-028",
    "sku": "KC-CHG-028",
    "name": "Asus 65W 4.0x1.35mm Small Pin Laptop Charger (Original)",
    "slug": "asus-65w-4-0x1-35mm-small-pin-laptop-charger-original-kc-chg-028",
    "categoryId": "laptop-charger",
    "brandId": "asus",
    "description": "Asus Asus 65W 4.0x1.35mm Small Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.42A",
      "connectorType": "4.0x1.35mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "vivobook x/s series",
        "expertbook",
        "zenbook (select)"
      ],
      "wattage": 65,
      "connectorType": "4.0x1.35mm Small Pin",
      "outputVoltage": "19V 3.42A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 230000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-028",
      "asus",
      "65w",
      "4.0x1.35mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "vivobook x/s series",
      "expertbook",
      "zenbook (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-029",
    "sku": "KC-CHG-029",
    "name": "Asus 90W 5.5x2.5mm Big Pin Laptop Charger (Compatible)",
    "slug": "asus-90w-5-5x2-5mm-big-pin-laptop-charger-compatible-kc-chg-029",
    "categoryId": "laptop-charger",
    "brandId": "asus",
    "description": "Asus Asus 90W 5.5x2.5mm Big Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19V 4.74A",
      "connectorType": "5.5x2.5mm Big Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "asus k/x/n/g series (older)",
        "tuf (select)"
      ],
      "wattage": 90,
      "connectorType": "5.5x2.5mm Big Pin",
      "outputVoltage": "19V 4.74A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 155000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-029",
      "asus",
      "90w",
      "5.5x2.5mm",
      "big",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "asus k/x/n/g series (older)",
      "tuf (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-030",
    "sku": "KC-CHG-030",
    "name": "Asus 90W 5.5x2.5mm Big Pin Laptop Charger (Original)",
    "slug": "asus-90w-5-5x2-5mm-big-pin-laptop-charger-original-kc-chg-030",
    "categoryId": "laptop-charger",
    "brandId": "asus",
    "description": "Asus Asus 90W 5.5x2.5mm Big Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19V 4.74A",
      "connectorType": "5.5x2.5mm Big Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "asus k/x/n/g series (older)",
        "tuf (select)"
      ],
      "wattage": 90,
      "connectorType": "5.5x2.5mm Big Pin",
      "outputVoltage": "19V 4.74A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 290000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-030",
      "asus",
      "90w",
      "5.5x2.5mm",
      "big",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "asus k/x/n/g series (older)",
      "tuf (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-031",
    "sku": "KC-CHG-031",
    "name": "Acer 45W 3.0x1.1mm Small Pin Laptop Charger (Compatible)",
    "slug": "acer-45w-3-0x1-1mm-small-pin-laptop-charger-compatible-kc-chg-031",
    "categoryId": "laptop-charger",
    "brandId": "acer",
    "description": "Acer Acer 45W 3.0x1.1mm Small Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 45,
      "outputVoltage": "19V 2.37A",
      "connectorType": "3.0x1.1mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire e/es/one",
        "swift (select)"
      ],
      "wattage": 45,
      "connectorType": "3.0x1.1mm Small Pin",
      "outputVoltage": "19V 2.37A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-031",
      "acer",
      "45w",
      "3.0x1.1mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "aspire e/es/one",
      "swift (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-032",
    "sku": "KC-CHG-032",
    "name": "Acer 65W 3.0x1.1mm Small Pin Laptop Charger (Compatible)",
    "slug": "acer-65w-3-0x1-1mm-small-pin-laptop-charger-compatible-kc-chg-032",
    "categoryId": "laptop-charger",
    "brandId": "acer",
    "description": "Acer Acer 65W 3.0x1.1mm Small Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.42A",
      "connectorType": "3.0x1.1mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire e/es/v",
        "swift 3",
        "extensa (select)"
      ],
      "wattage": 65,
      "connectorType": "3.0x1.1mm Small Pin",
      "outputVoltage": "19V 3.42A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 125000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-032",
      "acer",
      "65w",
      "3.0x1.1mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "aspire e/es/v",
      "swift 3",
      "extensa (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-033",
    "sku": "KC-CHG-033",
    "name": "Acer 65W 3.0x1.1mm Small Pin Laptop Charger (Original)",
    "slug": "acer-65w-3-0x1-1mm-small-pin-laptop-charger-original-kc-chg-033",
    "categoryId": "laptop-charger",
    "brandId": "acer",
    "description": "Acer Acer 65W 3.0x1.1mm Small Pin Laptop Charger (Original)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.42A",
      "connectorType": "3.0x1.1mm Small Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire e/es/v",
        "swift 3",
        "extensa (select)"
      ],
      "wattage": 65,
      "connectorType": "3.0x1.1mm Small Pin",
      "outputVoltage": "19V 3.42A"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 230000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-033",
      "acer",
      "65w",
      "3.0x1.1mm",
      "small",
      "pin",
      "laptop",
      "charger",
      "original",
      "laptop-charger",
      "aspire e/es/v",
      "swift 3",
      "extensa (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-034",
    "sku": "KC-CHG-034",
    "name": "Acer 65W 5.5x1.7mm Big Pin Laptop Charger (Compatible)",
    "slug": "acer-65w-5-5x1-7mm-big-pin-laptop-charger-compatible-kc-chg-034",
    "categoryId": "laptop-charger",
    "brandId": "acer",
    "description": "Acer Acer 65W 5.5x1.7mm Big Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.42A",
      "connectorType": "5.5x1.7mm Big Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire 4/5/7 series (older)",
        "travelmate (older)"
      ],
      "wattage": 65,
      "connectorType": "5.5x1.7mm Big Pin",
      "outputVoltage": "19V 3.42A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 125000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-034",
      "acer",
      "65w",
      "5.5x1.7mm",
      "big",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "aspire 4/5/7 series (older)",
      "travelmate (older)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-035",
    "sku": "KC-CHG-035",
    "name": "Acer 90W 5.5x1.7mm Big Pin Laptop Charger (Compatible)",
    "slug": "acer-90w-5-5x1-7mm-big-pin-laptop-charger-compatible-kc-chg-035",
    "categoryId": "laptop-charger",
    "brandId": "acer",
    "description": "Acer Acer 90W 5.5x1.7mm Big Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 90,
      "outputVoltage": "19V 4.74A",
      "connectorType": "5.5x1.7mm Big Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire 5/7",
        "nitro",
        "travelmate (select)"
      ],
      "wattage": 90,
      "connectorType": "5.5x1.7mm Big Pin",
      "outputVoltage": "19V 4.74A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 160000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-035",
      "acer",
      "90w",
      "5.5x1.7mm",
      "big",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "aspire 5/7",
      "nitro",
      "travelmate (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-036",
    "sku": "KC-CHG-036",
    "name": "Sony 65W 6.5x4.4mm Pin Laptop Charger (Compatible)",
    "slug": "sony-65w-6-5x4-4mm-pin-laptop-charger-compatible-kc-chg-036",
    "categoryId": "laptop-charger",
    "brandId": "sony",
    "description": "Sony Sony 65W 6.5x4.4mm Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19.5V 3.3A",
      "connectorType": "6.5x4.4mm Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "sony"
      ],
      "compatibleModels": [
        "vaio vpcea/vpceb/vpccb",
        "sve series"
      ],
      "wattage": 65,
      "connectorType": "6.5x4.4mm Pin",
      "outputVoltage": "19.5V 3.3A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 135000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-036",
      "sony",
      "65w",
      "6.5x4.4mm",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "vaio vpcea/vpceb/vpccb",
      "sve series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-037",
    "sku": "KC-CHG-037",
    "name": "Samsung 65W 5.5x3.0mm Pin Laptop Charger (Compatible)",
    "slug": "samsung-65w-5-5x3-0mm-pin-laptop-charger-compatible-kc-chg-037",
    "categoryId": "laptop-charger",
    "brandId": "samsung",
    "description": "Samsung Samsung 65W 5.5x3.0mm Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.16A",
      "connectorType": "5.5x3.0mm Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "samsung"
      ],
      "compatibleModels": [
        "np300e/np350/r-series"
      ],
      "wattage": 65,
      "connectorType": "5.5x3.0mm Pin",
      "outputVoltage": "19V 3.16A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 135000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-037",
      "samsung",
      "65w",
      "5.5x3.0mm",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "np300e/np350/r-series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-038",
    "sku": "KC-CHG-038",
    "name": "Toshiba 65W 5.5x2.5mm Pin Laptop Charger (Compatible)",
    "slug": "toshiba-65w-5-5x2-5mm-pin-laptop-charger-compatible-kc-chg-038",
    "categoryId": "laptop-charger",
    "brandId": "toshiba",
    "description": "Toshiba Toshiba 65W 5.5x2.5mm Pin Laptop Charger (Compatible)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "19V 3.42A",
      "connectorType": "5.5x2.5mm Pin"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "toshiba"
      ],
      "compatibleModels": [
        "satellite c/l/p series",
        "tecra (select)"
      ],
      "wattage": 65,
      "connectorType": "5.5x2.5mm Pin",
      "outputVoltage": "19V 3.42A"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 135000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-038",
      "toshiba",
      "65w",
      "5.5x2.5mm",
      "pin",
      "laptop",
      "charger",
      "compatible",
      "laptop-charger",
      "satellite c/l/p series",
      "tecra (select)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-039",
    "sku": "KC-CHG-039",
    "name": "Universal USB-C PD 65W Laptop Charger",
    "slug": "universal-usb-c-pd-65w-laptop-charger-kc-chg-039",
    "categoryId": "laptop-charger",
    "brandId": "universal",
    "description": "Only for laptops with USB-C charging port",
    "specs": {
      "wattage": 65,
      "outputVoltage": "5-20V PD",
      "connectorType": "USB Type-C"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp",
        "dell",
        "lenovo",
        "asus",
        "acer",
        "samsung"
      ],
      "compatibleModels": [
        "usb-c pd-charging laptops only"
      ],
      "wattage": 65,
      "connectorType": "USB Type-C",
      "outputVoltage": "5-20V PD"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-039",
      "universal",
      "usb",
      "pd",
      "65w",
      "laptop",
      "charger",
      "laptop-charger",
      "hp",
      "dell",
      "lenovo",
      "asus",
      "acer",
      "samsung",
      "usb-c pd-charging laptops only"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-040",
    "sku": "KC-CHG-040",
    "name": "HP 65W USB Type-C Charger (Original)",
    "slug": "hp-65w-usb-type-c-charger-original-kc-chg-040",
    "categoryId": "laptop-charger",
    "brandId": "hp",
    "description": "HP HP 65W USB Type-C Charger (Original)",
    "specs": {
      "modelOrPartNo": "944V0AA",
      "wattage": 65,
      "outputVoltage": "5-20V PD",
      "connectorType": "USB Type-C"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp usb-c charging laptops"
      ],
      "wattage": 65,
      "connectorType": "USB Type-C",
      "outputVoltage": "5-20V PD"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 390000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-040",
      "hp",
      "65w",
      "usb",
      "type",
      "charger",
      "original",
      "laptop-charger",
      "hp usb-c charging laptops"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-041",
    "sku": "KC-CHG-041",
    "name": "Dell 65W USB Type-C Charger (Original)",
    "slug": "dell-65w-usb-type-c-charger-original-kc-chg-041",
    "categoryId": "laptop-charger",
    "brandId": "dell",
    "description": "Dell Dell 65W USB Type-C Charger (Original)",
    "specs": {
      "wattage": 65,
      "outputVoltage": "5-20V PD",
      "connectorType": "USB Type-C"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "dell usb-c charging laptops"
      ],
      "wattage": 65,
      "connectorType": "USB Type-C",
      "outputVoltage": "5-20V PD"
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 420000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-041",
      "dell",
      "65w",
      "usb",
      "type",
      "charger",
      "original",
      "laptop-charger",
      "dell usb-c charging laptops"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-chg-042",
    "sku": "KC-CHG-042",
    "name": "Universal Adjustable 120W Laptop Charger (8 tips)",
    "slug": "universal-adjustable-120w-laptop-charger-8-tips-kc-chg-042",
    "categoryId": "laptop-charger",
    "brandId": "universal",
    "description": "Not recommended where exact-match charger is available",
    "specs": {
      "wattage": 120,
      "outputVoltage": "12-24V adjustable",
      "connectorType": "Multi-tip"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "any (check voltage)"
      ],
      "compatibleModels": [],
      "wattage": 120,
      "connectorType": "Multi-tip",
      "outputVoltage": "12-24V adjustable"
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 160000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-chg-042",
      "universal",
      "adjustable",
      "120w",
      "laptop",
      "charger",
      "tips",
      "laptop-charger",
      "any (check voltage)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-001",
    "sku": "KC-BAT-001",
    "name": "HP HS04 Laptop Battery (Compatible)",
    "slug": "hp-hs04-laptop-battery-compatible-kc-bat-001",
    "categoryId": "laptop-battery",
    "brandId": "hp",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "HS04"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp 14-ac/14-ar series",
        "hp 15-ac/15-af/15-ay series",
        "hp 240/245/250/255 g4"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 180000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-001",
      "hp",
      "hs04",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "hp 14-ac/14-ar series",
      "hp 15-ac/15-af/15-ay series",
      "hp 240/245/250/255 g4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-002",
    "sku": "KC-BAT-002",
    "name": "HP HS04 Laptop Battery (Original)",
    "slug": "hp-hs04-laptop-battery-original-kc-bat-002",
    "categoryId": "laptop-battery",
    "brandId": "hp",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "HS04"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp 14-ac/14-ar series",
        "hp 15-ac/15-af/15-ay series",
        "hp 240/245/250/255 g4"
      ]
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 290000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-002",
      "hp",
      "hs04",
      "laptop",
      "battery",
      "original",
      "laptop-battery",
      "hp 14-ac/14-ar series",
      "hp 15-ac/15-af/15-ay series",
      "hp 240/245/250/255 g4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-003",
    "sku": "KC-BAT-003",
    "name": "HP JC04 Laptop Battery (Compatible)",
    "slug": "hp-jc04-laptop-battery-compatible-kc-bat-003",
    "categoryId": "laptop-battery",
    "brandId": "hp",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "JC04"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp 15-bs/15-bw series",
        "hp 250/255 g6",
        "hp 14-bs series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 200000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-003",
      "hp",
      "jc04",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "hp 15-bs/15-bw series",
      "hp 250/255 g6",
      "hp 14-bs series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-004",
    "sku": "KC-BAT-004",
    "name": "HP JC04 Laptop Battery (Original)",
    "slug": "hp-jc04-laptop-battery-original-kc-bat-004",
    "categoryId": "laptop-battery",
    "brandId": "hp",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "JC04"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp 15-bs/15-bw series",
        "hp 250/255 g6",
        "hp 14-bs series"
      ]
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 310000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-004",
      "hp",
      "jc04",
      "laptop",
      "battery",
      "original",
      "laptop-battery",
      "hp 15-bs/15-bw series",
      "hp 250/255 g6",
      "hp 14-bs series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-005",
    "sku": "KC-BAT-005",
    "name": "HP OA04 Laptop Battery (Compatible)",
    "slug": "hp-oa04-laptop-battery-compatible-kc-bat-005",
    "categoryId": "laptop-battery",
    "brandId": "hp",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "OA04"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp 240/245/250/255 g5 (verify exact model)"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 200000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-005",
      "hp",
      "oa04",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "hp 240/245/250/255 g5 (verify exact model)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-006",
    "sku": "KC-BAT-006",
    "name": "HP OA04 Laptop Battery (Original)",
    "slug": "hp-oa04-laptop-battery-original-kc-bat-006",
    "categoryId": "laptop-battery",
    "brandId": "hp",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "OA04"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "hp 240/245/250/255 g5 (verify exact model)"
      ]
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-006",
      "hp",
      "oa04",
      "laptop",
      "battery",
      "original",
      "laptop-battery",
      "hp 240/245/250/255 g5 (verify exact model)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-007",
    "sku": "KC-BAT-007",
    "name": "Lenovo L12M4E01 Laptop Battery (Compatible)",
    "slug": "lenovo-l12m4e01-laptop-battery-compatible-kc-bat-007",
    "categoryId": "laptop-battery",
    "brandId": "lenovo",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "L12M4E01"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad g40-30/70",
        "g50-30/45/70/80",
        "z50-70/75"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-007",
      "lenovo",
      "l12m4e01",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "ideapad g40-30/70",
      "g50-30/45/70/80",
      "z50-70/75"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-008",
    "sku": "KC-BAT-008",
    "name": "Acer AL12A32 Laptop Battery (Compatible)",
    "slug": "acer-al12a32-laptop-battery-compatible-kc-bat-008",
    "categoryId": "laptop-battery",
    "brandId": "acer",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "AL12A32"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire e1-421/431/471/521/531/571",
        "v5-431/471/531/571"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 200000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-008",
      "acer",
      "al12a32",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "aspire e1-421/431/471/521/531/571",
      "v5-431/471/531/571"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-009",
    "sku": "KC-BAT-009",
    "name": "Acer AS10D31 Laptop Battery (Compatible)",
    "slug": "acer-as10d31-laptop-battery-compatible-kc-bat-009",
    "categoryId": "laptop-battery",
    "brandId": "acer",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "AS10D31"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire 4741/4551/5741/5742/5551"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-009",
      "acer",
      "as10d31",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "aspire 4741/4551/5741/5742/5551"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-010",
    "sku": "KC-BAT-010",
    "name": "Asus A41-X550A Laptop Battery (Compatible)",
    "slug": "asus-a41-x550a-laptop-battery-compatible-kc-bat-010",
    "categoryId": "laptop-battery",
    "brandId": "asus",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "A41-X550A"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "x450/x550/x552/k550/f450 series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 210000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-010",
      "asus",
      "a41",
      "x550a",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "x450/x550/x552/k550/f450 series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-011",
    "sku": "KC-BAT-011",
    "name": "Asus A32-K53 Laptop Battery (Compatible)",
    "slug": "asus-a32-k53-laptop-battery-compatible-kc-bat-011",
    "categoryId": "laptop-battery",
    "brandId": "asus",
    "description": "verify battery part no. printed on old battery before sale",
    "specs": {
      "modelOrPartNo": "A32-K53"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "k53/x53/k43/x54h/a53s series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-011",
      "asus",
      "a32",
      "k53",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "k53/x53/k43/x54h/a53s series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-012",
    "sku": "KC-BAT-012",
    "name": "Dell Inspiron 15 3000/5000 Laptop Battery (Compatible)",
    "slug": "dell-inspiron-15-3000-5000-laptop-battery-compatible-kc-bat-012",
    "categoryId": "laptop-battery",
    "brandId": "dell",
    "description": "Dell part numbers vary by model; fill exact part no. from old battery",
    "specs": {
      "modelOrPartNo": "VERIFY"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 15 3521/3537/5521/5537 (verify exact model)"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 210000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-012",
      "dell",
      "inspiron",
      "15",
      "3000",
      "5000",
      "laptop",
      "battery",
      "compatible",
      "laptop-battery",
      "inspiron 15 3521/3537/5521/5537 (verify exact model)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-bat-013",
    "sku": "KC-BAT-013",
    "name": "Dell Inspiron 15 3000/5000 Laptop Battery (Original)",
    "slug": "dell-inspiron-15-3000-5000-laptop-battery-original-kc-bat-013",
    "categoryId": "laptop-battery",
    "brandId": "dell",
    "description": "Dell part numbers vary by model; fill exact part no. from old battery",
    "specs": {
      "modelOrPartNo": "VERIFY"
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 15 3521/3537/5521/5537 (verify exact model)"
      ]
    },
    "condition": "original",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 350000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850760"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-bat-013",
      "dell",
      "inspiron",
      "15",
      "3000",
      "5000",
      "laptop",
      "battery",
      "original",
      "laptop-battery",
      "inspiron 15 3521/3537/5521/5537 (verify exact model)"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-001",
    "sku": "KC-SCR-001",
    "name": "11.6\" HD 30-Pin Slim Laptop Screen (Generic)",
    "slug": "11-6-hd-30-pin-slim-laptop-screen-generic-kc-scr-001",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 11.6,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 11.6,
      "resolution": "HD 1366x768",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 310000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-001",
      "11.6\"",
      "hd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-002",
    "sku": "KC-SCR-002",
    "name": "12.5\" HD 30-Pin Slim Laptop Screen (LG Display)",
    "slug": "12-5-hd-30-pin-slim-laptop-screen-lg-display-kc-scr-002",
    "categoryId": "laptop-screen",
    "brandId": "lg-display",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "modelOrPartNo": "LP125WH2-TPF1",
      "screenSizeIn": 12.5,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 12.5,
      "resolution": "HD 1366x768",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 330000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-002",
      "12.5\"",
      "hd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "lg",
      "display",
      "lg display",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-003",
    "sku": "KC-SCR-003",
    "name": "13.3\" HD 30-Pin Slim Laptop Screen (Generic)",
    "slug": "13-3-hd-30-pin-slim-laptop-screen-generic-kc-scr-003",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 13.3,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 13.3,
      "resolution": "HD 1366x768",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 330000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-003",
      "13.3\"",
      "hd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-004",
    "sku": "KC-SCR-004",
    "name": "13.3\" FHD 30-Pin Slim Laptop Screen (BOE)",
    "slug": "13-3-fhd-30-pin-slim-laptop-screen-boe-kc-scr-004",
    "categoryId": "laptop-screen",
    "brandId": "boe",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 13.3,
      "resolution": "FHD 1920x1080",
      "panelType": "IPS",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 13.3,
      "resolution": "FHD 1920x1080",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 430000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-004",
      "13.3\"",
      "fhd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "boe",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-005",
    "sku": "KC-SCR-005",
    "name": "14.0\" HD 30-Pin Slim Laptop Screen (Generic)",
    "slug": "14-0-hd-30-pin-slim-laptop-screen-generic-kc-scr-005",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 14,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 14,
      "resolution": "HD 1366x768",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 300000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-005",
      "14.0\"",
      "hd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-006",
    "sku": "KC-SCR-006",
    "name": "14.0\" HD 40-Pin Normal Laptop Screen (Generic)",
    "slug": "14-0-hd-40-pin-normal-laptop-screen-generic-kc-scr-006",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 14,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 40,
      "screenMounting": "Normal",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 14,
      "resolution": "HD 1366x768",
      "screenPin": 40
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 310000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-006",
      "14.0\"",
      "hd",
      "40",
      "pin",
      "normal",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-007",
    "sku": "KC-SCR-007",
    "name": "14.0\" FHD 30-Pin Slim Laptop Screen (BOE)",
    "slug": "14-0-fhd-30-pin-slim-laptop-screen-boe-kc-scr-007",
    "categoryId": "laptop-screen",
    "brandId": "boe",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 14,
      "resolution": "FHD 1920x1080",
      "panelType": "IPS",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 14,
      "resolution": "FHD 1920x1080",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 420000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-007",
      "14.0\"",
      "fhd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "boe",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-008",
    "sku": "KC-SCR-008",
    "name": "14.0\" WUXGA 30-Pin Slim Laptop Screen (LG Display)",
    "slug": "14-0-wuxga-30-pin-slim-laptop-screen-lg-display-kc-scr-008",
    "categoryId": "laptop-screen",
    "brandId": "lg-display",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "modelOrPartNo": "LP140WU2-SPB1",
      "screenSizeIn": 14,
      "resolution": "WUXGA 1920x1200",
      "panelType": "IPS",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 14,
      "resolution": "WUXGA 1920x1200",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 490000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-008",
      "14.0\"",
      "wuxga",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "lg",
      "display",
      "lg display",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-009",
    "sku": "KC-SCR-009",
    "name": "15.6\" HD 30-Pin Slim Laptop Screen (Generic)",
    "slug": "15-6-hd-30-pin-slim-laptop-screen-generic-kc-scr-009",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 15.6,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 15.6,
      "resolution": "HD 1366x768",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 330000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-009",
      "15.6\"",
      "hd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-010",
    "sku": "KC-SCR-010",
    "name": "15.6\" HD 30-Pin Normal Laptop Screen (Generic)",
    "slug": "15-6-hd-30-pin-normal-laptop-screen-generic-kc-scr-010",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 15.6,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 30,
      "screenMounting": "Normal",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 15.6,
      "resolution": "HD 1366x768",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 320000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-010",
      "15.6\"",
      "hd",
      "30",
      "pin",
      "normal",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-011",
    "sku": "KC-SCR-011",
    "name": "15.6\" HD 40-Pin Normal Laptop Screen (Generic)",
    "slug": "15-6-hd-40-pin-normal-laptop-screen-generic-kc-scr-011",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 15.6,
      "resolution": "HD 1366x768",
      "panelType": "LED (TN)",
      "screenPin": 40,
      "screenMounting": "Normal",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 15.6,
      "resolution": "HD 1366x768",
      "screenPin": 40
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 300000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-011",
      "15.6\"",
      "hd",
      "40",
      "pin",
      "normal",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-012",
    "sku": "KC-SCR-012",
    "name": "15.6\" FHD 30-Pin Slim Laptop Screen (BOE)",
    "slug": "15-6-fhd-30-pin-slim-laptop-screen-boe-kc-scr-012",
    "categoryId": "laptop-screen",
    "brandId": "boe",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "modelOrPartNo": "NV156FHM-N48",
      "screenSizeIn": 15.6,
      "resolution": "FHD 1920x1080",
      "panelType": "IPS",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 15.6,
      "resolution": "FHD 1920x1080",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 440000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-012",
      "15.6\"",
      "fhd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "boe",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-013",
    "sku": "KC-SCR-013",
    "name": "15.6\" FHD 40-Pin Slim Laptop Screen (Generic)",
    "slug": "15-6-fhd-40-pin-slim-laptop-screen-generic-kc-scr-013",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 15.6,
      "resolution": "FHD 1920x1080",
      "panelType": "IPS",
      "screenPin": 40,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 15.6,
      "resolution": "FHD 1920x1080",
      "screenPin": 40
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 420000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-013",
      "15.6\"",
      "fhd",
      "40",
      "pin",
      "slim",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-014",
    "sku": "KC-SCR-014",
    "name": "15.6\" FHD 30-Pin Slim Laptop Screen (LG Display)",
    "slug": "15-6-fhd-30-pin-slim-laptop-screen-lg-display-kc-scr-014",
    "categoryId": "laptop-screen",
    "brandId": "lg-display",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "modelOrPartNo": "LP156WFG-SPF2",
      "screenSizeIn": 15.6,
      "resolution": "FHD 1920x1080",
      "panelType": "IPS (144Hz gaming)",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 144
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 15.6,
      "resolution": "FHD 1920x1080",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 780000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-014",
      "15.6\"",
      "fhd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "lg",
      "display",
      "lg display",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-015",
    "sku": "KC-SCR-015",
    "name": "17.3\" HD+ 40-Pin Normal Laptop Screen (Generic)",
    "slug": "17-3-hd-40-pin-normal-laptop-screen-generic-kc-scr-015",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 17.3,
      "resolution": "HD+ 1600x900",
      "panelType": "LED (TN)",
      "screenPin": 40,
      "screenMounting": "Normal",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 17.3,
      "resolution": "HD+ 1600x900",
      "screenPin": 40
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 520000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-015",
      "17.3\"",
      "hd+",
      "40",
      "pin",
      "normal",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-scr-016",
    "sku": "KC-SCR-016",
    "name": "17.3\" FHD 30-Pin Slim Laptop Screen (Generic)",
    "slug": "17-3-fhd-30-pin-slim-laptop-screen-generic-kc-scr-016",
    "categoryId": "laptop-screen",
    "brandId": "generic",
    "description": "Match size, resolution, pin count AND connector position with old panel",
    "specs": {
      "screenSizeIn": 17.3,
      "resolution": "FHD 1920x1080",
      "panelType": "IPS",
      "screenPin": 30,
      "screenMounting": "Slim",
      "refreshRateHz": 60
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "universal (match size/pin/resolution)"
      ],
      "compatibleModels": [
        "check panel part no. on back of old screen"
      ],
      "screenSizeIn": 17.3,
      "resolution": "FHD 1920x1080",
      "screenPin": 30
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 630000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "8524"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-scr-016",
      "17.3\"",
      "fhd",
      "30",
      "pin",
      "slim",
      "laptop",
      "screen",
      "generic",
      "laptop-screen",
      "universal (match size/pin/resolution)",
      "check panel part no. on back of old screen"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-001",
    "sku": "KC-LKB-001",
    "name": "HP 15-ac Laptop Keyboard",
    "slug": "hp-15-ac-laptop-keyboard-kc-lkb-001",
    "categoryId": "laptop-keyboard",
    "brandId": "hp",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "15-ac",
        "15-af",
        "15-ay",
        "250 g4",
        "250 g5",
        "255 g4"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-001",
      "hp",
      "15",
      "ac",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "15-ac",
      "15-af",
      "15-ay",
      "250 g4",
      "250 g5",
      "255 g4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-002",
    "sku": "KC-LKB-002",
    "name": "HP 14-ac Laptop Keyboard",
    "slug": "hp-14-ac-laptop-keyboard-kc-lkb-002",
    "categoryId": "laptop-keyboard",
    "brandId": "hp",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "14-ac",
        "14-ar",
        "240 g4",
        "245 g4"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-002",
      "hp",
      "14",
      "ac",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "14-ac",
      "14-ar",
      "240 g4",
      "245 g4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-003",
    "sku": "KC-LKB-003",
    "name": "HP Pavilion 15-p Laptop Keyboard",
    "slug": "hp-pavilion-15-p-laptop-keyboard-kc-lkb-003",
    "categoryId": "laptop-keyboard",
    "brandId": "hp",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "pavilion 15-p",
        "15-n",
        "15-e series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-003",
      "hp",
      "pavilion",
      "15",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "pavilion 15-p",
      "15-n",
      "15-e series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-004",
    "sku": "KC-LKB-004",
    "name": "HP Pavilion 15-au Laptop Keyboard (Backlit)",
    "slug": "hp-pavilion-15-au-laptop-keyboard-backlit-kc-lkb-004",
    "categoryId": "laptop-keyboard",
    "brandId": "hp",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": true
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "pavilion 15-au",
        "15-cc",
        "15-cs"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 130000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-004",
      "hp",
      "pavilion",
      "15",
      "au",
      "laptop",
      "keyboard",
      "backlit",
      "laptop-keyboard",
      "pavilion 15-au",
      "15-cc",
      "15-cs"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-005",
    "sku": "KC-LKB-005",
    "name": "HP ProBook 450 G3 Laptop Keyboard",
    "slug": "hp-probook-450-g3-laptop-keyboard-kc-lkb-005",
    "categoryId": "laptop-keyboard",
    "brandId": "hp",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "hp"
      ],
      "compatibleModels": [
        "probook 450 g3",
        "450 g4",
        "455 g3",
        "470 g3"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-005",
      "hp",
      "probook",
      "450",
      "g3",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "probook 450 g3",
      "450 g4",
      "455 g3",
      "470 g3"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-006",
    "sku": "KC-LKB-006",
    "name": "Dell Inspiron 15 3521 Laptop Keyboard",
    "slug": "dell-inspiron-15-3521-laptop-keyboard-kc-lkb-006",
    "categoryId": "laptop-keyboard",
    "brandId": "dell",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 15 3521",
        "3537",
        "3542",
        "3543",
        "5521",
        "5537"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 85000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-006",
      "dell",
      "inspiron",
      "15",
      "3521",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "inspiron 15 3521",
      "3537",
      "3542",
      "3543",
      "5521",
      "5537"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-007",
    "sku": "KC-LKB-007",
    "name": "Dell Inspiron 15 5558 Laptop Keyboard",
    "slug": "dell-inspiron-15-5558-laptop-keyboard-kc-lkb-007",
    "categoryId": "laptop-keyboard",
    "brandId": "dell",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "inspiron 15 5558",
        "5559",
        "5555",
        "5565"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 90000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-007",
      "dell",
      "inspiron",
      "15",
      "5558",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "inspiron 15 5558",
      "5559",
      "5555",
      "5565"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-008",
    "sku": "KC-LKB-008",
    "name": "Dell Latitude E5440 Laptop Keyboard",
    "slug": "dell-latitude-e5440-laptop-keyboard-kc-lkb-008",
    "categoryId": "laptop-keyboard",
    "brandId": "dell",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "latitude e5440",
        "e5450",
        "e5540"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-008",
      "dell",
      "latitude",
      "e5440",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "latitude e5440",
      "e5450",
      "e5540"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-009",
    "sku": "KC-LKB-009",
    "name": "Dell Latitude 3480 Laptop Keyboard",
    "slug": "dell-latitude-3480-laptop-keyboard-kc-lkb-009",
    "categoryId": "laptop-keyboard",
    "brandId": "dell",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "dell"
      ],
      "compatibleModels": [
        "latitude 3480",
        "3490",
        "3580",
        "3590"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-009",
      "dell",
      "latitude",
      "3480",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "latitude 3480",
      "3490",
      "3580",
      "3590"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-010",
    "sku": "KC-LKB-010",
    "name": "Lenovo G50-30 Laptop Keyboard",
    "slug": "lenovo-g50-30-laptop-keyboard-kc-lkb-010",
    "categoryId": "laptop-keyboard",
    "brandId": "lenovo",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "g50-30",
        "g50-45",
        "g50-70",
        "g50-80",
        "z50-70"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-010",
      "lenovo",
      "g50",
      "30",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "g50-30",
      "g50-45",
      "g50-70",
      "g50-80",
      "z50-70"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-011",
    "sku": "KC-LKB-011",
    "name": "Lenovo IdeaPad 110-15 Laptop Keyboard",
    "slug": "lenovo-ideapad-110-15-laptop-keyboard-kc-lkb-011",
    "categoryId": "laptop-keyboard",
    "brandId": "lenovo",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "ideapad 110-15",
        "310-15",
        "320-15",
        "330-15"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 85000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-011",
      "lenovo",
      "ideapad",
      "110",
      "15",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "ideapad 110-15",
      "310-15",
      "320-15",
      "330-15"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-012",
    "sku": "KC-LKB-012",
    "name": "Lenovo ThinkPad T440 Laptop Keyboard (Backlit)",
    "slug": "lenovo-thinkpad-t440-laptop-keyboard-backlit-kc-lkb-012",
    "categoryId": "laptop-keyboard",
    "brandId": "lenovo",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": true
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "lenovo"
      ],
      "compatibleModels": [
        "thinkpad t440",
        "t450",
        "t460",
        "t470"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-012",
      "lenovo",
      "thinkpad",
      "t440",
      "laptop",
      "keyboard",
      "backlit",
      "laptop-keyboard",
      "thinkpad t440",
      "t450",
      "t460",
      "t470"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-013",
    "sku": "KC-LKB-013",
    "name": "Acer Aspire E1-571 Laptop Keyboard",
    "slug": "acer-aspire-e1-571-laptop-keyboard-kc-lkb-013",
    "categoryId": "laptop-keyboard",
    "brandId": "acer",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire e1-571",
        "e1-531",
        "e1-521",
        "e1-431"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-013",
      "acer",
      "aspire",
      "e1",
      "571",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "aspire e1-571",
      "e1-531",
      "e1-521",
      "e1-431"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-014",
    "sku": "KC-LKB-014",
    "name": "Acer Aspire 5 A515 Laptop Keyboard",
    "slug": "acer-aspire-5-a515-laptop-keyboard-kc-lkb-014",
    "categoryId": "laptop-keyboard",
    "brandId": "acer",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "acer"
      ],
      "compatibleModels": [
        "aspire 5 a515",
        "a315",
        "es1-533"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 95000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-014",
      "acer",
      "aspire",
      "a515",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "aspire 5 a515",
      "a315",
      "es1-533"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-015",
    "sku": "KC-LKB-015",
    "name": "Asus X540 Laptop Keyboard",
    "slug": "asus-x540-laptop-keyboard-kc-lkb-015",
    "categoryId": "laptop-keyboard",
    "brandId": "asus",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "x540",
        "x541",
        "x543",
        "a540"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 85000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-015",
      "asus",
      "x540",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "x541",
      "x543",
      "a540"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-016",
    "sku": "KC-LKB-016",
    "name": "Asus X550 Laptop Keyboard",
    "slug": "asus-x550-laptop-keyboard-kc-lkb-016",
    "categoryId": "laptop-keyboard",
    "brandId": "asus",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "x550",
        "k550",
        "f550",
        "x552"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-016",
      "asus",
      "x550",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "k550",
      "f550",
      "x552"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-017",
    "sku": "KC-LKB-017",
    "name": "Asus VivoBook 15 X512 Laptop Keyboard (Backlit)",
    "slug": "asus-vivobook-15-x512-laptop-keyboard-backlit-kc-lkb-017",
    "categoryId": "laptop-keyboard",
    "brandId": "asus",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": true
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "asus"
      ],
      "compatibleModels": [
        "vivobook 15 x512",
        "x509",
        "x515"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 110000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-017",
      "asus",
      "vivobook",
      "15",
      "x512",
      "laptop",
      "keyboard",
      "backlit",
      "laptop-keyboard",
      "vivobook 15 x512",
      "x509",
      "x515"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-018",
    "sku": "KC-LKB-018",
    "name": "Samsung NP300E5C Laptop Keyboard",
    "slug": "samsung-np300e5c-laptop-keyboard-kc-lkb-018",
    "categoryId": "laptop-keyboard",
    "brandId": "samsung",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "samsung"
      ],
      "compatibleModels": [
        "np300e5c",
        "np300e5a",
        "np350v5c",
        "rv510 series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 90000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-018",
      "samsung",
      "np300e5c",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "np300e5a",
      "np350v5c",
      "rv510 series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-019",
    "sku": "KC-LKB-019",
    "name": "Sony Vaio SVF15 Laptop Keyboard",
    "slug": "sony-vaio-svf15-laptop-keyboard-kc-lkb-019",
    "categoryId": "laptop-keyboard",
    "brandId": "sony",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "sony"
      ],
      "compatibleModels": [
        "vaio svf15",
        "sve15",
        "vpceh series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 100000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-019",
      "sony",
      "vaio",
      "svf15",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "vaio svf15",
      "sve15",
      "vpceh series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-lkb-020",
    "sku": "KC-LKB-020",
    "name": "Toshiba Satellite C50 Laptop Keyboard",
    "slug": "toshiba-satellite-c50-laptop-keyboard-kc-lkb-020",
    "categoryId": "laptop-keyboard",
    "brandId": "toshiba",
    "description": "Check key layout & connector on old keyboard",
    "specs": {
      "keyboardLayout": "US",
      "backlight": false
    },
    "compat": {
      "deviceType": "laptop",
      "compatibleBrands": [
        "toshiba"
      ],
      "compatibleModels": [
        "satellite c50",
        "c55",
        "c55d",
        "l50 series"
      ]
    },
    "condition": "compatible",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 85000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-lkb-020",
      "toshiba",
      "satellite",
      "c50",
      "laptop",
      "keyboard",
      "laptop-keyboard",
      "satellite c50",
      "c55",
      "c55d",
      "l50 series"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-001",
    "sku": "KC-KBD-001",
    "name": "Logitech K120 Wired USB Keyboard",
    "slug": "logitech-k120-wired-usb-keyboard-kc-kbd-001",
    "categoryId": "keyboard",
    "brandId": "logitech",
    "description": "Logitech Logitech K120 Wired USB Keyboard",
    "specs": {
      "modelOrPartNo": "K120",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 59000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-001",
      "logitech",
      "k120",
      "wired",
      "usb",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-002",
    "sku": "KC-KBD-002",
    "name": "Dell KB216 Wired USB Keyboard",
    "slug": "dell-kb216-wired-usb-keyboard-kc-kbd-002",
    "categoryId": "keyboard",
    "brandId": "dell",
    "description": "Dell Dell KB216 Wired USB Keyboard",
    "specs": {
      "modelOrPartNo": "KB216",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 78000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-002",
      "dell",
      "kb216",
      "wired",
      "usb",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-003",
    "sku": "KC-KBD-003",
    "name": "HP 100 Wired USB Keyboard",
    "slug": "hp-100-wired-usb-keyboard-kc-kbd-003",
    "categoryId": "keyboard",
    "brandId": "hp",
    "description": "HP HP 100 Wired USB Keyboard",
    "specs": {
      "modelOrPartNo": 100,
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 55000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-003",
      "hp",
      "100",
      "wired",
      "usb",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-004",
    "sku": "KC-KBD-004",
    "name": "Lenovo Essential Wired Wired USB Keyboard",
    "slug": "lenovo-essential-wired-wired-usb-keyboard-kc-kbd-004",
    "categoryId": "keyboard",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo Essential Wired Wired USB Keyboard",
    "specs": {
      "modelOrPartNo": "Essential Wired",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 70000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-004",
      "lenovo",
      "essential",
      "wired",
      "usb",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-005",
    "sku": "KC-KBD-005",
    "name": "Zebronics Companion 107 Wired USB Keyboard",
    "slug": "zebronics-companion-107-wired-usb-keyboard-kc-kbd-005",
    "categoryId": "keyboard",
    "brandId": "zebronics",
    "description": "Zebronics Zebronics Companion 107 Wired USB Keyboard",
    "specs": {
      "modelOrPartNo": "Companion 107",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 35000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-005",
      "zebronics",
      "companion",
      "107",
      "wired",
      "usb",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-006",
    "sku": "KC-KBD-006",
    "name": "Logitech K270 Wireless 2.4GHz Keyboard",
    "slug": "logitech-k270-wireless-2-4ghz-keyboard-kc-kbd-006",
    "categoryId": "keyboard",
    "brandId": "logitech",
    "description": "Logitech Logitech K270 Wireless 2.4GHz Keyboard",
    "specs": {
      "modelOrPartNo": "K270",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wireless 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 145000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-006",
      "logitech",
      "k270",
      "wireless",
      "2.4ghz",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-007",
    "sku": "KC-KBD-007",
    "name": "Logitech K380 Bluetooth Keyboard",
    "slug": "logitech-k380-bluetooth-keyboard-kc-kbd-007",
    "categoryId": "keyboard",
    "brandId": "logitech",
    "description": "Multi-device",
    "specs": {
      "modelOrPartNo": "K380",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Bluetooth"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 290000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-007",
      "logitech",
      "k380",
      "bluetooth",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-008",
    "sku": "KC-KBD-008",
    "name": "Logitech MK215 Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "slug": "logitech-mk215-wireless-2-4ghz-combo-keyboard-mouse-keyboard-kc-kbd-008",
    "categoryId": "keyboard",
    "brandId": "logitech",
    "description": "Logitech Logitech MK215 Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "specs": {
      "modelOrPartNo": "MK215",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wireless 2.4GHz Combo (Keyboard+Mouse)"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 145000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-008",
      "logitech",
      "mk215",
      "wireless",
      "2.4ghz",
      "combo",
      "keyboard+mouse",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-009",
    "sku": "KC-KBD-009",
    "name": "Logitech MK270 Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "slug": "logitech-mk270-wireless-2-4ghz-combo-keyboard-mouse-keyboard-kc-kbd-009",
    "categoryId": "keyboard",
    "brandId": "logitech",
    "description": "Logitech Logitech MK270 Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "specs": {
      "modelOrPartNo": "MK270",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wireless 2.4GHz Combo (Keyboard+Mouse)"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 170000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-009",
      "logitech",
      "mk270",
      "wireless",
      "2.4ghz",
      "combo",
      "keyboard+mouse",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-010",
    "sku": "KC-KBD-010",
    "name": "HP 230 Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "slug": "hp-230-wireless-2-4ghz-combo-keyboard-mouse-keyboard-kc-kbd-010",
    "categoryId": "keyboard",
    "brandId": "hp",
    "description": "HP HP 230 Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "specs": {
      "modelOrPartNo": 230,
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wireless 2.4GHz Combo (Keyboard+Mouse)"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 170000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-010",
      "hp",
      "230",
      "wireless",
      "2.4ghz",
      "combo",
      "keyboard+mouse",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-011",
    "sku": "KC-KBD-011",
    "name": "Dell KM3322W Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "slug": "dell-km3322w-wireless-2-4ghz-combo-keyboard-mouse-keyboard-kc-kbd-011",
    "categoryId": "keyboard",
    "brandId": "dell",
    "description": "Dell Dell KM3322W Wireless 2.4GHz Combo (Keyboard+Mouse) Keyboard",
    "specs": {
      "modelOrPartNo": "KM3322W",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wireless 2.4GHz Combo (Keyboard+Mouse)"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 230000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-011",
      "dell",
      "km3322w",
      "wireless",
      "2.4ghz",
      "combo",
      "keyboard+mouse",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-012",
    "sku": "KC-KBD-012",
    "name": "Zebronics KM2100 Wired USB Combo (Keyboard+Mouse) Keyboard",
    "slug": "zebronics-km2100-wired-usb-combo-keyboard-mouse-keyboard-kc-kbd-012",
    "categoryId": "keyboard",
    "brandId": "zebronics",
    "description": "Zebronics Zebronics KM2100 Wired USB Combo (Keyboard+Mouse) Keyboard",
    "specs": {
      "modelOrPartNo": "KM2100",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB Combo (Keyboard+Mouse)"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 55000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-012",
      "zebronics",
      "km2100",
      "wired",
      "usb",
      "combo",
      "keyboard+mouse",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-kbd-013",
    "sku": "KC-KBD-013",
    "name": "Redragon K552 Kumara Wired USB Mechanical Keyboard",
    "slug": "redragon-k552-kumara-wired-usb-mechanical-keyboard-kc-kbd-013",
    "categoryId": "keyboard",
    "brandId": "redragon",
    "description": "Gaming mechanical",
    "specs": {
      "modelOrPartNo": "K552 Kumara",
      "keyboardLayout": "US",
      "backlight": false,
      "connection": "Wired USB Mechanical"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 260000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-kbd-013",
      "redragon",
      "k552",
      "kumara",
      "wired",
      "usb",
      "mechanical",
      "keyboard",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-001",
    "sku": "KC-MOU-001",
    "name": "Logitech B100 Wired USB Mouse",
    "slug": "logitech-b100-wired-usb-mouse-kc-mou-001",
    "categoryId": "usb-mouse",
    "brandId": "logitech",
    "description": "Logitech Logitech B100 Wired USB Mouse",
    "specs": {
      "modelOrPartNo": "B100",
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 39000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-001",
      "logitech",
      "b100",
      "wired",
      "usb",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-002",
    "sku": "KC-MOU-002",
    "name": "Dell MS116 Wired USB Mouse",
    "slug": "dell-ms116-wired-usb-mouse-kc-mou-002",
    "categoryId": "usb-mouse",
    "brandId": "dell",
    "description": "Dell Dell MS116 Wired USB Mouse",
    "specs": {
      "modelOrPartNo": "MS116",
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 44000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-002",
      "dell",
      "ms116",
      "wired",
      "usb",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-003",
    "sku": "KC-MOU-003",
    "name": "HP X1000 Wired USB Mouse",
    "slug": "hp-x1000-wired-usb-mouse-kc-mou-003",
    "categoryId": "usb-mouse",
    "brandId": "hp",
    "description": "HP HP X1000 Wired USB Mouse",
    "specs": {
      "modelOrPartNo": "X1000",
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 42000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-003",
      "hp",
      "x1000",
      "wired",
      "usb",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-004",
    "sku": "KC-MOU-004",
    "name": "Lenovo 300 Wired USB Mouse",
    "slug": "lenovo-300-wired-usb-mouse-kc-mou-004",
    "categoryId": "usb-mouse",
    "brandId": "lenovo",
    "description": "Lenovo Lenovo 300 Wired USB Mouse",
    "specs": {
      "modelOrPartNo": 300,
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 45000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-004",
      "lenovo",
      "300",
      "wired",
      "usb",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-005",
    "sku": "KC-MOU-005",
    "name": "Zebronics Comfort Wired USB Mouse",
    "slug": "zebronics-comfort-wired-usb-mouse-kc-mou-005",
    "categoryId": "usb-mouse",
    "brandId": "zebronics",
    "description": "Zebronics Zebronics Comfort Wired USB Mouse",
    "specs": {
      "modelOrPartNo": "Comfort",
      "connection": "Wired USB"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 25000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-005",
      "zebronics",
      "comfort",
      "wired",
      "usb",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-006",
    "sku": "KC-MOU-006",
    "name": "Logitech M185 Wireless 2.4GHz Mouse",
    "slug": "logitech-m185-wireless-2-4ghz-mouse-kc-mou-006",
    "categoryId": "usb-mouse",
    "brandId": "logitech",
    "description": "Logitech Logitech M185 Wireless 2.4GHz Mouse",
    "specs": {
      "modelOrPartNo": "M185",
      "connection": "Wireless 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 73000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-006",
      "logitech",
      "m185",
      "wireless",
      "2.4ghz",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-007",
    "sku": "KC-MOU-007",
    "name": "Logitech M235 Wireless 2.4GHz Mouse",
    "slug": "logitech-m235-wireless-2-4ghz-mouse-kc-mou-007",
    "categoryId": "usb-mouse",
    "brandId": "logitech",
    "description": "Logitech Logitech M235 Wireless 2.4GHz Mouse",
    "specs": {
      "modelOrPartNo": "M235",
      "connection": "Wireless 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 90000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-007",
      "logitech",
      "m235",
      "wireless",
      "2.4ghz",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-008",
    "sku": "KC-MOU-008",
    "name": "Logitech M331 Silent Wireless 2.4GHz Mouse",
    "slug": "logitech-m331-silent-wireless-2-4ghz-mouse-kc-mou-008",
    "categoryId": "usb-mouse",
    "brandId": "logitech",
    "description": "Logitech Logitech M331 Silent Wireless 2.4GHz Mouse",
    "specs": {
      "modelOrPartNo": "M331 Silent",
      "connection": "Wireless 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 115000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-008",
      "logitech",
      "m331",
      "silent",
      "wireless",
      "2.4ghz",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-009",
    "sku": "KC-MOU-009",
    "name": "HP S1000 Plus Wireless 2.4GHz Mouse",
    "slug": "hp-s1000-plus-wireless-2-4ghz-mouse-kc-mou-009",
    "categoryId": "usb-mouse",
    "brandId": "hp",
    "description": "HP HP S1000 Plus Wireless 2.4GHz Mouse",
    "specs": {
      "modelOrPartNo": "S1000 Plus",
      "connection": "Wireless 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 70000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-009",
      "hp",
      "s1000",
      "plus",
      "wireless",
      "2.4ghz",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-010",
    "sku": "KC-MOU-010",
    "name": "Dell WM126 Wireless 2.4GHz Mouse",
    "slug": "dell-wm126-wireless-2-4ghz-mouse-kc-mou-010",
    "categoryId": "usb-mouse",
    "brandId": "dell",
    "description": "Dell Dell WM126 Wireless 2.4GHz Mouse",
    "specs": {
      "modelOrPartNo": "WM126",
      "connection": "Wireless 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-010",
      "dell",
      "wm126",
      "wireless",
      "2.4ghz",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-011",
    "sku": "KC-MOU-011",
    "name": "Logitech Pebble M350 Bluetooth + 2.4GHz Mouse",
    "slug": "logitech-pebble-m350-bluetooth-2-4ghz-mouse-kc-mou-011",
    "categoryId": "usb-mouse",
    "brandId": "logitech",
    "description": "Logitech Logitech Pebble M350 Bluetooth + 2.4GHz Mouse",
    "specs": {
      "modelOrPartNo": "Pebble M350",
      "connection": "Bluetooth + 2.4GHz"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 170000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-011",
      "logitech",
      "pebble",
      "m350",
      "bluetooth",
      "2.4ghz",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-012",
    "sku": "KC-MOU-012",
    "name": "Logitech G102 Wired USB Gaming Mouse",
    "slug": "logitech-g102-wired-usb-gaming-mouse-kc-mou-012",
    "categoryId": "usb-mouse",
    "brandId": "logitech",
    "description": "RGB gaming mouse",
    "specs": {
      "modelOrPartNo": "G102",
      "connection": "Wired USB Gaming"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 140000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-012",
      "logitech",
      "g102",
      "wired",
      "usb",
      "gaming",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mou-013",
    "sku": "KC-MOU-013",
    "name": "Redragon M601 Centrophorus Wired USB Gaming Mouse",
    "slug": "redragon-m601-centrophorus-wired-usb-gaming-mouse-kc-mou-013",
    "categoryId": "usb-mouse",
    "brandId": "redragon",
    "description": "Redragon Redragon M601 Centrophorus Wired USB Gaming Mouse",
    "specs": {
      "modelOrPartNo": "M601 Centrophorus",
      "connection": "Wired USB Gaming"
    },
    "compat": {
      "deviceType": "both",
      "compatibleBrands": [
        "any pc/laptop with usb"
      ],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 100000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847160"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mou-013",
      "redragon",
      "m601",
      "centrophorus",
      "wired",
      "usb",
      "gaming",
      "mouse",
      "usb-mouse",
      "any pc/laptop with usb"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-001",
    "sku": "KC-CPU-001",
    "name": "Intel Core i3-12100F (12th Gen, LGA1700, 4C/8T)",
    "slug": "intel-core-i3-12100f-12th-gen-lga1700-4c-8t-kc-cpu-001",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i3-12100F (12th Gen, LGA1700, 4C/8T)",
    "specs": {
      "modelOrPartNo": "i3-12100F",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "cores": 4,
      "threads": 8,
      "baseClockGhz": 3.3,
      "boostClockGhz": 4.3,
      "tdpW": 58,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 820000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-001",
      "intel",
      "core",
      "i3",
      "12100f",
      "12th",
      "gen",
      "lga1700",
      "4c",
      "8t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-002",
    "sku": "KC-CPU-002",
    "name": "Intel Core i3-12100 (12th Gen, LGA1700, 4C/8T)",
    "slug": "intel-core-i3-12100-12th-gen-lga1700-4c-8t-kc-cpu-002",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i3-12100 (12th Gen, LGA1700, 4C/8T)",
    "specs": {
      "modelOrPartNo": "i3-12100",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "cores": 4,
      "threads": 8,
      "baseClockGhz": 3.3,
      "boostClockGhz": 4.3,
      "tdpW": 60,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 980000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-002",
      "intel",
      "core",
      "i3",
      "12100",
      "12th",
      "gen",
      "lga1700",
      "4c",
      "8t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-003",
    "sku": "KC-CPU-003",
    "name": "Intel Core i3-14100F (14th Gen, LGA1700, 4C/8T)",
    "slug": "intel-core-i3-14100f-14th-gen-lga1700-4c-8t-kc-cpu-003",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i3-14100F (14th Gen, LGA1700, 4C/8T)",
    "specs": {
      "modelOrPartNo": "i3-14100F",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "cores": 4,
      "threads": 8,
      "baseClockGhz": 3.5,
      "boostClockGhz": 4.7,
      "tdpW": 58,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1050000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-003",
      "intel",
      "core",
      "i3",
      "14100f",
      "14th",
      "gen",
      "lga1700",
      "4c",
      "8t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-004",
    "sku": "KC-CPU-004",
    "name": "Intel Core i5-12400F (12th Gen, LGA1700, 6C/12T)",
    "slug": "intel-core-i5-12400f-12th-gen-lga1700-6c-12t-kc-cpu-004",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Street range roughly 10.5k-12k",
    "specs": {
      "modelOrPartNo": "i5-12400F",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 2.5,
      "boostClockGhz": 4.4,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1120000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-004",
      "intel",
      "core",
      "i5",
      "12400f",
      "12th",
      "gen",
      "lga1700",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-005",
    "sku": "KC-CPU-005",
    "name": "Intel Core i5-12400 (12th Gen, LGA1700, 6C/12T)",
    "slug": "intel-core-i5-12400-12th-gen-lga1700-6c-12t-kc-cpu-005",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i5-12400 (12th Gen, LGA1700, 6C/12T)",
    "specs": {
      "modelOrPartNo": "i5-12400",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 2.5,
      "boostClockGhz": 4.4,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "12th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1350000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-005",
      "intel",
      "core",
      "i5",
      "12400",
      "12th",
      "gen",
      "lga1700",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-006",
    "sku": "KC-CPU-006",
    "name": "Intel Core i5-13400F (13th Gen, LGA1700, 10C/16T)",
    "slug": "intel-core-i5-13400f-13th-gen-lga1700-10c-16t-kc-cpu-006",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i5-13400F (13th Gen, LGA1700, 10C/16T)",
    "specs": {
      "modelOrPartNo": "i5-13400F",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "13th Gen",
      "cores": 10,
      "threads": 16,
      "baseClockGhz": 2.5,
      "boostClockGhz": 4.6,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "13th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1720000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-006",
      "intel",
      "core",
      "i5",
      "13400f",
      "13th",
      "gen",
      "lga1700",
      "10c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-007",
    "sku": "KC-CPU-007",
    "name": "Intel Core i5-14400F (14th Gen, LGA1700, 10C/16T)",
    "slug": "intel-core-i5-14400f-14th-gen-lga1700-10c-16t-kc-cpu-007",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i5-14400F (14th Gen, LGA1700, 10C/16T)",
    "specs": {
      "modelOrPartNo": "i5-14400F",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "cores": 10,
      "threads": 16,
      "baseClockGhz": 2.5,
      "boostClockGhz": 4.7,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1850000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-007",
      "intel",
      "core",
      "i5",
      "14400f",
      "14th",
      "gen",
      "lga1700",
      "10c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-008",
    "sku": "KC-CPU-008",
    "name": "Intel Core i5-14400 (14th Gen, LGA1700, 10C/16T)",
    "slug": "intel-core-i5-14400-14th-gen-lga1700-10c-16t-kc-cpu-008",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i5-14400 (14th Gen, LGA1700, 10C/16T)",
    "specs": {
      "modelOrPartNo": "i5-14400",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "cores": 10,
      "threads": 16,
      "baseClockGhz": 2.5,
      "boostClockGhz": 4.7,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2050000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-008",
      "intel",
      "core",
      "i5",
      "14400",
      "14th",
      "gen",
      "lga1700",
      "10c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-009",
    "sku": "KC-CPU-009",
    "name": "Intel Core i7-14700F (14th Gen, LGA1700, 20C/28T)",
    "slug": "intel-core-i7-14700f-14th-gen-lga1700-20c-28t-kc-cpu-009",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core i7-14700F (14th Gen, LGA1700, 20C/28T)",
    "specs": {
      "modelOrPartNo": "i7-14700F",
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "cores": 20,
      "threads": 28,
      "baseClockGhz": 2.1,
      "boostClockGhz": 5.4,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1700",
      "cpuFamily": "Core",
      "cpuGeneration": "14th Gen",
      "memorySupport": [
        "DDR4",
        "DDR5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3450000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-009",
      "intel",
      "core",
      "i7",
      "14700f",
      "14th",
      "gen",
      "lga1700",
      "20c",
      "28t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-010",
    "sku": "KC-CPU-010",
    "name": "Intel Core Ultra 5 225F (Core Ultra 200S, LGA1851, 10C/10T)",
    "slug": "intel-core-ultra-5-225f-core-ultra-200s-lga1851-10c-10t-kc-cpu-010",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core Ultra 5 225F (Core Ultra 200S, LGA1851, 10C/10T)",
    "specs": {
      "modelOrPartNo": "Ultra 5 225F",
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "cores": 10,
      "threads": 10,
      "baseClockGhz": 3.3,
      "boostClockGhz": 4.9,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1480000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-010",
      "intel",
      "core",
      "ultra",
      "225f",
      "200s",
      "lga1851",
      "10c",
      "10t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-011",
    "sku": "KC-CPU-011",
    "name": "Intel Core Ultra 5 225 (Core Ultra 200S, LGA1851, 10C/10T)",
    "slug": "intel-core-ultra-5-225-core-ultra-200s-lga1851-10c-10t-kc-cpu-011",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Intel Intel Core Ultra 5 225 (Core Ultra 200S, LGA1851, 10C/10T)",
    "specs": {
      "modelOrPartNo": "Ultra 5 225",
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "cores": 10,
      "threads": 10,
      "baseClockGhz": 3.3,
      "boostClockGhz": 4.9,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1790000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-011",
      "intel",
      "core",
      "ultra",
      "225",
      "200s",
      "lga1851",
      "10c",
      "10t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-012",
    "sku": "KC-CPU-012",
    "name": "Intel Core Ultra 5 245K (Core Ultra 200S, LGA1851, 14C/14T)",
    "slug": "intel-core-ultra-5-245k-core-ultra-200s-lga1851-14c-14t-kc-cpu-012",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Unlocked; needs separate cooler",
    "specs": {
      "modelOrPartNo": "Ultra 5 245K",
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "cores": 14,
      "threads": 14,
      "baseClockGhz": 4.2,
      "boostClockGhz": 5.2,
      "tdpW": 125,
      "integratedGraphics": true,
      "coolerIncluded": "No (cooler required)",
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2450000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-012",
      "intel",
      "core",
      "ultra",
      "245k",
      "200s",
      "lga1851",
      "14c",
      "14t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-013",
    "sku": "KC-CPU-013",
    "name": "Intel Core Ultra 7 265K (Core Ultra 200S, LGA1851, 20C/20T)",
    "slug": "intel-core-ultra-7-265k-core-ultra-200s-lga1851-20c-20t-kc-cpu-013",
    "categoryId": "processor",
    "brandId": "intel",
    "description": "Unlocked; needs separate cooler",
    "specs": {
      "modelOrPartNo": "Ultra 7 265K",
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "cores": 20,
      "threads": 20,
      "baseClockGhz": 3.9,
      "boostClockGhz": 5.5,
      "tdpW": 125,
      "integratedGraphics": true,
      "coolerIncluded": "No (cooler required)",
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "LGA1851",
      "cpuFamily": "Core",
      "cpuGeneration": "Core Ultra 200S",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-013",
      "intel",
      "core",
      "ultra",
      "265k",
      "200s",
      "lga1851",
      "20c",
      "20t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-014",
    "sku": "KC-CPU-014",
    "name": "AMD Ryzen 3 4100 (Ryzen 4000, AM4, 4C/8T)",
    "slug": "amd-ryzen-3-4100-ryzen-4000-am4-4c-8t-kc-cpu-014",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 3 4100 (Ryzen 4000, AM4, 4C/8T)",
    "specs": {
      "modelOrPartNo": "3 4100",
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 4000",
      "cores": 4,
      "threads": 8,
      "baseClockGhz": 3.8,
      "boostClockGhz": 4,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": "DDR4"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 4000",
      "memorySupport": "DDR4"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 680000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-014",
      "amd",
      "ryzen",
      "4100",
      "4000",
      "am4",
      "4c",
      "8t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-015",
    "sku": "KC-CPU-015",
    "name": "AMD Ryzen 5 4500 (Ryzen 4000, AM4, 6C/12T)",
    "slug": "amd-ryzen-5-4500-ryzen-4000-am4-6c-12t-kc-cpu-015",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 5 4500 (Ryzen 4000, AM4, 6C/12T)",
    "specs": {
      "modelOrPartNo": "5 4500",
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 4000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.6,
      "boostClockGhz": 4.1,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": "DDR4"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 4000",
      "memorySupport": "DDR4"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 790000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-015",
      "amd",
      "ryzen",
      "4500",
      "4000",
      "am4",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-016",
    "sku": "KC-CPU-016",
    "name": "AMD Ryzen 5 5500 (Ryzen 5000, AM4, 6C/12T)",
    "slug": "amd-ryzen-5-5500-ryzen-5000-am4-6c-12t-kc-cpu-016",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 5 5500 (Ryzen 5000, AM4, 6C/12T)",
    "specs": {
      "modelOrPartNo": "5 5500",
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.6,
      "boostClockGhz": 4.2,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": "DDR4"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000",
      "memorySupport": "DDR4"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 980000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-016",
      "amd",
      "ryzen",
      "5500",
      "5000",
      "am4",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-017",
    "sku": "KC-CPU-017",
    "name": "AMD Ryzen 5 5600 (Ryzen 5000, AM4, 6C/12T)",
    "slug": "amd-ryzen-5-5600-ryzen-5000-am4-6c-12t-kc-cpu-017",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "Street range roughly 14k-16k",
    "specs": {
      "modelOrPartNo": "5 5600",
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.5,
      "boostClockGhz": 4.4,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": "DDR4"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000",
      "memorySupport": "DDR4"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1480000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-017",
      "amd",
      "ryzen",
      "5600",
      "5000",
      "am4",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-018",
    "sku": "KC-CPU-018",
    "name": "AMD Ryzen 5 5600G (Ryzen 5000G, AM4, 6C/12T)",
    "slug": "amd-ryzen-5-5600g-ryzen-5000g-am4-6c-12t-kc-cpu-018",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 5 5600G (Ryzen 5000G, AM4, 6C/12T)",
    "specs": {
      "modelOrPartNo": "5 5600G",
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000G",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.9,
      "boostClockGhz": 4.4,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": "DDR4"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000G",
      "memorySupport": "DDR4"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1490000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-018",
      "amd",
      "ryzen",
      "5600g",
      "5000g",
      "am4",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-019",
    "sku": "KC-CPU-019",
    "name": "AMD Ryzen 7 5700X (Ryzen 5000, AM4, 8C/16T)",
    "slug": "amd-ryzen-7-5700x-ryzen-5000-am4-8c-16t-kc-cpu-019",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 7 5700X (Ryzen 5000, AM4, 8C/16T)",
    "specs": {
      "modelOrPartNo": "7 5700X",
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000",
      "cores": 8,
      "threads": 16,
      "baseClockGhz": 3.4,
      "boostClockGhz": 4.6,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": "No (cooler required)",
      "memorySupport": "DDR4"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM4",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 5000",
      "memorySupport": "DDR4"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-019",
      "amd",
      "ryzen",
      "5700x",
      "5000",
      "am4",
      "8c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-020",
    "sku": "KC-CPU-020",
    "name": "AMD Ryzen 5 7500F (Ryzen 7000, AM5, 6C/12T)",
    "slug": "amd-ryzen-5-7500f-ryzen-7000-am5-6c-12t-kc-cpu-020",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "Confirm box vs tray stock",
    "specs": {
      "modelOrPartNo": "5 7500F",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.7,
      "boostClockGhz": 5,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": "Varies (box/tray)",
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1580000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-020",
      "amd",
      "ryzen",
      "7500f",
      "7000",
      "am5",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-021",
    "sku": "KC-CPU-021",
    "name": "AMD Ryzen 5 7600 (Ryzen 7000, AM5, 6C/12T)",
    "slug": "amd-ryzen-5-7600-ryzen-7000-am5-6c-12t-kc-cpu-021",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 5 7600 (Ryzen 7000, AM5, 6C/12T)",
    "specs": {
      "modelOrPartNo": "5 7600",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.8,
      "boostClockGhz": 5.1,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1850000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-021",
      "amd",
      "ryzen",
      "7600",
      "7000",
      "am5",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-022",
    "sku": "KC-CPU-022",
    "name": "AMD Ryzen 5 8400F (Ryzen 8000, AM5, 6C/12T)",
    "slug": "amd-ryzen-5-8400f-ryzen-8000-am5-6c-12t-kc-cpu-022",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 5 8400F (Ryzen 8000, AM5, 6C/12T)",
    "specs": {
      "modelOrPartNo": "5 8400F",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 8000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 4.2,
      "boostClockGhz": 4.7,
      "tdpW": 65,
      "integratedGraphics": false,
      "coolerIncluded": true,
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 8000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1680000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-022",
      "amd",
      "ryzen",
      "8400f",
      "8000",
      "am5",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-023",
    "sku": "KC-CPU-023",
    "name": "AMD Ryzen 5 9600X (Ryzen 9000, AM5, 6C/12T)",
    "slug": "amd-ryzen-5-9600x-ryzen-9000-am5-6c-12t-kc-cpu-023",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 5 9600X (Ryzen 9000, AM5, 6C/12T)",
    "specs": {
      "modelOrPartNo": "5 9600X",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 9000",
      "cores": 6,
      "threads": 12,
      "baseClockGhz": 3.9,
      "boostClockGhz": 5.4,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": "No (cooler required)",
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 9000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2250000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-023",
      "amd",
      "ryzen",
      "9600x",
      "9000",
      "am5",
      "6c",
      "12t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-024",
    "sku": "KC-CPU-024",
    "name": "AMD Ryzen 7 7700 (Ryzen 7000, AM5, 8C/16T)",
    "slug": "amd-ryzen-7-7700-ryzen-7000-am5-8c-16t-kc-cpu-024",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 7 7700 (Ryzen 7000, AM5, 8C/16T)",
    "specs": {
      "modelOrPartNo": "7 7700",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "cores": 8,
      "threads": 16,
      "baseClockGhz": 3.8,
      "boostClockGhz": 5.3,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": true,
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2650000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-024",
      "amd",
      "ryzen",
      "7700",
      "7000",
      "am5",
      "8c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-025",
    "sku": "KC-CPU-025",
    "name": "AMD Ryzen 7 9700X (Ryzen 9000, AM5, 8C/16T)",
    "slug": "amd-ryzen-7-9700x-ryzen-9000-am5-8c-16t-kc-cpu-025",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 7 9700X (Ryzen 9000, AM5, 8C/16T)",
    "specs": {
      "modelOrPartNo": "7 9700X",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 9000",
      "cores": 8,
      "threads": 16,
      "baseClockGhz": 3.8,
      "boostClockGhz": 5.5,
      "tdpW": 65,
      "integratedGraphics": true,
      "coolerIncluded": "No (cooler required)",
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 9000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3100000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-025",
      "amd",
      "ryzen",
      "9700x",
      "9000",
      "am5",
      "8c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cpu-026",
    "sku": "KC-CPU-026",
    "name": "AMD Ryzen 7 7800X3D (Ryzen 7000, AM5, 8C/16T)",
    "slug": "amd-ryzen-7-7800x3d-ryzen-7000-am5-8c-16t-kc-cpu-026",
    "categoryId": "processor",
    "brandId": "amd",
    "description": "AMD AMD Ryzen 7 7800X3D (Ryzen 7000, AM5, 8C/16T)",
    "specs": {
      "modelOrPartNo": "7 7800X3D",
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "cores": 8,
      "threads": 16,
      "baseClockGhz": 4.2,
      "boostClockGhz": 5,
      "tdpW": 120,
      "integratedGraphics": true,
      "coolerIncluded": "No (cooler required)",
      "memorySupport": "DDR5"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "socket": "AM5",
      "cpuFamily": "Ryzen",
      "cpuGeneration": "Ryzen 7000",
      "memorySupport": "DDR5"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3800000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "854231"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cpu-026",
      "amd",
      "ryzen",
      "7800x3d",
      "7000",
      "am5",
      "8c",
      "16t",
      "processor"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-001",
    "sku": "KC-MOBO-001",
    "name": "Gigabyte H610M S2 V2 DDR4 mATX Motherboard (LGA1700, H610, DDR4)",
    "slug": "gigabyte-h610m-s2-v2-ddr4-matx-motherboard-lga1700-h610-ddr4-kc-mobo-001",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "H610M S2 V2 DDR4",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 729000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-001",
      "gigabyte",
      "h610m",
      "s2",
      "v2",
      "ddr4",
      "matx",
      "motherboard",
      "lga1700",
      "h610"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-002",
    "sku": "KC-MOBO-002",
    "name": "MSI PRO H610M-E DDR4 mATX Motherboard (LGA1700, H610, DDR4)",
    "slug": "msi-pro-h610m-e-ddr4-matx-motherboard-lga1700-h610-ddr4-kc-mobo-002",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO H610M-E DDR4",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 690000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-002",
      "msi",
      "pro",
      "h610m",
      "ddr4",
      "matx",
      "motherboard",
      "lga1700",
      "h610"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-003",
    "sku": "KC-MOBO-003",
    "name": "ASRock H610M-HDV/M.2+ mATX Motherboard (LGA1700, H610, DDR4)",
    "slug": "asrock-h610m-hdv-m-2-matx-motherboard-lga1700-h610-ddr4-kc-mobo-003",
    "categoryId": "motherboard",
    "brandId": "asrock",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "H610M-HDV/M.2+",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 680000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-003",
      "asrock",
      "h610m",
      "hdv",
      "m.2+",
      "matx",
      "motherboard",
      "lga1700",
      "h610",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-004",
    "sku": "KC-MOBO-004",
    "name": "Asus Prime H610M-F WiFi D4 mATX Motherboard (LGA1700, H610, DDR4)",
    "slug": "asus-prime-h610m-f-wifi-d4-matx-motherboard-lga1700-h610-ddr4-kc-mobo-004",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "Prime H610M-F WiFi D4",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 1,
      "wifi": true,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 894900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-004",
      "asus",
      "prime",
      "h610m",
      "wifi",
      "d4",
      "matx",
      "motherboard",
      "lga1700",
      "h610",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-005",
    "sku": "KC-MOBO-005",
    "name": "MSI PRO H610M-S DDR5 mATX Motherboard (LGA1700, H610, DDR5)",
    "slug": "msi-pro-h610m-s-ddr5-matx-motherboard-lga1700-h610-ddr5-kc-mobo-005",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO H610M-S DDR5",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "H610",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 671900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-005",
      "msi",
      "pro",
      "h610m",
      "ddr5",
      "matx",
      "motherboard",
      "lga1700",
      "h610"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-006",
    "sku": "KC-MOBO-006",
    "name": "Asus Prime B760M-K D4 mATX Motherboard (LGA1700, B760, DDR4)",
    "slug": "asus-prime-b760m-k-d4-matx-motherboard-lga1700-b760-ddr4-kc-mobo-006",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "Prime B760M-K D4",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-006",
      "asus",
      "prime",
      "b760m",
      "d4",
      "matx",
      "motherboard",
      "lga1700",
      "b760",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-007",
    "sku": "KC-MOBO-007",
    "name": "MSI PRO B760M-E DDR4 mATX Motherboard (LGA1700, B760, DDR4)",
    "slug": "msi-pro-b760m-e-ddr4-matx-motherboard-lga1700-b760-ddr4-kc-mobo-007",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO B760M-E DDR4",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-007",
      "msi",
      "pro",
      "b760m",
      "ddr4",
      "matx",
      "motherboard",
      "lga1700",
      "b760"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-008",
    "sku": "KC-MOBO-008",
    "name": "ASRock B760 Pro RS/D4 ATX Motherboard (LGA1700, B760, DDR4)",
    "slug": "asrock-b760-pro-rs-d4-atx-motherboard-lga1700-b760-ddr4-kc-mobo-008",
    "categoryId": "motherboard",
    "brandId": "asrock",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B760 Pro RS/D4",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "ATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "ATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1549900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-008",
      "asrock",
      "b760",
      "pro",
      "rs",
      "d4",
      "atx",
      "motherboard",
      "lga1700",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-009",
    "sku": "KC-MOBO-009",
    "name": "Asus B760M-AYW WiFi D4 II mATX Motherboard (LGA1700, B760, DDR4)",
    "slug": "asus-b760m-ayw-wifi-d4-ii-matx-motherboard-lga1700-b760-ddr4-kc-mobo-009",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B760M-AYW WiFi D4 II",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1954000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-009",
      "asus",
      "b760m",
      "ayw",
      "wifi",
      "d4",
      "ii",
      "matx",
      "motherboard",
      "lga1700",
      "b760",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-010",
    "sku": "KC-MOBO-010",
    "name": "Gigabyte B760M D2H DDR5 mATX Motherboard (LGA1700, B760, DDR5)",
    "slug": "gigabyte-b760m-d2h-ddr5-matx-motherboard-lga1700-b760-ddr5-kc-mobo-010",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B760M D2H DDR5",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1250000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-010",
      "gigabyte",
      "b760m",
      "d2h",
      "ddr5",
      "matx",
      "motherboard",
      "lga1700",
      "b760"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-011",
    "sku": "KC-MOBO-011",
    "name": "Asus TUF Gaming B760M-PLUS WiFi II mATX Motherboard (LGA1700, B760, DDR5)",
    "slug": "asus-tuf-gaming-b760m-plus-wifi-ii-matx-motherboard-lga1700-b760-ddr5-kc-mobo-011",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "TUF Gaming B760M-PLUS WiFi II",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "12th/13th/14th Gen Intel (older stock may need BIOS update for 13th/14th Gen)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1700",
      "chipset": "B760",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2699900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-011",
      "asus",
      "tuf",
      "gaming",
      "b760m",
      "plus",
      "wifi",
      "ii",
      "matx",
      "motherboard",
      "lga1700",
      "b760",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-012",
    "sku": "KC-MOBO-012",
    "name": "Gigabyte A520M K V2 mATX Motherboard (AM4, A520, DDR4)",
    "slug": "gigabyte-a520m-k-v2-matx-motherboard-am4-a520-ddr4-kc-mobo-012",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "A520M K V2",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "A520",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 64,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "A520",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 630000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-012",
      "gigabyte",
      "a520m",
      "v2",
      "matx",
      "motherboard",
      "am4",
      "a520",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-013",
    "sku": "KC-MOBO-013",
    "name": "MSI MAG A520M Vector WiFi mATX Motherboard (AM4, A520, DDR4)",
    "slug": "msi-mag-a520m-vector-wifi-matx-motherboard-am4-a520-ddr4-kc-mobo-013",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "MAG A520M Vector WiFi",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "A520",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 1,
      "wifi": true,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "A520",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 749900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-013",
      "msi",
      "mag",
      "a520m",
      "vector",
      "wifi",
      "matx",
      "motherboard",
      "am4",
      "a520",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-014",
    "sku": "KC-MOBO-014",
    "name": "Asus Prime B550M-K ARGB mATX Motherboard (AM4, B550, DDR4)",
    "slug": "asus-prime-b550m-k-argb-matx-motherboard-am4-b550-ddr4-kc-mobo-014",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "Prime B550M-K ARGB",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 899900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-014",
      "asus",
      "prime",
      "b550m",
      "argb",
      "matx",
      "motherboard",
      "am4",
      "b550",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-015",
    "sku": "KC-MOBO-015",
    "name": "Gigabyte B550M DS3H AC R2 mATX Motherboard (AM4, B550, DDR4)",
    "slug": "gigabyte-b550m-ds3h-ac-r2-matx-motherboard-am4-b550-ddr4-kc-mobo-015",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B550M DS3H AC R2",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 1,
      "wifi": true,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1059900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-015",
      "gigabyte",
      "b550m",
      "ds3h",
      "ac",
      "r2",
      "matx",
      "motherboard",
      "am4",
      "b550",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-016",
    "sku": "KC-MOBO-016",
    "name": "Gigabyte B550M Gaming X WiFi6 mATX Motherboard (AM4, B550, DDR4)",
    "slug": "gigabyte-b550m-gaming-x-wifi6-matx-motherboard-am4-b550-ddr4-kc-mobo-016",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B550M Gaming X WiFi6",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1170000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-016",
      "gigabyte",
      "b550m",
      "gaming",
      "wifi6",
      "matx",
      "motherboard",
      "am4",
      "b550",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-017",
    "sku": "KC-MOBO-017",
    "name": "Gigabyte B550 UD AC WiFi ATX Motherboard (AM4, B550, DDR4)",
    "slug": "gigabyte-b550-ud-ac-wifi-atx-motherboard-am4-b550-ddr4-kc-mobo-017",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B550 UD AC WiFi",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "ATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "ATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1398600,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-017",
      "gigabyte",
      "b550",
      "ud",
      "ac",
      "wifi",
      "atx",
      "motherboard",
      "am4",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-018",
    "sku": "KC-MOBO-018",
    "name": "Asus Prime B550-PLUS AC-HES ATX Motherboard (AM4, B550, DDR4)",
    "slug": "asus-prime-b550-plus-ac-hes-atx-motherboard-am4-b550-ddr4-kc-mobo-018",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "Prime B550-PLUS AC-HES",
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "ATX",
      "memorySlots": 4,
      "maxMemoryGb": 128,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 3000/4000G/5000 (BIOS update may be needed for 5000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR4",
      "memoryFormFactor": "DIMM",
      "socket": "AM4",
      "chipset": "B550",
      "boardFormFactor": "ATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1499000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-018",
      "asus",
      "prime",
      "b550",
      "plus",
      "ac",
      "hes",
      "atx",
      "motherboard",
      "am4",
      "ddr4"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-019",
    "sku": "KC-MOBO-019",
    "name": "Gigabyte A620M S2H mATX Motherboard (AM5, A620, DDR5)",
    "slug": "gigabyte-a620m-s2h-matx-motherboard-am5-a620-ddr5-kc-mobo-019",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "A620M S2H",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "A620",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "A620",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 790000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-019",
      "gigabyte",
      "a620m",
      "s2h",
      "matx",
      "motherboard",
      "am5",
      "a620",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-020",
    "sku": "KC-MOBO-020",
    "name": "MSI PRO A620M-E mATX Motherboard (AM5, A620, DDR5)",
    "slug": "msi-pro-a620m-e-matx-motherboard-am5-a620-ddr5-kc-mobo-020",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO A620M-E",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "A620",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "A620",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 740000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-020",
      "msi",
      "pro",
      "a620m",
      "matx",
      "motherboard",
      "am5",
      "a620",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-021",
    "sku": "KC-MOBO-021",
    "name": "MSI PRO B650M-B mATX Motherboard (AM5, B650, DDR5)",
    "slug": "msi-pro-b650m-b-matx-motherboard-am5-b650-ddr5-kc-mobo-021",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO B650M-B",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 990000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-021",
      "msi",
      "pro",
      "b650m",
      "matx",
      "motherboard",
      "am5",
      "b650",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-022",
    "sku": "KC-MOBO-022",
    "name": "Asus Prime B650M-R DDR5 mATX Motherboard (AM5, B650, DDR5)",
    "slug": "asus-prime-b650m-r-ddr5-matx-motherboard-am5-b650-ddr5-kc-mobo-022",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "Prime B650M-R DDR5",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 999900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-022",
      "asus",
      "prime",
      "b650m",
      "ddr5",
      "matx",
      "motherboard",
      "am5",
      "b650"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-023",
    "sku": "KC-MOBO-023",
    "name": "Gigabyte B650M D3HP mATX Motherboard (AM5, B650, DDR5)",
    "slug": "gigabyte-b650m-d3hp-matx-motherboard-am5-b650-ddr5-kc-mobo-023",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B650M D3HP",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1160000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-023",
      "gigabyte",
      "b650m",
      "d3hp",
      "matx",
      "motherboard",
      "am5",
      "b650",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-024",
    "sku": "KC-MOBO-024",
    "name": "MSI B650M Gaming WiFi mATX Motherboard (AM5, B650, DDR5)",
    "slug": "msi-b650m-gaming-wifi-matx-motherboard-am5-b650-ddr5-kc-mobo-024",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B650M Gaming WiFi",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1220000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-024",
      "msi",
      "b650m",
      "gaming",
      "wifi",
      "matx",
      "motherboard",
      "am5",
      "b650",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-025",
    "sku": "KC-MOBO-025",
    "name": "Gigabyte B650M Gaming X AX mATX Motherboard (AM5, B650, DDR5)",
    "slug": "gigabyte-b650m-gaming-x-ax-matx-motherboard-am5-b650-ddr5-kc-mobo-025",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B650M Gaming X AX",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1450000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-025",
      "gigabyte",
      "b650m",
      "gaming",
      "ax",
      "matx",
      "motherboard",
      "am5",
      "b650",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-026",
    "sku": "KC-MOBO-026",
    "name": "Gigabyte B650 UD AX ATX Motherboard (AM5, B650, DDR5)",
    "slug": "gigabyte-b650-ud-ax-atx-motherboard-am5-b650-ddr5-kc-mobo-026",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B650 UD AX",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "ATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "ATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1699900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-026",
      "gigabyte",
      "b650",
      "ud",
      "ax",
      "atx",
      "motherboard",
      "am5",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-027",
    "sku": "KC-MOBO-027",
    "name": "Gigabyte B650 Eagle AX ATX Motherboard (AM5, B650, DDR5)",
    "slug": "gigabyte-b650-eagle-ax-atx-motherboard-am5-b650-ddr5-kc-mobo-027",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B650 Eagle AX",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "ATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 3,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000 (BIOS update may be needed for 9000 series)"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B650",
      "boardFormFactor": "ATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1799900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-027",
      "gigabyte",
      "b650",
      "eagle",
      "ax",
      "atx",
      "motherboard",
      "am5",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-028",
    "sku": "KC-MOBO-028",
    "name": "MSI PRO B850M-G mATX Motherboard (AM5, B850, DDR5)",
    "slug": "msi-pro-b850m-g-matx-motherboard-am5-b850-ddr5-kc-mobo-028",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO B850M-G",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1208400,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-028",
      "msi",
      "pro",
      "b850m",
      "matx",
      "motherboard",
      "am5",
      "b850",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-029",
    "sku": "KC-MOBO-029",
    "name": "MSI PRO B850M-P mATX Motherboard (AM5, B850, DDR5)",
    "slug": "msi-pro-b850m-p-matx-motherboard-am5-b850-ddr5-kc-mobo-029",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO B850M-P",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1415900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-029",
      "msi",
      "pro",
      "b850m",
      "matx",
      "motherboard",
      "am5",
      "b850",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-030",
    "sku": "KC-MOBO-030",
    "name": "Gigabyte B850M Force WiFi6E mATX Motherboard (AM5, B850, DDR5)",
    "slug": "gigabyte-b850m-force-wifi6e-matx-motherboard-am5-b850-ddr5-kc-mobo-030",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B850M Force WiFi6E",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1429900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-030",
      "gigabyte",
      "b850m",
      "force",
      "wifi6e",
      "matx",
      "motherboard",
      "am5",
      "b850",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-031",
    "sku": "KC-MOBO-031",
    "name": "Gigabyte B850M DS3H mATX Motherboard (AM5, B850, DDR5)",
    "slug": "gigabyte-b850m-ds3h-matx-motherboard-am5-b850-ddr5-kc-mobo-031",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B850M DS3H",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Ryzen 7000/8000/9000"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1499900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-031",
      "gigabyte",
      "b850m",
      "ds3h",
      "matx",
      "motherboard",
      "am5",
      "b850",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-032",
    "sku": "KC-MOBO-032",
    "name": "Asus B850M AYW Gaming WiFi mATX Motherboard (AM5, B850, DDR5)",
    "slug": "asus-b850m-ayw-gaming-wifi-matx-motherboard-am5-b850-ddr5-kc-mobo-032",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B850M AYW Gaming WiFi",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1499900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-032",
      "asus",
      "b850m",
      "ayw",
      "gaming",
      "wifi",
      "matx",
      "motherboard",
      "am5",
      "b850",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-033",
    "sku": "KC-MOBO-033",
    "name": "Gigabyte B850 Gaming X WiFi6E ATX Motherboard (AM5, B850, DDR5)",
    "slug": "gigabyte-b850-gaming-x-wifi6e-atx-motherboard-am5-b850-ddr5-kc-mobo-033",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B850 Gaming X WiFi6E",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "ATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 3,
      "wifi": true,
      "cpuGenSupport": "Ryzen 7000/8000/9000"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "AM5",
      "chipset": "B850",
      "boardFormFactor": "ATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1979900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-033",
      "gigabyte",
      "b850",
      "gaming",
      "wifi6e",
      "atx",
      "motherboard",
      "am5",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-034",
    "sku": "KC-MOBO-034",
    "name": "MSI PRO H810M-E mATX Motherboard (LGA1851, H810, DDR5)",
    "slug": "msi-pro-h810m-e-matx-motherboard-lga1851-h810-ddr5-kc-mobo-034",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO H810M-E",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "H810",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": false,
      "cpuGenSupport": "Intel Core Ultra 200S"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "H810",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 920100,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-034",
      "msi",
      "pro",
      "h810m",
      "matx",
      "motherboard",
      "lga1851",
      "h810",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-035",
    "sku": "KC-MOBO-035",
    "name": "ASRock H810M-X WiFi mATX Motherboard (LGA1851, H810, DDR5)",
    "slug": "asrock-h810m-x-wifi-matx-motherboard-lga1851-h810-ddr5-kc-mobo-035",
    "categoryId": "motherboard",
    "brandId": "asrock",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "H810M-X WiFi",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "H810",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 1,
      "wifi": true,
      "cpuGenSupport": "Intel Core Ultra 200S"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "H810",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1040000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-035",
      "asrock",
      "h810m",
      "wifi",
      "matx",
      "motherboard",
      "lga1851",
      "h810",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-036",
    "sku": "KC-MOBO-036",
    "name": "Asus Prime B860M-K mATX Motherboard (LGA1851, B860, DDR5)",
    "slug": "asus-prime-b860m-k-matx-motherboard-lga1851-b860-ddr5-kc-mobo-036",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "Prime B860M-K",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Intel Core Ultra 200S"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1180000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-036",
      "asus",
      "prime",
      "b860m",
      "matx",
      "motherboard",
      "lga1851",
      "b860",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-037",
    "sku": "KC-MOBO-037",
    "name": "MSI PRO B860M-E mATX Motherboard (LGA1851, B860, DDR5)",
    "slug": "msi-pro-b860m-e-matx-motherboard-lga1851-b860-ddr5-kc-mobo-037",
    "categoryId": "motherboard",
    "brandId": "msi",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "PRO B860M-E",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX",
      "memorySlots": 2,
      "maxMemoryGb": 96,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Intel Core Ultra 200S"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1399900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-037",
      "msi",
      "pro",
      "b860m",
      "matx",
      "motherboard",
      "lga1851",
      "b860",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-038",
    "sku": "KC-MOBO-038",
    "name": "Gigabyte B860M Gaming WiFi6 mATX Motherboard (LGA1851, B860, DDR5)",
    "slug": "gigabyte-b860m-gaming-wifi6-matx-motherboard-lga1851-b860-ddr5-kc-mobo-038",
    "categoryId": "motherboard",
    "brandId": "gigabyte",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "B860M Gaming WiFi6",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": true,
      "cpuGenSupport": "Intel Core Ultra 200S"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1663900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-038",
      "gigabyte",
      "b860m",
      "gaming",
      "wifi6",
      "matx",
      "motherboard",
      "lga1851",
      "b860",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-mobo-039",
    "sku": "KC-MOBO-039",
    "name": "Asus TUF Gaming B860M-PLUS mATX Motherboard (LGA1851, B860, DDR5)",
    "slug": "asus-tuf-gaming-b860m-plus-matx-motherboard-lga1851-b860-ddr5-kc-mobo-039",
    "categoryId": "motherboard",
    "brandId": "asus",
    "description": "Slot/M.2 counts approximate - verify on manufacturer datasheet before publishing",
    "specs": {
      "modelOrPartNo": "TUF Gaming B860M-PLUS",
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX",
      "memorySlots": 4,
      "maxMemoryGb": 192,
      "m2Slots": 2,
      "wifi": false,
      "cpuGenSupport": "Intel Core Ultra 200S"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "memoryType": "DDR5",
      "memoryFormFactor": "DIMM",
      "socket": "LGA1851",
      "chipset": "B860",
      "boardFormFactor": "mATX"
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2277900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-mobo-039",
      "asus",
      "tuf",
      "gaming",
      "b860m",
      "plus",
      "matx",
      "motherboard",
      "lga1851",
      "b860",
      "ddr5"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-001",
    "sku": "KC-GPU-001",
    "name": "MSI GeForce GT 710 LP 1GB Graphics Card",
    "slug": "msi-geforce-gt-710-lp-1gb-graphics-card-kc-gpu-001",
    "categoryId": "graphics-card",
    "brandId": "msi",
    "description": "Low-profile, basic display output only",
    "specs": {
      "modelOrPartNo": "GeForce GT 710 LP",
      "tdpW": 19,
      "gpuChipset": "NVIDIA GeForce GT 710",
      "vramGb": 1,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 359000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-001",
      "msi",
      "geforce",
      "gt",
      "710",
      "lp",
      "1gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-002",
    "sku": "KC-GPU-002",
    "name": "Inno3D GeForce GT 730 LP 4GB Graphics Card",
    "slug": "inno3d-geforce-gt-730-lp-4gb-graphics-card-kc-gpu-002",
    "categoryId": "graphics-card",
    "brandId": "inno3d",
    "description": "Low-profile, basic display output only",
    "specs": {
      "modelOrPartNo": "GeForce GT 730 LP",
      "tdpW": 25,
      "gpuChipset": "NVIDIA GeForce GT 730",
      "vramGb": 4,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 712900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-002",
      "inno3d",
      "geforce",
      "gt",
      "730",
      "lp",
      "4gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-003",
    "sku": "KC-GPU-003",
    "name": "MSI GeForce GTX 1630 Ventus XS OC 4GB Graphics Card",
    "slug": "msi-geforce-gtx-1630-ventus-xs-oc-4gb-graphics-card-kc-gpu-003",
    "categoryId": "graphics-card",
    "brandId": "msi",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce GTX 1630 Ventus XS OC",
      "tdpW": 75,
      "gpuChipset": "NVIDIA GeForce GTX 1630",
      "vramGb": 4,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-003",
      "msi",
      "geforce",
      "gtx",
      "1630",
      "ventus",
      "xs",
      "oc",
      "4gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-004",
    "sku": "KC-GPU-004",
    "name": "Gigabyte GeForce GTX 1650 D6 OC 4GB Graphics Card",
    "slug": "gigabyte-geforce-gtx-1650-d6-oc-4gb-graphics-card-kc-gpu-004",
    "categoryId": "graphics-card",
    "brandId": "gigabyte",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce GTX 1650 D6 OC",
      "tdpW": 75,
      "gpuChipset": "NVIDIA GeForce GTX 1650",
      "vramGb": 4,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1299900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-004",
      "gigabyte",
      "geforce",
      "gtx",
      "1650",
      "d6",
      "oc",
      "4gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-005",
    "sku": "KC-GPU-005",
    "name": "MSI GeForce GTX 1650 D6 Ventus XS OC 4GB Graphics Card",
    "slug": "msi-geforce-gtx-1650-d6-ventus-xs-oc-4gb-graphics-card-kc-gpu-005",
    "categoryId": "graphics-card",
    "brandId": "msi",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce GTX 1650 D6 Ventus XS OC",
      "tdpW": 75,
      "gpuChipset": "NVIDIA GeForce GTX 1650",
      "vramGb": 4,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1330000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-005",
      "msi",
      "geforce",
      "gtx",
      "1650",
      "d6",
      "ventus",
      "xs",
      "oc",
      "4gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-006",
    "sku": "KC-GPU-006",
    "name": "Asus Dual GeForce GTX 1650 OC EVO 4GB Graphics Card",
    "slug": "asus-dual-geforce-gtx-1650-oc-evo-4gb-graphics-card-kc-gpu-006",
    "categoryId": "graphics-card",
    "brandId": "asus",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "Dual GeForce GTX 1650 OC EVO",
      "tdpW": 75,
      "gpuChipset": "NVIDIA GeForce GTX 1650",
      "vramGb": 4,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1399900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-006",
      "asus",
      "dual",
      "geforce",
      "gtx",
      "1650",
      "oc",
      "evo",
      "4gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-007",
    "sku": "KC-GPU-007",
    "name": "Gigabyte GeForce RTX 3050 WINDFORCE OC V2 6GB Graphics Card",
    "slug": "gigabyte-geforce-rtx-3050-windforce-oc-v2-6gb-graphics-card-kc-gpu-007",
    "categoryId": "graphics-card",
    "brandId": "gigabyte",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 3050 WINDFORCE OC V2",
      "tdpW": 70,
      "gpuChipset": "NVIDIA GeForce RTX 3050",
      "vramGb": 6,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1930000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-007",
      "gigabyte",
      "geforce",
      "rtx",
      "3050",
      "windforce",
      "oc",
      "v2",
      "6gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-008",
    "sku": "KC-GPU-008",
    "name": "MSI GeForce RTX 3050 Ventus 2X E OC 6GB Graphics Card",
    "slug": "msi-geforce-rtx-3050-ventus-2x-e-oc-6gb-graphics-card-kc-gpu-008",
    "categoryId": "graphics-card",
    "brandId": "msi",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 3050 Ventus 2X E OC",
      "tdpW": 70,
      "gpuChipset": "NVIDIA GeForce RTX 3050",
      "vramGb": 6,
      "gpuPowerConnector": "None (slot powered)",
      "recommendedPsuW": 300
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 300
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 1980000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-008",
      "msi",
      "geforce",
      "rtx",
      "3050",
      "ventus",
      "2x",
      "oc",
      "6gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-009",
    "sku": "KC-GPU-009",
    "name": "Inno3D GeForce RTX 3050 Twin X2 OC 8GB Graphics Card",
    "slug": "inno3d-geforce-rtx-3050-twin-x2-oc-8gb-graphics-card-kc-gpu-009",
    "categoryId": "graphics-card",
    "brandId": "inno3d",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 3050 Twin X2 OC",
      "tdpW": 130,
      "gpuChipset": "NVIDIA GeForce RTX 3050",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 550
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 550
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 2550000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-009",
      "inno3d",
      "geforce",
      "rtx",
      "3050",
      "twin",
      "x2",
      "oc",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-010",
    "sku": "KC-GPU-010",
    "name": "Inno3D GeForce RTX 5050 Twin X2 8GB Graphics Card",
    "slug": "inno3d-geforce-rtx-5050-twin-x2-8gb-graphics-card-kc-gpu-010",
    "categoryId": "graphics-card",
    "brandId": "inno3d",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 5050 Twin X2",
      "tdpW": 130,
      "gpuChipset": "NVIDIA GeForce RTX 5050",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 550
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 550
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3473900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-010",
      "inno3d",
      "geforce",
      "rtx",
      "5050",
      "twin",
      "x2",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-011",
    "sku": "KC-GPU-011",
    "name": "Asus Dual GeForce RTX 5050 OC 8GB Graphics Card",
    "slug": "asus-dual-geforce-rtx-5050-oc-8gb-graphics-card-kc-gpu-011",
    "categoryId": "graphics-card",
    "brandId": "asus",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "Dual GeForce RTX 5050 OC",
      "tdpW": 130,
      "gpuChipset": "NVIDIA GeForce RTX 5050",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 550
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 550
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3750000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-011",
      "asus",
      "dual",
      "geforce",
      "rtx",
      "5050",
      "oc",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-012",
    "sku": "KC-GPU-012",
    "name": "Inno3D GeForce RTX 5060 Twin X2 OC V2 8GB Graphics Card",
    "slug": "inno3d-geforce-rtx-5060-twin-x2-oc-v2-8gb-graphics-card-kc-gpu-012",
    "categoryId": "graphics-card",
    "brandId": "inno3d",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 5060 Twin X2 OC V2",
      "tdpW": 145,
      "gpuChipset": "NVIDIA GeForce RTX 5060",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 550
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 550
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 4195900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-012",
      "inno3d",
      "geforce",
      "rtx",
      "5060",
      "twin",
      "x2",
      "oc",
      "v2",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-013",
    "sku": "KC-GPU-013",
    "name": "Gigabyte GeForce RTX 5060 WINDFORCE MAX OC 8GB Graphics Card",
    "slug": "gigabyte-geforce-rtx-5060-windforce-max-oc-8gb-graphics-card-kc-gpu-013",
    "categoryId": "graphics-card",
    "brandId": "gigabyte",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 5060 WINDFORCE MAX OC",
      "tdpW": 145,
      "gpuChipset": "NVIDIA GeForce RTX 5060",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 550
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 550
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 4150000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-013",
      "gigabyte",
      "geforce",
      "rtx",
      "5060",
      "windforce",
      "max",
      "oc",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-014",
    "sku": "KC-GPU-014",
    "name": "Gigabyte GeForce RTX 5060 Ti WINDFORCE MAX OC 8GB Graphics Card",
    "slug": "gigabyte-geforce-rtx-5060-ti-windforce-max-oc-8gb-graphics-card-kc-gpu-014",
    "categoryId": "graphics-card",
    "brandId": "gigabyte",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "GeForce RTX 5060 Ti WINDFORCE MAX OC",
      "tdpW": 180,
      "gpuChipset": "NVIDIA GeForce RTX 5060 Ti",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 600
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 600
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 4789900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-014",
      "gigabyte",
      "geforce",
      "rtx",
      "5060",
      "ti",
      "windforce",
      "max",
      "oc",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-015",
    "sku": "KC-GPU-015",
    "name": "Inno3D GeForce RTX 5060 Ti Twin X2 16GB Graphics Card",
    "slug": "inno3d-geforce-rtx-5060-ti-twin-x2-16gb-graphics-card-kc-gpu-015",
    "categoryId": "graphics-card",
    "brandId": "inno3d",
    "description": "16GB card prices vary widely - confirm with distributor",
    "specs": {
      "modelOrPartNo": "GeForce RTX 5060 Ti Twin X2",
      "tdpW": 180,
      "gpuChipset": "NVIDIA GeForce RTX 5060 Ti",
      "vramGb": 16,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 600
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 600
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 6200000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-015",
      "inno3d",
      "geforce",
      "rtx",
      "5060",
      "ti",
      "twin",
      "x2",
      "16gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-016",
    "sku": "KC-GPU-016",
    "name": "Asus Prime Radeon RX 9060 XT OC 8GB Graphics Card",
    "slug": "asus-prime-radeon-rx-9060-xt-oc-8gb-graphics-card-kc-gpu-016",
    "categoryId": "graphics-card",
    "brandId": "asus",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "Prime Radeon RX 9060 XT OC",
      "tdpW": 160,
      "gpuChipset": "AMD Radeon RX 9060 XT",
      "vramGb": 8,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 500
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 500
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 3800000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-016",
      "asus",
      "prime",
      "radeon",
      "rx",
      "9060",
      "xt",
      "oc",
      "8gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-gpu-017",
    "sku": "KC-GPU-017",
    "name": "Asus Dual Radeon RX 9060 XT 16GB Graphics Card",
    "slug": "asus-dual-radeon-rx-9060-xt-16gb-graphics-card-kc-gpu-017",
    "categoryId": "graphics-card",
    "brandId": "asus",
    "description": "Check card length vs cabinet clearance; fill gpu_length_mm from datasheet",
    "specs": {
      "modelOrPartNo": "Dual Radeon RX 9060 XT",
      "tdpW": 160,
      "gpuChipset": "AMD Radeon RX 9060 XT",
      "vramGb": 16,
      "gpuPowerConnector": "1x 8-pin",
      "recommendedPsuW": 500
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "recommendedPsuW": 500
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 5075000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-gpu-017",
      "asus",
      "dual",
      "radeon",
      "rx",
      "9060",
      "xt",
      "16gb",
      "graphics",
      "card",
      "graphics-card"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-001",
    "sku": "KC-PSU-001",
    "name": "Zebronics Zeb-PGP450W 450W 80+ Bronze Power Supply (SMPS)",
    "slug": "zebronics-zeb-pgp450w-450w-80-bronze-power-supply-smps-kc-psu-001",
    "categoryId": "power-supply",
    "brandId": "zebronics",
    "description": "Zebronics Zebronics Zeb-PGP450W 450W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "Zeb-PGP450W",
      "wattage": 450,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 450
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-001",
      "zebronics",
      "zeb",
      "pgp450w",
      "450w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-002",
    "sku": "KC-PSU-002",
    "name": "Antec Atom V550 550W Non-certified Power Supply (SMPS)",
    "slug": "antec-atom-v550-550w-non-certified-power-supply-smps-kc-psu-002",
    "categoryId": "power-supply",
    "brandId": "antec",
    "description": "Antec Antec Atom V550 550W Non-certified Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "Atom V550",
      "wattage": 550,
      "psuEfficiency": "Non-certified",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 270000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-002",
      "antec",
      "atom",
      "v550",
      "550w",
      "non",
      "certified",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-003",
    "sku": "KC-PSU-003",
    "name": "Antec Atom V650 V2 650W Non-certified Power Supply (SMPS)",
    "slug": "antec-atom-v650-v2-650w-non-certified-power-supply-smps-kc-psu-003",
    "categoryId": "power-supply",
    "brandId": "antec",
    "description": "Antec Antec Atom V650 V2 650W Non-certified Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "Atom V650 V2",
      "wattage": 650,
      "psuEfficiency": "Non-certified",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 330000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-003",
      "antec",
      "atom",
      "v650",
      "v2",
      "650w",
      "non",
      "certified",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-004",
    "sku": "KC-PSU-004",
    "name": "Antec NeoEco 550M 550W 80+ Bronze Power Supply (SMPS)",
    "slug": "antec-neoeco-550m-550w-80-bronze-power-supply-smps-kc-psu-004",
    "categoryId": "power-supply",
    "brandId": "antec",
    "description": "Antec Antec NeoEco 550M 550W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "NeoEco 550M",
      "wattage": 550,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Semi-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 369900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-004",
      "antec",
      "neoeco",
      "550m",
      "550w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-005",
    "sku": "KC-PSU-005",
    "name": "Deepcool PF550 550W 80+ Standard Power Supply (SMPS)",
    "slug": "deepcool-pf550-550w-80-standard-power-supply-smps-kc-psu-005",
    "categoryId": "power-supply",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool PF550 550W 80+ Standard Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "PF550",
      "wattage": 550,
      "psuEfficiency": "80+ Standard",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 341900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-005",
      "deepcool",
      "pf550",
      "550w",
      "80+",
      "standard",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-006",
    "sku": "KC-PSU-006",
    "name": "Deepcool PK550D 550W 80+ Bronze Power Supply (SMPS)",
    "slug": "deepcool-pk550d-550w-80-bronze-power-supply-smps-kc-psu-006",
    "categoryId": "power-supply",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool PK550D 550W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "PK550D",
      "wattage": 550,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 362900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-006",
      "deepcool",
      "pk550d",
      "550w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-007",
    "sku": "KC-PSU-007",
    "name": "Deepcool PL650D 650W 80+ Bronze Power Supply (SMPS)",
    "slug": "deepcool-pl650d-650w-80-bronze-power-supply-smps-kc-psu-007",
    "categoryId": "power-supply",
    "brandId": "deepcool",
    "description": "ATX 3.0",
    "specs": {
      "modelOrPartNo": "PL650D",
      "wattage": 650,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 530000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-007",
      "deepcool",
      "pl650d",
      "650w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-008",
    "sku": "KC-PSU-008",
    "name": "Deepcool PN850M 850W 80+ Gold Power Supply (SMPS)",
    "slug": "deepcool-pn850m-850w-80-gold-power-supply-smps-kc-psu-008",
    "categoryId": "power-supply",
    "brandId": "deepcool",
    "description": "ATX 3.1",
    "specs": {
      "modelOrPartNo": "PN850M",
      "wattage": 850,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 850
    },
    "condition": "new",
    "warrantyMonths": 120,
    "pricing": {
      "pricePaise": 915000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-008",
      "deepcool",
      "pn850m",
      "850w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-009",
    "sku": "KC-PSU-009",
    "name": "Cooler Master Elite V3 400W Non-certified Power Supply (SMPS)",
    "slug": "cooler-master-elite-v3-400w-non-certified-power-supply-smps-kc-psu-009",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master Elite V3 400W Non-certified Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "Elite V3",
      "wattage": 400,
      "psuEfficiency": "Non-certified",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 400
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 349900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-009",
      "cooler",
      "master",
      "elite",
      "v3",
      "400w",
      "non",
      "certified",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-010",
    "sku": "KC-PSU-010",
    "name": "Cooler Master MWE 450 V2 450W 80+ Bronze Power Supply (SMPS)",
    "slug": "cooler-master-mwe-450-v2-450w-80-bronze-power-supply-smps-kc-psu-010",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master MWE 450 V2 450W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "MWE 450 V2",
      "wattage": 450,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 450
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 350000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-010",
      "cooler",
      "master",
      "mwe",
      "450",
      "v2",
      "450w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-011",
    "sku": "KC-PSU-011",
    "name": "Cooler Master MWE 550 Bronze V3 550W 80+ Bronze Power Supply (SMPS)",
    "slug": "cooler-master-mwe-550-bronze-v3-550w-80-bronze-power-supply-smps-kc-psu-011",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "ATX 3.1",
    "specs": {
      "modelOrPartNo": "MWE 550 Bronze V3",
      "wattage": 550,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 430000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-011",
      "cooler",
      "master",
      "mwe",
      "550",
      "bronze",
      "v3",
      "550w",
      "80+",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-012",
    "sku": "KC-PSU-012",
    "name": "Cooler Master MWE 650 Bronze V3 650W 80+ Bronze Power Supply (SMPS)",
    "slug": "cooler-master-mwe-650-bronze-v3-650w-80-bronze-power-supply-smps-kc-psu-012",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "ATX 3.1",
    "specs": {
      "modelOrPartNo": "MWE 650 Bronze V3",
      "wattage": 650,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 567900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-012",
      "cooler",
      "master",
      "mwe",
      "650",
      "bronze",
      "v3",
      "650w",
      "80+",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-013",
    "sku": "KC-PSU-013",
    "name": "Cooler Master MWE 750 Bronze V3 750W 80+ Bronze Power Supply (SMPS)",
    "slug": "cooler-master-mwe-750-bronze-v3-750w-80-bronze-power-supply-smps-kc-psu-013",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "ATX 3.1",
    "specs": {
      "modelOrPartNo": "MWE 750 Bronze V3",
      "wattage": 750,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 750
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 651000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-013",
      "cooler",
      "master",
      "mwe",
      "750",
      "bronze",
      "v3",
      "750w",
      "80+",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-014",
    "sku": "KC-PSU-014",
    "name": "Cooler Master MWE Gold 750 V2 750W 80+ Gold Power Supply (SMPS)",
    "slug": "cooler-master-mwe-gold-750-v2-750w-80-gold-power-supply-smps-kc-psu-014",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master MWE Gold 750 V2 750W 80+ Gold Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "MWE Gold 750 V2",
      "wattage": 750,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 750
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 890000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-014",
      "cooler",
      "master",
      "mwe",
      "gold",
      "750",
      "v2",
      "750w",
      "80+",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-015",
    "sku": "KC-PSU-015",
    "name": "Cooler Master MWE Gold 850 V2 850W 80+ Gold Power Supply (SMPS)",
    "slug": "cooler-master-mwe-gold-850-v2-850w-80-gold-power-supply-smps-kc-psu-015",
    "categoryId": "power-supply",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master MWE Gold 850 V2 850W 80+ Gold Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "MWE Gold 850 V2",
      "wattage": 850,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 850
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 978000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-015",
      "cooler",
      "master",
      "mwe",
      "gold",
      "850",
      "v2",
      "850w",
      "80+",
      "power",
      "supply",
      "smps",
      "cooler master",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-016",
    "sku": "KC-PSU-016",
    "name": "Corsair CV550 550W 80+ Bronze Power Supply (SMPS)",
    "slug": "corsair-cv550-550w-80-bronze-power-supply-smps-kc-psu-016",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "Corsair Corsair CV550 550W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "CV550",
      "wattage": 550,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 410000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-016",
      "corsair",
      "cv550",
      "550w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-017",
    "sku": "KC-PSU-017",
    "name": "Corsair CV650 650W 80+ Bronze Power Supply (SMPS)",
    "slug": "corsair-cv650-650w-80-bronze-power-supply-smps-kc-psu-017",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "Corsair Corsair CV650 650W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "CV650",
      "wattage": 650,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 490000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-017",
      "corsair",
      "cv650",
      "650w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-018",
    "sku": "KC-PSU-018",
    "name": "Corsair CX550 550W 80+ Bronze Power Supply (SMPS)",
    "slug": "corsair-cx550-550w-80-bronze-power-supply-smps-kc-psu-018",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "Corsair Corsair CX550 550W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "CX550",
      "wattage": 550,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 550
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 478000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-018",
      "corsair",
      "cx550",
      "550w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-019",
    "sku": "KC-PSU-019",
    "name": "Corsair CX650 650W 80+ Bronze Power Supply (SMPS)",
    "slug": "corsair-cx650-650w-80-bronze-power-supply-smps-kc-psu-019",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "Corsair Corsair CX650 650W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "CX650",
      "wattage": 650,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 580000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-019",
      "corsair",
      "cx650",
      "650w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-020",
    "sku": "KC-PSU-020",
    "name": "Corsair CX750 750W 80+ Bronze Power Supply (SMPS)",
    "slug": "corsair-cx750-750w-80-bronze-power-supply-smps-kc-psu-020",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "Corsair Corsair CX750 750W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "CX750",
      "wattage": 750,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 750
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 653000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-020",
      "corsair",
      "cx750",
      "750w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-021",
    "sku": "KC-PSU-021",
    "name": "Corsair RM750e 750W 80+ Gold Power Supply (SMPS)",
    "slug": "corsair-rm750e-750w-80-gold-power-supply-smps-kc-psu-021",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "ATX 3.0",
    "specs": {
      "modelOrPartNo": "RM750e",
      "wattage": 750,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 750
    },
    "condition": "new",
    "warrantyMonths": 120,
    "pricing": {
      "pricePaise": 950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-021",
      "corsair",
      "rm750e",
      "750w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-022",
    "sku": "KC-PSU-022",
    "name": "Corsair RM850x Shift 850W 80+ Gold Power Supply (SMPS)",
    "slug": "corsair-rm850x-shift-850w-80-gold-power-supply-smps-kc-psu-022",
    "categoryId": "power-supply",
    "brandId": "corsair",
    "description": "ATX 3.0",
    "specs": {
      "modelOrPartNo": "RM850x Shift",
      "wattage": 850,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 850
    },
    "condition": "new",
    "warrantyMonths": 120,
    "pricing": {
      "pricePaise": 1190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-022",
      "corsair",
      "rm850x",
      "shift",
      "850w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-023",
    "sku": "KC-PSU-023",
    "name": "MSI MAG A650BN 650W 80+ Bronze Power Supply (SMPS)",
    "slug": "msi-mag-a650bn-650w-80-bronze-power-supply-smps-kc-psu-023",
    "categoryId": "power-supply",
    "brandId": "msi",
    "description": "MSI MSI MAG A650BN 650W 80+ Bronze Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "MAG A650BN",
      "wattage": 650,
      "psuEfficiency": "80+ Bronze",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 484900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-023",
      "msi",
      "mag",
      "a650bn",
      "650w",
      "80+",
      "bronze",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-024",
    "sku": "KC-PSU-024",
    "name": "Ant Esports FG650 650W 80+ Gold Power Supply (SMPS)",
    "slug": "ant-esports-fg650-650w-80-gold-power-supply-smps-kc-psu-024",
    "categoryId": "power-supply",
    "brandId": "ant-esports",
    "description": "Ant Esports Ant Esports FG650 650W 80+ Gold Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "FG650",
      "wattage": 650,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 650
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 500000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-024",
      "ant",
      "esports",
      "fg650",
      "650w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "ant esports",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-025",
    "sku": "KC-PSU-025",
    "name": "Ant Esports FG850 850W 80+ Gold Power Supply (SMPS)",
    "slug": "ant-esports-fg850-850w-80-gold-power-supply-smps-kc-psu-025",
    "categoryId": "power-supply",
    "brandId": "ant-esports",
    "description": "Ant Esports Ant Esports FG850 850W 80+ Gold Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "FG850",
      "wattage": 850,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Non-modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 850
    },
    "condition": "new",
    "warrantyMonths": 36,
    "pricing": {
      "pricePaise": 649900,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-025",
      "ant",
      "esports",
      "fg850",
      "850w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "ant esports",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-026",
    "sku": "KC-PSU-026",
    "name": "Gigabyte GP-UD750GM PG5 750W 80+ Gold Power Supply (SMPS)",
    "slug": "gigabyte-gp-ud750gm-pg5-750w-80-gold-power-supply-smps-kc-psu-026",
    "categoryId": "power-supply",
    "brandId": "gigabyte",
    "description": "ATX 3.0",
    "specs": {
      "modelOrPartNo": "GP-UD750GM PG5",
      "wattage": 750,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 750
    },
    "condition": "new",
    "warrantyMonths": 60,
    "pricing": {
      "pricePaise": 890000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-026",
      "gigabyte",
      "gp",
      "ud750gm",
      "pg5",
      "750w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-027",
    "sku": "KC-PSU-027",
    "name": "Super Flower Leadex III Gold 750W 80+ Gold Power Supply (SMPS)",
    "slug": "super-flower-leadex-iii-gold-750w-80-gold-power-supply-smps-kc-psu-027",
    "categoryId": "power-supply",
    "brandId": "super-flower",
    "description": "Super Flower Super Flower Leadex III Gold 750W 80+ Gold Power Supply (SMPS)",
    "specs": {
      "modelOrPartNo": "Leadex III Gold",
      "wattage": 750,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 750
    },
    "condition": "new",
    "warrantyMonths": 120,
    "pricing": {
      "pricePaise": 834000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-027",
      "super",
      "flower",
      "leadex",
      "iii",
      "gold",
      "750w",
      "80+",
      "power",
      "supply",
      "smps",
      "super flower",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-psu-028",
    "sku": "KC-PSU-028",
    "name": "Thermaltake Toughpower GF A3 850W 80+ Gold Power Supply (SMPS)",
    "slug": "thermaltake-toughpower-gf-a3-850w-80-gold-power-supply-smps-kc-psu-028",
    "categoryId": "power-supply",
    "brandId": "thermaltake",
    "description": "ATX 3.0",
    "specs": {
      "modelOrPartNo": "Toughpower GF A3",
      "wattage": 850,
      "psuEfficiency": "80+ Gold",
      "psuModular": "Fully modular"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "wattage": 850
    },
    "condition": "new",
    "warrantyMonths": 120,
    "pricing": {
      "pricePaise": 915000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "850440"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-psu-028",
      "thermaltake",
      "toughpower",
      "gf",
      "a3",
      "850w",
      "80+",
      "gold",
      "power",
      "supply",
      "smps",
      "power-supply"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-001",
    "sku": "KC-CAB-001",
    "name": "Generic Office ATX Cabinet",
    "slug": "generic-office-atx-cabinet-kc-cab-001",
    "categoryId": "cabinet",
    "brandId": "generic",
    "description": "Basic office cabinet, no SMPS",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 130000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-001",
      "generic",
      "office",
      "atx",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-002",
    "sku": "KC-CAB-002",
    "name": "Generic Office ATX with 450W SMPS Cabinet",
    "slug": "generic-office-atx-with-450w-smps-cabinet-kc-cab-002",
    "categoryId": "cabinet",
    "brandId": "generic",
    "description": "Includes basic 450W SMPS - not suitable for dedicated GPU",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": true,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 260000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-002",
      "generic",
      "office",
      "atx",
      "with",
      "450w",
      "smps",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-003",
    "sku": "KC-CAB-003",
    "name": "Ant Esports ICE-100 Cabinet",
    "slug": "ant-esports-ice-100-cabinet-kc-cab-003",
    "categoryId": "cabinet",
    "brandId": "ant-esports",
    "description": "Ant Esports Ant Esports ICE-100 Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 240000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-003",
      "ant",
      "esports",
      "ice",
      "100",
      "cabinet",
      "ant esports"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-004",
    "sku": "KC-CAB-004",
    "name": "Ant Esports ICE-200TG Cabinet",
    "slug": "ant-esports-ice-200tg-cabinet-kc-cab-004",
    "categoryId": "cabinet",
    "brandId": "ant-esports",
    "description": "Tempered glass side panel",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 300000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-004",
      "ant",
      "esports",
      "ice",
      "200tg",
      "cabinet",
      "ant esports"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-005",
    "sku": "KC-CAB-005",
    "name": "Deepcool Matrexx 40 Cabinet",
    "slug": "deepcool-matrexx-40-cabinet-kc-cab-005",
    "categoryId": "cabinet",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool Matrexx 40 Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 270000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-005",
      "deepcool",
      "matrexx",
      "40",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-006",
    "sku": "KC-CAB-006",
    "name": "Deepcool CH370 Cabinet",
    "slug": "deepcool-ch370-cabinet-kc-cab-006",
    "categoryId": "cabinet",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool CH370 Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 360000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-006",
      "deepcool",
      "ch370",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-007",
    "sku": "KC-CAB-007",
    "name": "Deepcool CC560 Cabinet",
    "slug": "deepcool-cc560-cabinet-kc-cab-007",
    "categoryId": "cabinet",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool CC560 Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "maxGpuLengthMm": 370,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 390000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-007",
      "deepcool",
      "cc560",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-008",
    "sku": "KC-CAB-008",
    "name": "Antec NX200M Cabinet",
    "slug": "antec-nx200m-cabinet-kc-cab-008",
    "categoryId": "cabinet",
    "brandId": "antec",
    "description": "Antec Antec NX200M Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 300000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-008",
      "antec",
      "nx200m",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-009",
    "sku": "KC-CAB-009",
    "name": "Cooler Master MasterBox Q300L Cabinet",
    "slug": "cooler-master-masterbox-q300l-cabinet-kc-cab-009",
    "categoryId": "cabinet",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master MasterBox Q300L Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "maxGpuLengthMm": 360,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 430000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-009",
      "cooler",
      "master",
      "masterbox",
      "q300l",
      "cabinet",
      "cooler master"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-010",
    "sku": "KC-CAB-010",
    "name": "Cooler Master Elite 301 Cabinet",
    "slug": "cooler-master-elite-301-cabinet-kc-cab-010",
    "categoryId": "cabinet",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master Elite 301 Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 370000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-010",
      "cooler",
      "master",
      "elite",
      "301",
      "cabinet",
      "cooler master"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-011",
    "sku": "KC-CAB-011",
    "name": "Corsair 3000D Airflow Cabinet",
    "slug": "corsair-3000d-airflow-cabinet-kc-cab-011",
    "categoryId": "cabinet",
    "brandId": "corsair",
    "description": "Corsair Corsair 3000D Airflow Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "maxGpuLengthMm": 360,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 750000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-011",
      "corsair",
      "3000d",
      "airflow",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-012",
    "sku": "KC-CAB-012",
    "name": "Corsair 4000D Airflow Cabinet",
    "slug": "corsair-4000d-airflow-cabinet-kc-cab-012",
    "categoryId": "cabinet",
    "brandId": "corsair",
    "description": "Corsair Corsair 4000D Airflow Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "maxGpuLengthMm": 360,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 890000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-012",
      "corsair",
      "4000d",
      "airflow",
      "cabinet"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cab-013",
    "sku": "KC-CAB-013",
    "name": "Lian Li Lancool 216 Cabinet",
    "slug": "lian-li-lancool-216-cabinet-kc-cab-013",
    "categoryId": "cabinet",
    "brandId": "lian-li",
    "description": "Lian Li Lian Li Lancool 216 Cabinet",
    "specs": {
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ],
      "casePsuIncluded": false,
      "maxGpuLengthMm": 392,
      "color": "Black"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "caseSupportedFormFactors": [
        "ATX",
        "mATX",
        "Mini-ITX"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 950000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "847330"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cab-013",
      "lian",
      "li",
      "lancool",
      "216",
      "cabinet",
      "lian li"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-001",
    "sku": "KC-COOL-001",
    "name": "Generic Intel Stock-Type CPU Fan (LGA1700/1851)",
    "slug": "generic-intel-stock-type-cpu-fan-lga1700-1851-kc-cool-001",
    "categoryId": "cpu-cooler",
    "brandId": "generic",
    "description": "Generic Generic Intel Stock-Type CPU Fan (LGA1700/1851)",
    "specs": {
      "coolerType": "Air (stock-type)",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851"
      ],
      "coolerTdpRatingW": 65
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851"
      ]
    },
    "condition": "new",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 45000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-001",
      "generic",
      "intel",
      "stock",
      "type",
      "cpu",
      "fan",
      "lga1700",
      "1851",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-002",
    "sku": "KC-COOL-002",
    "name": "Generic AMD Stock-Type CPU Fan (AM4/AM5)",
    "slug": "generic-amd-stock-type-cpu-fan-am4-am5-kc-cool-002",
    "categoryId": "cpu-cooler",
    "brandId": "generic",
    "description": "Generic Generic AMD Stock-Type CPU Fan (AM4/AM5)",
    "specs": {
      "coolerType": "Air (stock-type)",
      "coolerSupportedSockets": [
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 65
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 45000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-002",
      "generic",
      "amd",
      "stock",
      "type",
      "cpu",
      "fan",
      "am4",
      "am5",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-003",
    "sku": "KC-COOL-003",
    "name": "Deepcool AG400 Air CPU Cooler",
    "slug": "deepcool-ag400-air-cpu-cooler-kc-cool-003",
    "categoryId": "cpu-cooler",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool AG400 Air CPU Cooler",
    "specs": {
      "coolerType": "Air",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 220
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 190000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-003",
      "deepcool",
      "ag400",
      "air",
      "cpu",
      "cooler",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-004",
    "sku": "KC-COOL-004",
    "name": "Deepcool AK400 Air CPU Cooler",
    "slug": "deepcool-ak400-air-cpu-cooler-kc-cool-004",
    "categoryId": "cpu-cooler",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool AK400 Air CPU Cooler",
    "specs": {
      "coolerType": "Air",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 220
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 250000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-004",
      "deepcool",
      "ak400",
      "air",
      "cpu",
      "cooler",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-005",
    "sku": "KC-COOL-005",
    "name": "Deepcool AK620 Dual-Tower Air CPU Cooler",
    "slug": "deepcool-ak620-dual-tower-air-cpu-cooler-kc-cool-005",
    "categoryId": "cpu-cooler",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool AK620 Dual-Tower Air CPU Cooler",
    "specs": {
      "coolerType": "Air",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 260
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 440000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-005",
      "deepcool",
      "ak620",
      "dual",
      "tower",
      "air",
      "cpu",
      "cooler",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-006",
    "sku": "KC-COOL-006",
    "name": "Cooler Master Hyper 212 Black Air CPU Cooler",
    "slug": "cooler-master-hyper-212-black-air-cpu-cooler-kc-cool-006",
    "categoryId": "cpu-cooler",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master Hyper 212 Black Air CPU Cooler",
    "specs": {
      "coolerType": "Air",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 150
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 280000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-006",
      "cooler",
      "master",
      "hyper",
      "212",
      "black",
      "air",
      "cpu",
      "cooler master",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-007",
    "sku": "KC-COOL-007",
    "name": "Cooler Master V4 Alpha 3DHP 120mm Air CPU Cooler",
    "slug": "cooler-master-v4-alpha-3dhp-120mm-air-cpu-cooler-kc-cool-007",
    "categoryId": "cpu-cooler",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master V4 Alpha 3DHP 120mm Air CPU Cooler",
    "specs": {
      "coolerType": "Air",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 200
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 384000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-007",
      "cooler",
      "master",
      "v4",
      "alpha",
      "3dhp",
      "120mm",
      "air",
      "cpu",
      "cooler master",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-008",
    "sku": "KC-COOL-008",
    "name": "Deepcool LE520 240mm Liquid CPU Cooler",
    "slug": "deepcool-le520-240mm-liquid-cpu-cooler-kc-cool-008",
    "categoryId": "cpu-cooler",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool LE520 240mm Liquid CPU Cooler",
    "specs": {
      "coolerType": "AIO 240mm",
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ],
      "coolerTdpRatingW": 250
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": [],
      "coolerSupportedSockets": [
        "LGA1700",
        "LGA1851",
        "AM4",
        "AM5"
      ]
    },
    "condition": "new",
    "warrantyMonths": 24,
    "pricing": {
      "pricePaise": 550000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-008",
      "deepcool",
      "le520",
      "240mm",
      "liquid",
      "cpu",
      "cooler",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-cool-009",
    "sku": "KC-COOL-009",
    "name": "Thermal Paste (Branded, 4g)",
    "slug": "thermal-paste-branded-4g-kc-cool-009",
    "categoryId": "cpu-cooler",
    "brandId": "generic",
    "description": "Accessory; applies to all CPUs",
    "specs": {
      "coolerType": "Thermal Paste"
    },
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 6,
    "pricing": {
      "pricePaise": 30000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-cool-009",
      "thermal",
      "paste",
      "branded",
      "4g",
      "generic",
      "cpu-cooler"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-fan-001",
    "sku": "KC-FAN-001",
    "name": "Generic 120mm Cabinet Fan (Non-RGB)",
    "slug": "generic-120mm-cabinet-fan-non-rgb-kc-fan-001",
    "categoryId": "cabinet-fan",
    "brandId": "generic",
    "description": "Generic Generic 120mm Cabinet Fan (Non-RGB)",
    "specs": {},
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 25000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-fan-001",
      "generic",
      "120mm",
      "cabinet",
      "fan",
      "non",
      "rgb",
      "cabinet-fan"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-fan-002",
    "sku": "KC-FAN-002",
    "name": "Generic 120mm ARGB Cabinet Fan",
    "slug": "generic-120mm-argb-cabinet-fan-kc-fan-002",
    "categoryId": "cabinet-fan",
    "brandId": "generic",
    "description": "Generic Generic 120mm ARGB Cabinet Fan",
    "specs": {},
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 45000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-fan-002",
      "generic",
      "120mm",
      "argb",
      "cabinet",
      "fan",
      "cabinet-fan"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-fan-003",
    "sku": "KC-FAN-003",
    "name": "Cooler Master MasterFan MF120 Halo 2 PWM ARGB",
    "slug": "cooler-master-masterfan-mf120-halo-2-pwm-argb-kc-fan-003",
    "categoryId": "cabinet-fan",
    "brandId": "cooler-master",
    "description": "Cooler Master Cooler Master MasterFan MF120 Halo 2 PWM ARGB",
    "specs": {},
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 153000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-fan-003",
      "cooler",
      "master",
      "masterfan",
      "mf120",
      "halo",
      "pwm",
      "argb",
      "cooler master",
      "cabinet-fan"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  },
  {
    "id": "kc-fan-004",
    "sku": "KC-FAN-004",
    "name": "Deepcool RF120 ARGB 120mm Cabinet Fan",
    "slug": "deepcool-rf120-argb-120mm-cabinet-fan-kc-fan-004",
    "categoryId": "cabinet-fan",
    "brandId": "deepcool",
    "description": "Deepcool Deepcool RF120 ARGB 120mm Cabinet Fan",
    "specs": {},
    "compat": {
      "deviceType": "desktop",
      "compatibleBrands": [],
      "compatibleModels": []
    },
    "condition": "new",
    "warrantyMonths": 12,
    "pricing": {
      "pricePaise": 80000,
      "priceIncludesGst": true,
      "gstRateBps": 1800,
      "hsnCode": "841459"
    },
    "stock": {
      "status": "in_stock"
    },
    "images": [],
    "isActive": true,
    "searchKeywords": [
      "kc-fan-004",
      "deepcool",
      "rf120",
      "argb",
      "120mm",
      "cabinet",
      "fan",
      "cabinet-fan"
    ],
    "createdAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "updatedAt": {
      "seconds": 1700000000,
      "nanoseconds": 0
    },
    "createdBy": "system"
  }
];
