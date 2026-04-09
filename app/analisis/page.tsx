


// =========================
// app/analisis/page.tsx (DASHBOARD PRO)
// =========================
'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function AnalisisPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analíticas de Salud Pública</h1>
          <p className="text-gray-500 text-sm">Métricas e insights de salud poblacional</p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="bg-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          ⬅ Volver
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <p className="text-gray-500 text-sm">Total Pacientes</p>
          <h2 className="text-3xl font-bold">269</h2>
          <span className="text-green-500 text-sm">+12% desde el mes pasado</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <p className="text-gray-500 text-sm">IMC Promedio</p>
          <h2 className="text-3xl font-bold">24.7</h2>
          <span className="text-gray-500 text-sm">Rango normal</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <p className="text-gray-500 text-sm">Consultas Hoy</p>
          <h2 className="text-3xl font-bold">18</h2>
          <span className="text-orange-500 text-sm">4 pendientes</span>
        </motion.div>

      </div>

      {/* Extra Section */}
      <div className="mt-10 grid grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="font-semibold mb-2">Resumen General</h3>
          <p className="text-gray-600 text-sm">
            La población presenta un índice de salud estable con tendencias positivas en control de IMC.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="font-semibold mb-2">Alertas</h3>
          <ul className="text-sm text-gray-600 list-disc ml-4">
            <li>Incremento en consultas recientes</li>
            <li>Pacientes pendientes de atención</li>
          </ul>
        </motion.div>

      </div>
    </div>
  )
}
