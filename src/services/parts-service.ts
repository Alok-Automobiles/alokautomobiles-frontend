import { Part } from "@/types/part"
import { mockParts } from "@/mock/parts-data"

const STORAGE_KEY = "alok-automobiles-parts"

/**
 * Parts Service
 * 
 * This service handles data operations for parts.
 * Currently uses mock data and localStorage.
 * 
 * TODO: Replace with API calls when backend is ready:
 * - Replace getParts() with API call
 * - Replace saveParts() with API POST/PUT/DELETE calls
 * - Remove localStorage dependency
 */

/**
 * Get all parts
 * Currently: Loads from localStorage, falls back to mock data if empty
 * Future: Replace with API call like: const response = await fetch('/api/parts')
 */
export const getParts = async (): Promise<Part[]> => {
  // TODO: Replace with API call when backend is ready
  // const response = await fetch('/api/parts')
  // return response.json()
  
  try {
    const storedParts = localStorage.getItem(STORAGE_KEY)
    if (storedParts) {
      const parsed = JSON.parse(storedParts)
      // If localStorage has data, use it (user may have made changes)
      if (parsed.length > 0) {
        return parsed
      }
    }
    // If localStorage is empty, initialize with mock data
    return mockParts
  } catch (error) {
    console.error("Error loading parts:", error)
    // Fallback to mock data on error
    return mockParts
  }
}

/**
 * Save parts to storage
 * Currently: Saves to localStorage
 * Future: Replace with API calls (POST/PUT/DELETE)
 */
export const saveParts = async (parts: Part[]): Promise<void> => {
  // TODO: Replace with API call when backend is ready
  // await fetch('/api/parts', { method: 'POST', body: JSON.stringify(parts) })
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parts))
  } catch (error) {
    console.error("Error saving parts:", error)
  }
}

/**
 * Create a new part
 * Future: Replace with API POST call
 */
export const createPart = async (part: Omit<Part, "id">): Promise<Part> => {
  // TODO: Replace with API call when backend is ready
  // const response = await fetch('/api/parts', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(part)
  // })
  // return response.json()
  
  const newPart: Part = {
    ...part,
    id: crypto.randomUUID(),
  }
  return newPart
}

/**
 * Update an existing part
 * Future: Replace with API PUT call
 */
export const updatePart = async (id: string, part: Omit<Part, "id">): Promise<Part> => {
  // TODO: Replace with API call when backend is ready
  // const response = await fetch(`/api/parts/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(part)
  // })
  // return response.json()
  
  const updatedPart: Part = {
    ...part,
    id,
  }
  return updatedPart
}

/**
 * Delete a part
 * Future: Replace with API DELETE call
 */
export const deletePart = async (id: string): Promise<void> => {
  // TODO: Replace with API call when backend is ready
  // await fetch(`/api/parts/${id}`, { method: 'DELETE' })
}

