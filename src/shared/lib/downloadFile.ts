export function downloadFile(file: Blob, filename: string): void {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.append(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}
