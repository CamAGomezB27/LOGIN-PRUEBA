import { useState } from "react";
import {
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import logo from "../assets/logo.jpg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* 🔴 HEADER */}
      <div className="bg-[var(--color-primary)] text-white pt-16 pb-10 px-6 rounded-b-[40px]">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Logo" className="h-8" />

          <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
          <p className="text-sm opacity-80">Inicia sesión para continuar</p>
        </div>
      </div>

      {/* ⚪ CONTENIDO SIN CARD */}
      <div className="flex-1 px-8 pt-8 max-w-md mx-auto w-full">
        {/* Tabs */}
        <div className="flex bg-[var(--color-muted)] rounded-full p-1 mb-6">
          {["login", "register"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${
                tab === t
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-light)]"
              }`}
            >
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        {/* LOGIN */}
        {tab === "login" && (
          <div className="flex flex-col gap-4">
            {/* Select */}
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
              <select className="w-full py-3 pl-10 pr-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none">
                <option>Tipo de documento</option>
                <option>Cédula</option>
                <option>Pasaporte</option>
              </select>
            </div>

            {/* Documento */}
            <div className="relative">
              <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
              <input
                type="text"
                placeholder="Número de documento"
                className="w-full py-3 pl-10 pr-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
              <input
                type="email"
                placeholder="tucorreo@mail.com"
                className="w-full py-3 pl-10 pr-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full py-3 pl-10 pr-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Forgot */}
            <div className="text-right">
              <a className="text-sm text-[var(--color-primary)]">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className="mt-1 accent-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-text-light)]">
                He leído y acepto los{" "}
                <a className="text-[var(--color-primary)] font-medium">
                  términos y condiciones
                </a>
              </span>
            </div>

            {/* Button */}
            <button
              disabled={!accepted}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                accepted
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        {/* REGISTER */}
        {tab === "register" && (
          <div className="flex flex-col gap-4">
            {[
              { icon: <FiUser />, placeholder: "Nombre completo" },
              { icon: <FiMail />, placeholder: "Correo" },
              { icon: <FiLock />, placeholder: "Contraseña" },
              { icon: <FiLock />, placeholder: "Confirmar contraseña" },
            ].map((field, i) => (
              <div key={i} className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]">
                  {field.icon}
                </span>
                <input
                  placeholder={field.placeholder}
                  className="w-full py-3 pl-10 pr-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                />
              </div>
            ))}

            <button className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold">
              Crear cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
