import { Directive, HostBinding, HostListener, Output, EventEmitter } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FileHandle } from "./_model/file-handle.model";

@Directive({
  selector: "[appDrag]",
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter<FileHandle[]>();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    const fileHandles: FileHandle[] = [];

    if (evt.dataTransfer && evt.dataTransfer.files) {
      const files = Array.from(evt.dataTransfer.files); // Convertir FileList a Array
      for (const file of files) {
        const url = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
        fileHandles.push({ file, url });
      }
      this.files.emit(fileHandles); // Emitir el array de FileHandle
    } else {
      console.warn("No files were dropped or dataTransfer is null.");
    }
  }
}
