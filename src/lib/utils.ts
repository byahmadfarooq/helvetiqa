export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function kebabCase(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function wordCount(input: string) {
  const words = input
    .replace(/[\u2019']/g, "'")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
  return words.length;
}

