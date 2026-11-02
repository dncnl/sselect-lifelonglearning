// Asset URLs resolve differently in the Vite site and in the Remotion renderer.
let resolver: (p: string) => string = (p) => `./${p}`;

export function setAssetResolver(fn: (p: string) => string) {
  resolver = fn;
}

/** p is relative to /public, e.g. "assets/logo.png" */
export function asset(p: string) {
  return resolver(p);
}
