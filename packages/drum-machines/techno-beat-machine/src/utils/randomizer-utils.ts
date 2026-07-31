export function pickOneOf<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function randRangeF(lo: number, hi: number): number {
  return lo + Math.random() * (hi - lo);
}

export function randRangeI(lo: number, hi: number) {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

export function probably(p: number): boolean {
  return Math.random() < p;
}

export function probablyChoose<T>(p: number, a: T, b: T): T {
  return Math.random() < p ? a : b;
}

export function prioritize<T>(args: ([number, T] | T)[]): T {
  const rr = Math.random();
  let pos = 0;
  for (let i = 0; i < args.length; i++) {
    const item = args[i];
    if (Array.isArray(item)) {
      const [prob, value] = item;
      pos += prob;
      if (rr < pos) {
        return value;
      }
    } else {
      return item;
    }
  }
  const lastItem = args[args.length - 1];
  return Array.isArray(lastItem) ? lastItem[1] : lastItem;
}
