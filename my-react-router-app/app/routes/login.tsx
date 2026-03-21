import { useState } from "react";
import {
  FiChevronDown,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Espacio superior */}
      <div className="h-20" />

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" />
      </div>

      {/* Contenido */}
      <div className="flex-1 px-6 py-6 max-w-md mx-auto w-full">
        {/* Título */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="text-sm text-gray-500">
            Ingresa las credenciales de tu cuenta
          </p>
        </div>

        {/* Tipo documento */}
        <label className="text-sm font-medium text-gray-700">
          Documento de identificación *
        </label>

        <div className="relative mt-1 mb-4">
          <FiUser className="absolute left-3 top-3.5 text-gray-400" />
          <select className="w-full pl-10 pr-10 py-3 border rounded-xl bg-white appearance-none focus:ring-2 focus:ring-blue-400 outline-none">
            <option>Selecciona tipo</option>
            <option>Cédula</option>
            <option>Pasaporte</option>
          </select>
          <FiChevronDown className="absolute right-3 top-3.5 text-gray-400" />
        </div>

        {/* Número de documento */}
        <input
          type="text"
          placeholder="Número de Documento"
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Email */}
        <label className="text-sm font-medium text-gray-700">
          Correo electrónico *
        </label>

        <div className="relative mb-4 mt-1">
          <FiMail className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="tucorreo@mail.com"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Contraseña */}
        <label className="text-sm font-medium text-gray-700">
          Contraseña *
        </label>

        <div className="relative mt-1">
          <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Olvidaste contraseña */}
        <div className="text-right mt-2 mb-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            className="mt-1"
          />
          <span className="text-sm text-gray-600">
            He leído y acepto los{" "}
            <a href="#" className="text-blue-500 font-medium hover:underline">
              términos y condiciones
            </a>
          </span>
        </div>

        {/* Botón */}
        <button
          disabled={!accepted}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            accepted
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          Iniciar Sesión
        </button>

        {/* Registro */}
        <div className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-500 font-semibold hover:underline">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}
