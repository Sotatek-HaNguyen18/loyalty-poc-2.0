const pad = (value: number, length: number) =>
  String(value).padStart(length, "0");

export function randomDigits(length: number): string {
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

export function dateStampYmd(): string {
  const now = new Date();
  return `${now.getFullYear()}${pad(now.getMonth() + 1, 2)}${pad(now.getDate(), 2)}`;
}

export function currentYear(): string {
  return String(new Date().getFullYear());
}

/** Compact unique suffix for codes and file names (time + random). */
export function uniqueSuffix(randomLength = 4): string {
  const timePart = Date.now().toString(36).toUpperCase();
  return `${timePart}${randomDigits(randomLength)}`;
}

export function demoPdfName(slug: string, suffix: string): string {
  return `${slug}-${suffix}.pdf`;
}

export function randomSerialLines(
  prefix: string,
  year: string,
  count: number,
): string {
  return Array.from({ length: count }, () => {
    const serial = randomDigits(8);
    return `${prefix}-${year}-${serial}`;
  }).join("\n");
}
