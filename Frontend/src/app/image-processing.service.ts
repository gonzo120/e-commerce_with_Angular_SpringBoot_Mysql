import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const productImages: any[] = product.productImages;

    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      let finalFileHandle: FileHandle;

      // Verificar si window está disponible
      if (typeof window !== 'undefined') {
        finalFileHandle = {
          file: imageFile,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        };
      } else {
        // Manejar el caso en que window no esté disponible
        finalFileHandle = {
          file: imageFile,
          url: this.sanitizer.bypassSecurityTrustUrl('')
        };
      }

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;

  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    // Verificar si window está disponible
    if (typeof window !== 'undefined') {
      const byteString = window.atob(picBytes);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([int8Array], { type: imageType });
      return blob;
    } else {
      throw new Error('`window` is not available in this environment!');
    }
  }
}
