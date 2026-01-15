"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./product-data"

interface ComparisonStore {
  products: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  clearAll: () => void
  isInComparison: (productId: string) => boolean
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const current = get().products
        if (current.length >= 3) {
          return // Max 3 products
        }
        if (!current.find((p) => p.id === product.id)) {
          set({ products: [...current, product] })
        }
      },
      removeProduct: (productId) => {
        set({ products: get().products.filter((p) => p.id !== productId) })
      },
      clearAll: () => set({ products: [] }),
      isInComparison: (productId) => {
        return get().products.some((p) => p.id === productId)
      },
    }),
    {
      name: "beauty-comparison",
    },
  ),
)
