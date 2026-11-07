"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { Product, Category, AttributeDefinition, CompatibilityRule, TaxSettings } from '@/lib/db/types';
import type { DeviceContext, CompatResult } from '@/lib/compat/types';
import { evaluateProductCompatibility, validateCartConflicts } from '@/lib/compat/engine';
import { calculateTotals, type LineItem } from '@/lib/pricing/calculator';

export interface CartItem {
  product: Product;
  qty: number;
}

interface QuoteContextValue {
  cart: CartItem[];
  deviceContext: DeviceContext;
  setDeviceContext: React.Dispatch<React.SetStateAction<DeviceContext>>;
  addToQuote: (product: Product, qty?: number) => void;
  removeFromQuote: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearQuote: () => void;
  showIncompatible: boolean;
  setShowIncompatible: (show: boolean) => void;
  customerStateCode: number;
  setCustomerStateCode: (code: number) => void;
  getCompatibility: (candidate: Product) => CompatResult;
  cartConflicts: string[];
  totals: ReturnType<typeof calculateTotals>;
  categories: Category[];
  attributes: AttributeDefinition[];
  rules: CompatibilityRule[];
  taxSettings: TaxSettings;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({
  children,
  initialCategories,
  initialAttributes,
  initialRules,
  initialTaxSettings,
}: {
  children: React.ReactNode;
  initialCategories: Category[];
  initialAttributes: AttributeDefinition[];
  initialRules: CompatibilityRule[];
  initialTaxSettings: TaxSettings;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deviceContext, setDeviceContext] = useState<DeviceContext>({});
  const [showIncompatible, setShowIncompatible] = useState<boolean>(false);
  const [customerStateCode, setCustomerStateCode] = useState<number>(initialTaxSettings.shopStateCode || 24);

  // Load cart from sessionStorage on client mount
  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem('konark_quote_cart');
      const savedContext = sessionStorage.getItem('konark_device_context');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedContext) setDeviceContext(JSON.parse(savedContext));
    } catch {}
  }, []);

  // Save cart to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('konark_quote_cart', JSON.stringify(cart));
      sessionStorage.setItem('konark_device_context', JSON.stringify(deviceContext));
    } catch {}
  }, [cart, deviceContext]);

  const addToQuote = (product: Product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromQuote = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromQuote(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty: Math.min(100, qty) } : i))
    );
  };

  const clearQuote = () => {
    setCart([]);
  };

  // Convert for compatibility engine
  const compatCart = useMemo(() => {
    return cart.map((i) => ({
      product: {
        id: i.product.id,
        name: i.product.name,
        categoryId: i.product.categoryId,
        brandId: i.product.brandId,
        brandName: i.product.brandId,
        specs: i.product.specs,
        compat: i.product.compat,
        condition: i.product.condition,
      },
      qty: i.qty,
    }));
  }, [cart]);

  const getCompatibility = (candidate: Product): CompatResult => {
    const candidateCompat = {
      id: candidate.id,
      name: candidate.name,
      categoryId: candidate.categoryId,
      brandId: candidate.brandId,
      brandName: candidate.brandId,
      specs: candidate.specs,
      compat: candidate.compat,
      condition: candidate.condition,
    };

    return evaluateProductCompatibility({
      cart: compatCart,
      candidate: candidateCompat,
      categories: initialCategories,
      attributes: initialAttributes,
      rules: initialRules,
      deviceContext,
    });
  };

  const cartConflicts = useMemo(() => {
    const res = validateCartConflicts(compatCart, initialCategories, initialAttributes, initialRules);
    return res.warnings;
  }, [compatCart, initialCategories, initialAttributes, initialRules]);

  // Live Pricing Totals
  const totals = useMemo(() => {
    const lineItems: LineItem[] = cart.map((i) => ({
      productId: i.product.id,
      qty: i.qty,
      unitPricePaise: i.product.pricing.pricePaise,
      priceIncludesGst: i.product.pricing.priceIncludesGst,
      gstRateBps: i.product.pricing.gstRateBps,
      hsnCode: i.product.pricing.hsnCode,
    }));

    return calculateTotals(lineItems, {
      shopStateCode: initialTaxSettings.shopStateCode || 24,
      customerStateCode,
      roundOff: initialTaxSettings.roundOff,
    });
  }, [cart, customerStateCode, initialTaxSettings]);

  return (
    <QuoteContext.Provider
      value={{
        cart,
        deviceContext,
        setDeviceContext,
        addToQuote,
        removeFromQuote,
        updateQty,
        clearQuote,
        showIncompatible,
        setShowIncompatible,
        customerStateCode,
        setCustomerStateCode,
        getCompatibility,
        cartConflicts,
        totals,
        categories: initialCategories,
        attributes: initialAttributes,
        rules: initialRules,
        taxSettings: initialTaxSettings,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return ctx;
}

