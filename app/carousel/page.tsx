// =========================
// app/carousel/page.tsx (PRO FINAL)
// =========================
'use client'

import { useState, useCallback } from 'react'
import { motion, Reorder } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function CarouselManager() {
  const router = useRouter()

  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')

  const MAX_TOTAL_SIZE = 500 * 1024

  const calcTotal = (arr: File[]) => arr.reduce((acc, f) => acc + f.size, 0)

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    handleFiles(Array.from(e.target.files) as File[])
  }

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
    <div className="flex h-screen bg-[#0a0a0a] text-[#ededed]">
      
      {/* Sidebar */}
      <div className="w-20 bg-[#111] flex flex-col items-center py-4 space-y-6 shadow">
        <div
          onClick={() => router.push('/')}
          className="bg-[#631936] text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold cursor-pointer"
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
              className="flex items-center gap-2 bg-[#631936] hover:bg-[#4a1227] text-white px-4 py-2 rounded-xl shadow-lg transition"
            >
              ⬅ Regresar
            </motion.button>

            <div>
              <h1 className="text-2xl font-bold text-[#b38e44]">
                Gestión de Imágenes Médicas
              </h1>

              <p className="text-gray-400 text-sm">
                Sube, organiza y publica imágenes clínicas
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] px-4 py-2 rounded-xl shadow text-sm text-gray-400 border border-[#333]"
          >
            {files.length} archivos cargados
          </motion.div>
        </div>

        {/* Upload */}
        <motion.label
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[#631936] rounded-2xl p-12 flex flex-col items-center cursor-pointer bg-[#111] hover:bg-[#1a1a1a] transition"
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={onInputChange}
          />
          <p className="text-[#b38e44]">Subir imágenes</p>
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
                className="h-40 object-cover rounded-xl border border-[#333]"
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Buttons */}
        <button
          onClick={publishCarousel}
          className="mt-6 bg-[#b38e44] hover:bg-[#8f6f34] text-black px-4 py-2 rounded-lg transition"
        >
          Publicar
        </button>

        <button
          onClick={removeAll}
          className="mt-2 ml-2 border border-[#631936] px-4 py-2 rounded-lg hover:bg-[#631936] hover:text-white transition"
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