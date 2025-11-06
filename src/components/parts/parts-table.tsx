"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Part } from "@/types/part"
import { Pencil, Trash2, MoreVertical, ArrowUpDown, Search } from "lucide-react"

interface PartsTableProps {
  parts: Part[]
  onEdit: (part: Part) => void
  onDelete: (part: Part) => void
}

type SortField = "partName" | "partNumber" | "quantity" | "price" | "supplier"
type SortDirection = "asc" | "desc"

export function PartsTable({ parts, onEdit, onDelete }: PartsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredAndSortedParts = useMemo(() => {
    let filtered = parts.filter(
      (part) =>
        part.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: string | number | undefined = a[sortField]
        let bValue: string | number | undefined = b[sortField]

        if (aValue === undefined) aValue = ""
        if (bValue === undefined) bValue = ""

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        }

        return 0
      })
    }

    return filtered
  }, [parts, searchQuery, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getQuantityBadgeVariant = (quantity: number) => {
    if (quantity === 0) return "destructive"
    if (quantity < 10) return "secondary"
    return "default"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Search by part name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredAndSortedParts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? (
            <p>No parts found matching your search.</p>
          ) : (
            <p>No parts in inventory. Create your first part to get started.</p>
          )}
        </div>
      ) : (
        <div className="border rounded-lg overflow-x-auto">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleSort("partName")}
                  >
                    Part Name
                    {sortField === "partName" && (
                      <ArrowUpDown className="size-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleSort("partNumber")}
                  >
                    Part Number
                    {sortField === "partNumber" && (
                      <ArrowUpDown className="size-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleSort("quantity")}
                  >
                    Quantity
                    {sortField === "quantity" && (
                      <ArrowUpDown className="size-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    {sortField === "price" && (
                      <ArrowUpDown className="size-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Local Product Name</TableHead>
                <TableHead>Buying Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleSort("supplier")}
                  >
                    Supplier
                    {sortField === "supplier" && (
                      <ArrowUpDown className="size-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="w-[70px] sticky right-0 bg-background">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedParts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="w-[100px]">
                    {part.image ? (
                      <div className="relative size-16 rounded-md overflow-hidden border">
                        <Image
                          src={part.image}
                          alt={part.partName}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized
                          onError={() => {
                            // Image will fallback to unoptimized or show broken image
                          }}
                        />
                      </div>
                    ) : (
                      <div className="size-16 rounded-md border bg-muted flex items-center justify-center text-xs text-muted-foreground p-1">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium min-w-[150px]">
                    {part.partName}
                  </TableCell>
                  <TableCell className="font-mono text-sm min-w-[120px]">
                    {part.partNumber}
                  </TableCell>
                  <TableCell className="max-w-xs min-w-[200px] truncate">
                    {part.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getQuantityBadgeVariant(part.quantity)}>
                      {part.quantity}
                    </Badge>
                    {part.quantity < 10 && part.quantity > 0 && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        (Low Stock)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="min-w-[100px]">
                    {part.price !== undefined
                      ? `$${part.price.toFixed(2)}`
                      : "-"}
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    {part.localProductName || "-"}
                  </TableCell>
                  <TableCell className="min-w-[100px]">
                    {part.buyingPrice !== undefined
                      ? `$${part.buyingPrice.toFixed(2)}`
                      : "-"}
                  </TableCell>
                  <TableCell className="min-w-[120px]">
                    {part.location || "-"}
                  </TableCell>
                  <TableCell className="min-w-[120px]">
                    {part.supplier || "-"}
                  </TableCell>
                  <TableCell className="sticky right-0 bg-background">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(part)}>
                          <Pencil className="mr-2 size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(part)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredAndSortedParts.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedParts.length} of {parts.length} parts
          {searchQuery && ` (filtered)`}
        </div>
      )}
    </div>
  )
}

