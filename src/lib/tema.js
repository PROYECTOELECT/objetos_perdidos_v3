const TEMA_KEY = 'tema_plataforma_v1'

export const TEMA_DEFAULT = {
  fondo: '#9ca3af',
  banner: '#eff6ff',
  boton: '#3b82f6',
  botonTexto: '#ffffff',
  fondoImagen: null
}

export function cargarTema() {
  try {
    return { ...TEMA_DEFAULT, ...(JSON.parse(localStorage.getItem(TEMA_KEY) || '{}')) }
  } catch {
    return { ...TEMA_DEFAULT }
  }
}

export function guardarTema(tema) {
  const t = { ...TEMA_DEFAULT, ...tema }
  localStorage.setItem(TEMA_KEY, JSON.stringify(t))
  aplicarTema(t)
  return t
}

export function aplicarTema(tema) {
  const t = { ...TEMA_DEFAULT, ...tema }
  const root = document.documentElement
  root.style.setProperty('--color-fondo', t.fondo)
  root.style.setProperty('--color-banner', t.banner)
  root.style.setProperty('--color-boton', t.boton)
  root.style.setProperty('--color-boton-texto', t.botonTexto || '#ffffff')
  if (t.fondoImagen) {
    root.style.setProperty('--fondo-imagen', `url("${t.fondoImagen}")`)
    document.body.style.backgroundImage = `linear-gradient(rgba(15,23,42,0.35), rgba(15,23,42,0.25)), url("${t.fondoImagen}")`
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundPosition = 'center'
  } else {
    root.style.setProperty('--fondo-imagen', 'none')
    document.body.style.backgroundImage = ''
    document.body.style.backgroundSize = ''
    document.body.style.backgroundAttachment = ''
    document.body.style.backgroundPosition = ''
  }
}

export function resetTema() {
  return guardarTema({ ...TEMA_DEFAULT })
}
