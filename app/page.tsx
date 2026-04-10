// =========================
// app/page.tsx (DASHBOARD PRO THEME)
// =========================
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

type Patient = {
  name: string;
  age: number;
  gender: string;
  status: string;
};

const patients: Patient[] = [
  { name: "Sarah Johnson", age: 34, gender: "Femenino", status: "Pendiente" },
  { name: "Michael Chen", age: 42, gender: "Masculino", status: "Consultado" },
  { name: "Emily Rodriguez", age: 28, gender: "Femenino", status: "Pendiente" },
  { name: "David Kim", age: 55, gender: "Masculino", status: "Consultado" },
];

export default function Dashboard() {
  const router = useRouter();
  const [selected, setSelected] = useState<Patient>(patients[0]);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#ededed]">
      
      {/* Sidebar */}
      <div className="w-20 bg-[#111] shadow flex flex-col items-center py-4 gap-6">
        <div className="bg-[#631936] text-white w-10 h-10 flex items-center justify-center rounded-lg">
          M
        </div>

        <div className="bg-[#1a1a1a] p-3 rounded-lg">👤</div>

        <div
          onClick={() => router.push("/carousel")}
          className="p-3 cursor-pointer hover:bg-[#631936] rounded-lg transition"
        >
          📷
        </div>

        <div
          onClick={() => router.push("/analisis")}
          className="p-3 cursor-pointer hover:bg-[#631936] rounded-lg transition"
        >
          📊
        </div>
      </div>

      {/* Patients List */}
      <div className="w-1/4 p-4 space-y-4">
        <h2 className="text-lg font-semibold text-[#b38e44]">
          Cola de Pacientes
        </h2>

        {patients.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(p)}
            className={`p-4 rounded-xl border cursor-pointer bg-[#111] shadow ${
              selected.name === p.name
                ? "border-[#631936]"
                : "border-[#333]"
            }`}
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-400">
              {p.age} años • {p.gender}
            </p>

            <span className="text-xs px-2 py-1 bg-[#631936] rounded-full">
              {p.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{selected.name}</h1>
            <p className="text-gray-400">ID Paciente: #000001</p>
          </div>

          {/* BOTÓN PRINCIPAL */}
          <button className="bg-[#631936] hover:bg-[#4a1227] text-white px-4 py-2 rounded-lg transition">
            Iniciar Consulta
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Edad" value={`${selected.age} años`} />
          <Card title="Sexo" value={selected.gender} />
          <Card title="Tipo de Sangre" value="O+" />
          <Card title="Alergias" value="Ninguna" />
        </div>

        <div className="bg-[#111] p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2 text-[#b38e44]">
            Historial Médico
          </h2>

          <ul className="text-sm text-gray-400 list-disc ml-4">
            <li>Pre-diabetes (2024)</li>
            <li>Deficiencia de Vitamina D (2025)</li>
          </ul>
        </div>
      </div>

      {/* AI Panel */}
      <div className="w-1/3 p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <h2 className="font-bold mb-4 text-[#b38e44]">
          Asistente de Diagnóstico IA
        </h2>

        <Insight
          title="Recomendación Nutricional"
          text="Bajos niveles de vitamina D"
        />
        <Insight
          title="Alerta Pre-diabetes"
          text="Niveles de glucosa elevados"
        />
        <Insight
          title="Patrón Dietético"
          text="Dieta balanceada"
        />

        {/* BOTÓN DORADO */}
        <button className="mt-4 w-full bg-[#b38e44] hover:bg-[#8f6f34] text-black py-2 rounded-lg transition">
          Ver Todos los Insights
        </button>
      </div>
    </div>
  );
}

// CARD
function Card({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#111] p-4 rounded-xl shadow border border-[#333]"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-lg font-semibold">{value}</h3>
    </motion.div>
  );
}

// INSIGHT
function Insight({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#111] p-4 rounded-xl shadow mb-3 border border-[#333]"
    >
      <h3 className="font-semibold text-[#b38e44]">{title}</h3>
      <p className="text-sm text-gray-400">{text}</p>
    </motion.div>
  );
}