import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <h1 className="text-3xl font-bold">Painel Principal</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/schedule")}
        >
          Agendar Jejum
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/report")}
        >
          Ver Escala / Relatório
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </div>
  );
}