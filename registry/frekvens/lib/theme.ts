/** Pone el tema en <html>. 'auto' sigue al sistema y escucha sus cambios. */
let mq: MediaQueryList | null = null, fn: (() => void) | null = null
export function applyTheme(mode: 'light' | 'dark' | 'auto', root: HTMLElement = document.documentElement) {
  if (typeof document === 'undefined') return
  if (mq && fn) { mq.removeEventListener('change', fn); mq = null; fn = null }
  if (mode === 'auto') {
    mq = window.matchMedia('(prefers-color-scheme: dark)')
    fn = () => root.setAttribute('data-theme', mq!.matches ? 'dark' : 'light')
    fn(); mq.addEventListener('change', fn); return
  }
  root.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light')
}
