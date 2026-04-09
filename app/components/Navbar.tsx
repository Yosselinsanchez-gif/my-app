"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="font-bold text-xl text-blue-600">
        SaludApp
      </h1>

      <div className="flex gap-6">
        <Link href="/">Inicio</Link>
        <Link href="/consulta">Consulta</Link>
        <Link href="/analisis">Análisis</Link>
      </div>
    </nav>
  );
}