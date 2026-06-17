declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'medium-zoom' {
  interface MediumZoomOptions {
    background?: string
    margin?: number
    scrollOffset?: number
    container?: string | HTMLElement | object
    template?: string | HTMLElement
  }

  interface MediumZoom {
    detach(): void
    open(options?: MediumZoomOptions): void
    close(): void
    attach(...selectors: (string | HTMLElement | NodeList | HTMLElement[])[]): MediumZoom
    update(options: MediumZoomOptions): void
  }

  function mediumZoom(
    selector?: string | HTMLElement | NodeList | HTMLElement[],
    options?: MediumZoomOptions
  ): MediumZoom

  export default mediumZoom
}
