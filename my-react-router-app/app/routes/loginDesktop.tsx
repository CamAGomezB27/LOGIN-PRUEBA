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
    <div className="min-h-screen flex bg-[var(--color-bg)]">
      {/* 🔴 LADO IZQUIERDO (BRANDING) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[var(--color-primary)] text-white px-10">
        <img src={logo} alt="Logo" className="h-16 mb-6" />

        <h1 className="text-3xl font-bold mb-2">Bienvenido a la plataforma</h1>

        <p className="text-sm opacity-80 text-center max-w-sm">
          Accede a tu cuenta para gestionar tus servicios de forma rápida y
          segura
        </p>
      </div>

      {/* ⚪ LADO DERECHO (FORMULARIO) */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {/* Logo en mobile */}
          <div className="md:hidden flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          {/* Título */}
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">
              Iniciar sesión
            </h2>
            <p className="text-sm text-[var(--color-text-light)]">
              Ingresa tus credenciales
            </p>
          </div>

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
              {/* Tipo doc */}
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
                <a className="text-sm text-[var(--color-primary)] hover:underline">
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

              {/* Botón */}
              <button
                disabled={!accepted}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  accepted
                    ? "bg-[var(--color-primary)] text-white hover:opacity-90"
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
    </div>
  );
}
