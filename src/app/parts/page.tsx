"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PartsTable } from "@/components/parts/parts-table"
import { PartDialog } from "@/components/parts/part-dialog"
import { DeleteConfirmation } from "@/components/parts/delete-confirmation"
import { Part } from "@/types/part"
import { Plus } from "lucide-react"
import { getParts, saveParts, createPart, updatePart, deletePart } from "@/services/parts-service"

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPart, setSelectedPart] = useState<Part | null>(null)
  const [partToDelete, setPartToDelete] = useState<Part | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load parts from service on mount
  useEffect(() => {
    const loadParts = async () => {
      try {
        const loadedParts = await getParts()
        setParts(loadedParts)
      } catch (error) {
        console.error("Error loading parts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadParts()
  }, [])

  // Save parts to service whenever parts change
  useEffect(() => {
    if (!isLoading) {
      saveParts(parts)
    }
  }, [parts, isLoading])

  const handleCreatePart = () => {
    setSelectedPart(null)
    setIsDialogOpen(true)
  }

  const handleEditPart = (part: Part) => {
    setSelectedPart(part)
    setIsDialogOpen(true)
  }

  const handleDeletePart = (part: Part) => {
    setPartToDelete(part)
    setIsDeleteDialogOpen(true)
  }

  const handleSavePart = async (partData: Omit<Part, "id">) => {
    try {
      if (selectedPart) {
        // Update existing part
        const updatedPart = await updatePart(selectedPart.id, partData)
        setParts((prevParts) =>
          prevParts.map((part) =>
            part.id === selectedPart.id ? updatedPart : part
          )
        )
      } else {
        // Create new part
        const newPart = await createPart(partData)
        setParts((prevParts) => [...prevParts, newPart])
      }
      setIsDialogOpen(false)
      setSelectedPart(null)
    } catch (error) {
      console.error("Error saving part:", error)
    }
  }

  const handleConfirmDelete = async () => {
    if (partToDelete) {
      try {
        await deletePart(partToDelete.id)
        setParts((prevParts) =>
          prevParts.filter((part) => part.id !== partToDelete.id)
        )
        setIsDeleteDialogOpen(false)
        setPartToDelete(null)
      } catch (error) {
        console.error("Error deleting part:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Parts Inventory</h1>
            <p className="text-muted-foreground mt-1">
              Manage your automotive parts inventory
            </p>
          </div>
          <Button onClick={handleCreatePart} className="gap-2 w-full sm:w-auto">
            <Plus className="size-4" />
            Add New Part
          </Button>
        </div>

        <PartsTable
          parts={parts}
          onEdit={handleEditPart}
          onDelete={handleDeletePart}
        />

        <PartDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          part={selectedPart}
          onSave={handleSavePart}
        />

        <DeleteConfirmation
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          part={partToDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  )
}
