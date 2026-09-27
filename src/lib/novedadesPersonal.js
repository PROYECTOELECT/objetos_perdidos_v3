const KEY = 'novedades_personal_v1'

export const TIPOS_NOVEDAD = [
  { key: 'incapacidad', label: 'Incapacidad', color: '#dc2626' },
  { key: 'ausencia', label: 'Ausencia laboral', color: '#ea580c' },
  { key: 'informes', label: 'Informes', color: '#2563eb' },
  { key: 'recomendaciones', label: 'Recomendaciones', color: '#16a34a' },
  { key: 'calamidad', label: 'Calamidad', color: '#7c3aed' },
  { key: 'otros', label: 'Otros', color: '#6b7280' },
  { key: 'observaciones', label: 'Observaciones', color: '#0891b2' }
]

export function listarNovedadesPersonal() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function guardar(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista))
}

export function crearNovedadPersonal({ user, tipo, texto, archivos = [], autorId, autorNombre }) {
  if (!user) throw new Error('Selecciona un usuario')
  if (!texto?.trim()) throw new Error('Escribe la observación')
  const item = {
    id: crypto.randomUUID?.() || String(Date.now()),
    userId: user.id,
    nombre: user.nombre,
    cedula: user.cedula,
    cargo: user.cargo || '',
    foto: user.foto || '',
    masterNombre: user.masterNombre || '',
    tipo,
    texto: texto.trim(),
    archivos,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5),
    autorId: autorId || null,
    autorNombre: autorNombre || '',
    creadoEn: new Date().toISOString()
  }
  const lista = listarNovedadesPersonal()
  lista.unshift(item)
  guardar(lista)
  return item
}

export function eliminarNovedadPersonal(id) {
  guardar(listarNovedadesPersonal().filter((n) => n.id !== id))
}

export function filtrarNovedades({ userId, desde, hasta, masterId } = {}) {
  return listarNovedadesPersonal().filter((n) => {
    if (userId && String(n.userId) !== String(userId)) return false
    if (desde && n.fecha < desde) return false
    if (hasta && n.fecha > hasta) return false
    return true
  })
}

export function contarPorTipo(lista) {
  const base = {}
  TIPOS_NOVEDAD.forEach((t) => { base[t.key] = 0 })
  lista.forEach((n) => {
    if (base[n.tipo] != null) base[n.tipo]++
    else base.otros++
  })
  return base
}
