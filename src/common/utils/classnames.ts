export function classnames(obj: Record<string, boolean>): string {
  // Naive implementation as this does several loops
  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key, _]) => key)
    .join(' ');
}
