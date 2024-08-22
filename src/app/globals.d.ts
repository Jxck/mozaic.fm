declare module "node:process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_PODCAST_CONTENT_URL: string;
      }
    }
  }
}
