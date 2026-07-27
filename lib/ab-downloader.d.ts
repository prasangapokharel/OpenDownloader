declare module "ab-downloader" {
  export function aio(url: string): Promise<Record<string, unknown>>
  export function fbdown(url: string): Promise<Record<string, unknown>>
  export function igdl(url: string): Promise<Record<string, unknown>[] | Record<string, unknown>>
  export function ttdl(url: string): Promise<Record<string, unknown>>
  export function twitter(url: string): Promise<Record<string, unknown>>
  export function youtube(url: string): Promise<Record<string, unknown>>
  export function mediafire(url: string): Promise<Record<string, unknown>>
  export function capcut(url: string): Promise<Record<string, unknown>>
  export function gdrive(url: string): Promise<Record<string, unknown>>
  export function pinterest(url: string): Promise<Record<string, unknown>>
}
