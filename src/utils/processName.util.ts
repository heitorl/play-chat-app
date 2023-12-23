export function processName(name: string): string {
  const n = name?.split(" ");

  if (n.length >= 2) {
    return `${n[0]} ${n[1]}`;
  }

  const match = name.match(/^([a-zA-Z\s]+)(?:@|.|$)/);

  if (match) {
    return match[1];
  }
  return name;
}
