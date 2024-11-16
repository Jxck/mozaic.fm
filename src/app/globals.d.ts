export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_URL: string;
      NEXT_PUBLIC_R2_URL: string;
    }
  }
}
