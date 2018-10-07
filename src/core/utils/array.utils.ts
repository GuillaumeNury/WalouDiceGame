export function replaceItem<T>(array: T[], oldItem: T, newItem: T): T[] {
  return array.map(i => (i === oldItem ? newItem : i));
}
