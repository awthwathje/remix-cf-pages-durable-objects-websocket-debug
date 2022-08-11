export interface Env {
  readonly ENV: {
    readonly WEBSOCKET_URL: string
  }
}

export type WindowWithEnv = Window & typeof globalThis & Env
