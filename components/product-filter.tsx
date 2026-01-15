"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp, LayoutGrid, User, Target, Tag, DollarSign, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export interface FilterState {
  searchQuery: string
  categories: string[]
  skinTypes: string[]
  concerns: string[]
  brands: string[]
  priceRange: [number, number]
  includeIngredients: string[]
  excludeIngredients: string[]
}

interface ProductFilterProps {
  filters?: FilterState
  onFilterChange?: (filters: FilterState) => void
}

const categories = [
  { value: "skincare", label: "Chăm sóc da" },
  { value: "makeup", label: "Trang điểm" },
  { value: "haircare", label: "Chăm sóc tóc" },
  { value: "fragrance", label: "Nước hoa" },
]

const skinTypes = [
  { value: "normal", label: "Da thường" },
  { value: "oily", label: "Da dầu" },
  { value: "dry", label: "Da khô" },
  { value: "combination", label: "Da hỗn hợp" },
  { value: "sensitive", label: "Da nhạy cảm" },
]

const concerns = [
  { value: "acne", label: "Mụn" },
  { value: "darkspots", label: "Thâm nám" },
  { value: "aging", label: "Lão hóa" },
  { value: "dryness", label: "Khô da" },
  { value: "brightening", label: "Làm sáng" },
  { value: "hydrating", label: "Cấp ẩm" },
  { value: "firming", label: "Làm săn chắc" },
  { value: "exfoliation", label: "Tẩy tế bào chết" },
]

const brands = [
  "SkinGlow",
  "SunShield",
  "LipLuxe",
  "ClearSkin",
  "GlowEssence",
  "PerfectFace",
  "LashPro",
  "HairSilk",
  "PureNature",
  "AquaGlow",
  "BeautyBase",
]

