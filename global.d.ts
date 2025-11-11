// src/global.d.ts
export {};

declare global {
  interface Window {
    successTimer?: ReturnType<typeof setTimeout>;
  }
}
