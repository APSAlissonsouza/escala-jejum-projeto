import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SchedulePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Preencha a data e o horário");
      return;
    }
    try {
      const fullDate = new Date(`${date}T${time}`);
      await addDoc(collection(db, "agendamentos"), {
        uid: user.uid,
        email: user.email,
        horario: Timestamp.fromDate(fullDate),
        criadoEm: Timestamp.now(),
      });
      setSuccess(true);
      setDate("");
      setTime("");
    } catch (err) {
      setError("Erro ao agendar. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Agendar Jejum</h1>
      <form onSubmit={handleSchedule} className="space-y-4 w-full max-w-sm">
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="w-full border p-2 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">Agendamento salvo com sucesso!</p>}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
          Confirmar Agendamento
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 underline mt-2"
        >
          Voltar para o Painel
        </button>
      </form>
    </div>
  );
}