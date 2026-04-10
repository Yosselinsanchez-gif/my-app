// =========================
// app/carousel/page.tsx (CORREGIDO)
// =========================
'use client'

import { useState, useCallback } from 'react'
import { motion, Reorder } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function CarouselManager() {
  const router = useRouter()

  // ✅ TIPADO CORRECTO
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')

  const MAX_TOTAL_SIZE = 500 * 1024

  // ✅ TIPADO
  const calcTotal = (arr: File[]) => arr.reduce((acc, f) => acc + f.size, 0)

  // ✅ TIPADO
  const handleFiles = (selected: File[]) => {
    const merged = [...files, ...selected]
    const totalSize = calcTotal(merged)

    if (totalSize > MAX_TOTAL_SIZE) {
      setError(`Tamaño total: ${(totalSize / 1024).toFixed(1)} KB / 500 KB límite`)
      return
    }

    setError('')
    setFiles(merged)
  }

  // ✅ TIPADO EVENTO
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    handleFiles(Array.from(e.target.files) as File[])
  }

  // ✅ TIPADO DRAG EVENT
  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files) as File[]
    handleFiles(dropped)
  }, [files])

  const removeAll = () => {
    setFiles([])
    setError('')
  }

  const publishCarousel = () => {
    if (files.length === 0 || error) return

    const data = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }))

    localStorage.setItem('carousel', JSON.stringify(data))
    router.push('/')
  }

  const totalSize = calcTotal(files)

  return (
    <div className="flex h-screen bg-[#f6f7fb]">
      {/* Sidebar */}
      <div className="w-20 bg-white flex flex-col items-center py-4 space-y-6 shadow-sm">
        <div
          onClick={() => router.push('/')}
          className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold cursor-pointer"
        >
          M
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg"
            >
              ⬅ Regresar
            </motion.button>

            <div>
              <h1 className="text-2xl font-bold">Gestor de Carrusel</h1>
              <p className="text-gray-500 text-sm">
                Sube, organiza y publica imágenes
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-500"
          >
            {files.length} archivos cargados
          </motion.div>
        </div>

        {/* Upload */}
        <motion.label
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed rounded-2xl p-12 flex flex-col items-center cursor-pointer bg-white"
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={onInputChange}
          />
          <p>Subir imágenes</p>
        </motion.label>

        {/* Preview */}
        <Reorder.Group
          axis="x"
          values={files}
          onReorder={setFiles}
          className="grid grid-cols-3 gap-6 mt-6"
        >
          {files.map((file, i) => (
            <Reorder.Item key={i} value={file}>
              <img
                src={URL.createObjectURL(file)}
                className="h-40 object-cover rounded-xl"
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Buttons */}
        <button
          onClick={publishCarousel}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Publicar
        </button>

        <button
          onClick={removeAll}
          className="mt-2 ml-2 border px-4 py-2 rounded-lg"
        >
          Limpiar
        </button>

        {/* Info */}
        {files.length > 0 && !error && (
          <p className="text-sm text-gray-400 mt-3">
            Tamaño total: {(totalSize / 1024).toFixed(1)} KB / 500 KB
          </p>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}