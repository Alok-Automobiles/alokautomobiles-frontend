"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Part } from "@/types/part"

interface PartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  part: Part | null
  onSave: (part: Omit<Part, "id">) => void
}

export function PartDialog({ open, onOpenChange, part, onSave }: PartDialogProps) {
  const [formData, setFormData] = useState<Omit<Part, "id">>({
    partName: "",
    partNumber: "",
    description: "",
    quantity: 0,
    image: "",
    price: undefined,
    localProductName: "",
    buyingPrice: undefined,
    location: "",
    supplier: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (part) {
      setFormData({
        partName: part.partName || "",
        partNumber: part.partNumber || "",
        description: part.description || "",
        quantity: part.quantity || 0,
        image: part.image || "",
        price: part.price,
        localProductName: part.localProductName || "",
        buyingPrice: part.buyingPrice,
        location: part.location || "",
        supplier: part.supplier || "",
      })
    } else {
      setFormData({
        partName: "",
        partNumber: "",
        description: "",
        quantity: 0,
        image: "",
        price: undefined,
        localProductName: "",
        buyingPrice: undefined,
        location: "",
        supplier: "",
      })
    }
    setErrors({})
  }, [part, open])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.partName.trim()) {
      newErrors.partName = "Part name is required"
    }
    if (!formData.partNumber.trim()) {
      newErrors.partNumber = "Part number is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (formData.quantity < 0) {
      newErrors.quantity = "Quantity must be 0 or greater"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onOpenChange(false)
    }
  }

  const handleChange = (
    field: keyof typeof formData,
    value: string | number | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === "" ? undefined : value,
    }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{part ? "Edit Part" : "Create New Part"}</DialogTitle>
          <DialogDescription>
            {part
              ? "Update the part information below."
              : "Fill in the details to add a new part to the inventory."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partName">
                  Part Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="partName"
                  value={formData.partName}
                  onChange={(e) => handleChange("partName", e.target.value)}
                  aria-invalid={!!errors.partName}
                />
                {errors.partName && (
                  <p className="text-sm text-destructive">{errors.partName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partNumber">
                  Part Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="partNumber"
                  value={formData.partNumber}
                  onChange={(e) => handleChange("partNumber", e.target.value)}
                  aria-invalid={!!errors.partNumber}
                />
                {errors.partNumber && (
                  <p className="text-sm text-destructive">{errors.partNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleChange("quantity", parseInt(e.target.value) || 0)
                  }
                  aria-invalid={!!errors.quantity}
                />
                {errors.quantity && (
                  <p className="text-sm text-destructive">{errors.quantity}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image || ""}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={(e) =>
                    handleChange(
                      "price",
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyingPrice">Buying Price</Label>
                <Input
                  id="buyingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.buyingPrice || ""}
                  onChange={(e) =>
                    handleChange(
                      "buyingPrice",
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="localProductName">Local Product Name</Label>
              <Input
                id="localProductName"
                value={formData.localProductName || ""}
                onChange={(e) => handleChange("localProductName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={formData.supplier || ""}
                  onChange={(e) => handleChange("supplier", e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{part ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

