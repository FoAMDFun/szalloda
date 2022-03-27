export class FileUpload {
  public key?: string;
  public name?: string;
  public url?: string;
  public file: File;
  constructor(file: File) {
    this.file = file;
  }
}
