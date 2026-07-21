export {};

declare global {
  interface NodeRequire {
    context(
      path: string,
      recursive?: boolean,
      match?: RegExp
    ): {
      keys(): string[];
      (id: string): string;
    };
  }
}