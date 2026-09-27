import { useState } from 'react'
import { cargarTema, guardarTema, resetTema } from '../lib/tema'

function PanelTemaAdmin() {
  const [tema, setTema] = useState(() => cargarTema())

  const [error, setError] = useState('')

  const cambiar = (campo, valor) => {
    const next = { ...tema, [campo]: valor }
    setTema(next)
    guardarTema(next)
  }

  const handleImagen = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2.5 * 1024 * 1024) {
      setError('La imagen no debe superar 2.5 MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const next = guardarTema({ ...cargarTema(), fondoImagen: ev.target.result })
      setTema(next)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="panel-tema-admin">
      <strong style={{ fontSize: '0.8rem', color: '#1d4ed8', marginRight: 8 }}>Apariencia (solo admin)</strong>
      <label>
        Color de fondo
        <input type="color" value={tema.fondo} onChange={(e) => cambiar('fondo', e.target.value)} />
      </label>
      <label>
        Color del banner
        <input type="color" value={tema.banner} onChange={(e) => cambiar('banner', e.target.value)} />
      </label>
      <label>
        Color de botones
        <input type="color" value={tema.boton} onChange={(e) => cambiar('boton', e.target.value)} />
      </label>
      <label className="btn btn-secondary foto-btn" style={{ margin: 0 }}>
        🖼️ Imagen de fondo
        <input type="file" accept="image/*" hidden onChange={handleImagen} />
      </label>
      {tema.fondoImagen && (
        <>
          <img src={tema.fondoImagen} alt="Fondo" style={{ height: 36, width: 56, objectFit: 'cover', borderRadius: 6 }} />
          <button type="button" className="btn btn-secondary" style={{ width: 'auto', padding: '6px 10px', fontSize: '0.78rem' }} onClick={() => setTema(guardarTema({ ...cargarTema(), fondoImagen: null }))}>
            Quitar imagen
          </button>
        </>
      )}
      <button
        type="button"
        className="btn btn-secondary"
        style={{ width: 'auto', padding: '6px 10px', fontSize: '0.78rem' }}
        onClick={() => setTema(resetTema())}
      >
        Restaurar colores
      </button>
      {error && <span className="master-error">{error}</span>}
    </div>
  )
}

export default PanelTemaAdmin
