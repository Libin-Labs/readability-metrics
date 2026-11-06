import * as api from '@lp-labs/readability-metrics';
import { analyzeReadability } from '@lp-labs/readability-metrics';
const result = analyzeReadability('Clear words help people read.');
if (result.words === 0 || !Number.isFinite(result.readingEase)) throw new Error('Analysis failed');
// @ts-expect-error invalid argument must be rejected by declarations
api.analyzeReadability(42);
