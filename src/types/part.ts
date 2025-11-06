export interface Part {
  id: string;
  // Necessary fields
  partName: string;
  partNumber: string;
  description: string;
  quantity: number;
  // Optional fields
  image?: string;
  price?: number;
  localProductName?: string;
  buyingPrice?: number;
  location?: string;
  supplier?: string;
}


