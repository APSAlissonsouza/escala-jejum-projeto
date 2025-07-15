import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/dashboard");
    } catch {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded" placeholder="Email" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full rounded" placeholder="Senha" />
        {erro && <p className="text-red-500">{erro}</p>}
        <button className="bg-blue-600 text-white w-full py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}