export function ProductFilter({ filters: externalFilters, onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>(
    externalFilters || {
      searchQuery: "",
      categories: [],
      skinTypes: [],
      concerns: [],
      brands: [],
      priceRange: [0, 500],
      includeIngredients: [],
      excludeIngredients: [],
    },
  )

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    skinType: true,
    concerns: true,
    brands: true,
    price: true,
    ingredients: false,
  })

  const [ingredientInput, setIngredientInput] = useState("")
  const [excludeInput, setExcludeInput] = useState("")

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)
    updateFilters({ ...filters, categories: newCategories })
  }

  const handleSkinTypeChange = (skinType: string, checked: boolean) => {
    const newSkinTypes = checked ? [...filters.skinTypes, skinType] : filters.skinTypes.filter((s) => s !== skinType)
    updateFilters({ ...filters, skinTypes: newSkinTypes })
  }

  const handleConcernChange = (concern: string, checked: boolean) => {
    const newConcerns = checked ? [...filters.concerns, concern] : filters.concerns.filter((c) => c !== concern)
    updateFilters({ ...filters, concerns: newConcerns })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)
    updateFilters({ ...filters, brands: newBrands })
  }

  const addIncludeIngredient = () => {
    if (ingredientInput.trim()) {
      updateFilters({
        ...filters,
        includeIngredients: [...filters.includeIngredients, ingredientInput.trim()],
      })
      setIngredientInput("")
    }
  }

  const addExcludeIngredient = () => {
    if (excludeInput.trim()) {
      updateFilters({
        ...filters,
        excludeIngredients: [...filters.excludeIngredients, excludeInput.trim()],
      })
      setExcludeInput("")
    }
  }

  const removeIncludeIngredient = (ingredient: string) => {
    updateFilters({
      ...filters,
      includeIngredients: filters.includeIngredients.filter((i) => i !== ingredient),
    })
  }

  const removeExcludeIngredient = (ingredient: string) => {
    updateFilters({
      ...filters,
      excludeIngredients: filters.excludeIngredients.filter((i) => i !== ingredient),
    })
  }

  const clearAllFilters = () => {
    const emptyFilters = {
      searchQuery: "",
      categories: [],
      skinTypes: [],
      concerns: [],
      brands: [],
      priceRange: [0, 500] as [number, number],
      includeIngredients: [],
      excludeIngredients: [],
    }
    updateFilters(emptyFilters)
  }

  const activeFilterCount =
    filters.categories.length +
    filters.skinTypes.length +
    filters.concerns.length +
    filters.brands.length +
    filters.includeIngredients.length +
    filters.excludeIngredients.length

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold">Bộ lọc</h2>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary">
            Xóa tất cả ({activeFilterCount})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <button onClick={() => toggleSection("category")} className="flex w-full items-center justify-between py-2">
            <span className="flex items-center gap-2 text-sm text-foreground font-semibold">
              <LayoutGrid className="h-4 w-4 text-primary" />
              Danh mục
            </span>
            {expandedSections.category ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.category && (
            <div className="space-y-3 pt-2">
              {categories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={filters.categories.includes(category.value)}
                    onCheckedChange={(checked) => handleCategoryChange(category.value, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.value}`} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div>
          <button onClick={() => toggleSection("skinType")} className="flex w-full items-center justify-between py-2">
            <span className="flex items-center gap-2 font-medium text-sm text-foreground">
              <User className="h-4 w-4 text-primary" />
              Loại da
            </span>
            {expandedSections.skinType ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.skinType && (
            <div className="space-y-3 pt-2">
              {skinTypes.map((skinType) => (
                <div key={skinType.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skin-${skinType.value}`}
                    checked={filters.skinTypes.includes(skinType.value)}
                    onCheckedChange={(checked) => handleSkinTypeChange(skinType.value, checked as boolean)}
                  />
                  <Label htmlFor={`skin-${skinType.value}`} className="text-sm font-normal cursor-pointer">
                    {skinType.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div>
          <button onClick={() => toggleSection("concerns")} className="flex w-full items-center justify-between py-2">
            <span className="flex items-center gap-2 font-medium text-sm text-foreground">
              <Target className="h-4 w-4 text-primary" />
              Mối quan tâm
            </span>
            {expandedSections.concerns ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.concerns && (
            <div className="space-y-3 pt-2">
              {concerns.map((concern) => (
                <div key={concern.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`concern-${concern.value}`}
                    checked={filters.concerns.includes(concern.value)}
                    onCheckedChange={(checked) => handleConcernChange(concern.value, checked as boolean)}
                  />
                  <Label htmlFor={`concern-${concern.value}`} className="text-sm font-normal cursor-pointer">
                    {concern.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div>
          <button onClick={() => toggleSection("brands")} className="flex w-full items-center justify-between py-2">
            <span className="flex items-center gap-2 font-medium text-sm text-foreground">
              <Tag className="h-4 w-4 text-primary" />
              Thương hiệu
            </span>
            {expandedSections.brands ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.brands && (
            <div className="space-y-3 pt-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div>
          <button onClick={() => toggleSection("price")} className="flex w-full items-center justify-between py-2">
            <span className="flex items-center gap-2 font-medium text-sm text-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              Khoảng giá
            </span>
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.price && (
            <div className="space-y-4 pt-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ ...filters, priceRange: value as [number, number] })}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{filters.priceRange[0]}k VNĐ</span>
                <span>{filters.priceRange[1]}k VNĐ</span>
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <button
            onClick={() => toggleSection("ingredients")}
            className="flex w-full items-center justify-between py-2"
          >
            <span className="flex items-center gap-2 font-medium text-sm text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Thành phần
            </span>
            {expandedSections.ingredients ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.ingredients && (
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Phải chứa</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="VD: Vitamin C"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addIncludeIngredient()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={addIncludeIngredient}>
                    Thêm
                  </Button>
                </div>
                {filters.includeIngredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.includeIngredients.map((ingredient) => (
                      <Badge key={ingredient} variant="secondary" className="gap-1">
                        {ingredient}
                        <button onClick={() => removeIncludeIngredient(ingredient)} className="hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Không chứa</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="VD: Cồn, Paraben"
                    value={excludeInput}
                    onChange={(e) => setExcludeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addExcludeIngredient()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={addExcludeIngredient}>
                    Thêm
                  </Button>
                </div>
                {filters.excludeIngredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.excludeIngredients.map((ingredient) => (
                      <Badge key={ingredient} variant="destructive" className="gap-1">
                        {ingredient}
                        <button onClick={() => removeExcludeIngredient(ingredient)} className="hover:opacity-80">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
