import { FileHandle } from "./file-handle.model";

export interface Product  { 
    productId: number|null,
    productName: string,
    productDescription: string,
    productDiscountedPrice: number|null,
    productActualPrice:number|null,
    productImages: FileHandle[]
  }