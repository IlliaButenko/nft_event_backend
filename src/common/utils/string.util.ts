export function getFileExtension(filename: string): string {
  const lastIndex = filename.lastIndexOf('.');
  return lastIndex < 1 ? '' : filename.substr(lastIndex);
}
