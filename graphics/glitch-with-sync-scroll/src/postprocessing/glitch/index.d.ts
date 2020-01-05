export as namespace GlitchFilter;

export class GlitchFilter {
  constructor(options?: GlitchOptions);
  slices: number;
  offset: number;
  direction: number;
  fillMode: number;
  seed: number;
  red: Point;
  green: Point;
  blue: Point;
  sizes: Float32Array | number[];
  offsets: Float32Array | number[];
  refresh(): void;
  shuffle(): void;
  redraw(): void;
}
export interface GlitchOptions {
  slices: number;
  offset: number;
  direction: number;
  fillMode: number;
  average: boolean;
  seed: number;
  red: Point;
  green: Point;
  blue: Point;
  minSize: number;
  sampleSize: number;
}
export interface Point {
  x: number;
  y: number;
}
