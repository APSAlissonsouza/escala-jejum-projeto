import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, senha);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center p-4">
      <h2 className="text-2xl mb-4">Cadastro</h2>
      <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded" placeholder="Email" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full rounded" placeholder="Senha" />
        <button className="bg-green-600 text-white w-full py-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}