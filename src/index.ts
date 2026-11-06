export interface Readability {
  readonly words: number;
  readonly sentences: number;
  readonly syllables: number;
  readonly readingEase: number;
  readonly gradeLevel: number;
}
function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const groups = w.match(/[aeiouy]+/g)?.length ?? 1;
  const silent = /e$/.test(w) && !/le$/.test(w);
  return Math.max(1, groups - (silent ? 1 : 0));
}
export function analyzeReadability(text: string): Readability {
  if (typeof text !== 'string' || text.length > 1000000)
    throw new TypeError('Expected bounded text');
  const words = text.match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g) ?? [],
    sentences = (text.match(/[.!?]+(?:["')\]]*)?(?=\s|$)/g) ?? []).length;
  if (!words.length) return { words: 0, sentences: 0, syllables: 0, readingEase: 0, gradeLevel: 0 };
  const s = Math.max(1, sentences),
    sy = words.reduce((n, w) => n + syllables(w), 0),
    w = words.length;
  return {
    words: w,
    sentences,
    syllables: sy,
    readingEase: 206.835 - 1.015 * (w / s) - 84.6 * (sy / w),
    gradeLevel: 0.39 * (w / s) + 11.8 * (sy / w) - 15.59,
  };
}
