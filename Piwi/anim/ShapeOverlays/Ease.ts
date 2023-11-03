export function exponentialIn(t: number): number {
  const result = t === 0.0 ? t : 2.0 ** (10.0 * (t - 1.0));
  return result;
}

export function exponentialOut(t: number): number {
  const result = t === 1.0 ? t : 1.0 - 2.0 ** (-10.0 * t);
  return result;
}

export function exponentialInOut(t: number): number {
  if (t === 0.0 || t === 1.0) {
    return t;
  }
  return t < 0.5
    ? +0.5 * 2.0 ** (20.0 * t - 10.0)
    : -0.5 * 2.0 ** (10.0 - t * 20.0) + 1.0;
}

export function sineOut(t: number): number {
  const HALF_PI = 1.5707963267948966;
  return Math.sin(t * HALF_PI);
}

export function circularInOut(t: number): number {
  const result =
    t < 0.5
      ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
      : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  return result;
}

export function cubicIn(t: number): number {
  return t * t * t;
}

export function cubicOut(t: number): number {
  const f = t - 1.0;
  return f * f * f + 1.0;
}

export function cubicInOut(t: number): number {
  const result = t < 0.5 ? 4.0 * t * t * t : 0.5 * (2.0 * t - 2.0) ** 3.0 + 1.0;
  return result;
}

export function quadraticOut(t: number): number {
  return -t * (t - 2.0);
}

export function quarticOut(t: number): number {
  return (t - 1.0) ** 3.0 * (1.0 - t) + 1.0;
}
