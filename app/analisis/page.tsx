'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AnalisisPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#ededed]">

      {/* Sidebar */}
      <div className="w-20 bg-[#111] flex flex-col items-center py-4 space-y-6 shadow-lg">
        <div
          onClick={() => router.push('/')}
          className="bg-[#631936] text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold cursor-pointer hover:scale-105 transition"
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
                Analíticas de Salud Pública
              </h1>
              <p className="text-gray-400 text-sm">
                Estadísticas y tendencias poblacionales
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">

          <Card title="Pacientes Totales" value="1,248" />
          <Card title="Casos de Pre-diabetes" value="312" />
          <Card title="Déficit de Vitamina D" value="547" />

        </div>

        {/* Panel grande */}
        <div className="mt-8 bg-[#111] p-6 rounded-2xl border border-[#333] shadow-lg">
          <h2 className="text-lg font-semibold text-[#b38e44] mb-4">
            Tendencias de Salud
          </h2>

          <p className="text-gray-400 text-sm">
            Se observa un aumento en los casos de pre-diabetes en los últimos meses,
            así como un alto porcentaje de pacientes con deficiencia de vitamina D.
          </p>
        </div>

      </div>
    </div>
  )
}


// 🔹 COMPONENTE CARD
function Card({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-lg"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-[#b38e44] mt-2">{value}</h3>
    </motion.div>
  )
}