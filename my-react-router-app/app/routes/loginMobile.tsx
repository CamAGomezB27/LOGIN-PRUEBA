import { useState } from "react";
import { FiCreditCard, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import logo from "../assets/logo.jpg";

export default function Login() {
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegPw2, setShowRegPw2] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [tab, setTab] = useState("login");
  const [pwValue, setPwValue] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  /* ── Strength ── */
  const getStrength = (val: string) => {
    let s = 0;
    if (val.length >= 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;
    return s;
  };
  const strength = getStrength(pwValue);
  const strengthColor =
    strength <= 1
      ? "bg-red-400"
      : strength <= 2
        ? "bg-amber-400"
        : "bg-green-400";

  /* ── Field base classes ── */
  // FIX 1: pl-10 solo cuando hay icono, pl-4 cuando no hay icono
  const inputBase =
    "w-full py-3 pl-10 pr-4 rounded-xl border border-[var(--color-border)] " +
    "bg-[var(--color-muted)] text-[var(--color-text)] placeholder:text-[var(--color-text-light)] " +
    "focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] " +
    "focus:bg-[var(--color-surface)] outline-none transition-all duration-200";

  // Sin icono: pl-4 en lugar de pl-10
  const inputNoIcon =
    "w-full py-3 px-4 rounded-xl border border-[var(--color-border)] " +
    "bg-[var(--color-muted)] text-[var(--color-text)] placeholder:text-[var(--color-text-light)] " +
    "focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] " +
    "focus:bg-[var(--color-surface)] outline-none transition-all duration-200";

  // Sin icono
  const selectNoIcon =
    "w-full py-3 px-4 rounded-xl border border-[var(--color-border)] " +
    "bg-[var(--color-muted)] text-[var(--color-text)] " +
    "focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] " +
    "focus:bg-[var(--color-surface)] outline-none transition-all duration-200 appearance-none";

  return (
    // FIX 3: h-screen + overflow-hidden en el contenedor raíz para controlar el scroll
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--color-bg)]">
      {/* ── HEADER (fijo, no hace scroll) ── */}
      {/* FIX 3: flex-shrink-0 evita que el header se comprima; nunca desaparece */}
      <div
        className={`flex-shrink-0 text-white pt-14 pb-10 px-6 rounded-b-[40px] transition-all duration-700 relative overflow-hidden ${
          tab === "login"
            ? "bg-[var(--color-primary)]"
            : "bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary-light)]"
        }`}
      >
        {/* Decorative circles — sin cambios */}
        <div
          className={`absolute rounded-full bg-white/5 transition-all duration-700 ${
            tab === "register"
              ? "-top-10 -right-6 w-52 h-52 scale-125"
              : "-top-14 -right-10 w-44 h-44"
          }`}
        />
        <div
          className={`absolute rounded-full bg-white/8 transition-all duration-700 ${
            tab === "register"
              ? "-bottom-6 left-4 w-32 h-32 scale-125"
              : "-bottom-8 left-6 w-24 h-24"
          }`}
        />
        <div
          className={`absolute rounded-full transition-all duration-700 ${
            tab === "register"
              ? "top-8 left-16 w-20 h-20 bg-[var(--color-primary-light)]/40 scale-150"
              : "top-6 left-14 w-14 h-14 bg-[var(--color-primary-light)]/30"
          }`}
        />

        <div className="flex flex-col items-center text-center relative z-10">
          <img
            src={logo}
            alt="Logo"
            className={`h-12 mb-1 brightness-0 invert ${
              tab === "login" ? "scale-100" : "scale-110"
            }`}
          />
          <div key={tab} className="mt-3 animate-fadeUp">
            <h1 className="text-2xl font-extrabold tracking-tight">
              {tab === "login" ? "¡Bienvenido de nuevo!" : "¡Únete ahora!"}
            </h1>
            <p className="text-sm opacity-75 mt-1">
              {tab === "login"
                ? "Ingresa tus credenciales para continuar"
                : "Crea tu cuenta en menos de 2 minutos"}
            </p>
          </div>
        </div>
      </div>

      {/* ── TABS (fijos, no hacen scroll) ── */}
      {/* FIX 3: flex-shrink-0 + z-10 para que queden siempre visibles sobre el scroll */}
      <div className="flex-shrink-0 z-10 px-6 pt-6 max-w-md mx-auto w-full">
        <div className="flex bg-[var(--color-muted)] rounded-full p-1 mb-0 border border-[var(--color-border)]">
          {["login", "register"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                tab === t
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-light)] hover:text-[var(--color-text)]"
              }`}
            >
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY SCROLLABLE ── */}
      {/* FIX 3: flex-1 + overflow-y-auto hace que SOLO esta zona haga scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-6 pb-8 max-w-md mx-auto w-full">
        {/* Sliding panels */}
        <div className="relative overflow-hidden">
          <div
            className={`flex w-[200%] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              tab === "login" ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >
            {/* ── LOGIN ── */}
            <div className="w-1/2 pr-3">
              <div className="flex flex-col gap-3">
                {/* Tipo documento — sin icono: usa selectNoIcon */}
                <div className="relative">
                  {/* FIX 1: no hay icono, se usa selectNoIcon (px-4) */}
                  <select className={selectNoIcon}>
                    <option value="">Tipo de documento</option>
                    <option>Cédula de ciudadanía</option>
                    <option>Pasaporte</option>
                    <option>Cédula extranjería</option>
                  </select>
                </div>

                {/* Número documento — con icono */}
                <div className="relative">
                  <FiCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] z-10 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Número de documento"
                    className={inputBase}
                  />
                </div>

                {/* Contraseña — con icono */}
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] z-10 pointer-events-none" />
                  <input
                    type={showLoginPw ? "text" : "password"}
                    placeholder="Contraseña"
                    className={`${inputBase} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw(!showLoginPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {showLoginPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                {/* Helper row */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[var(--color-primary)] w-4 h-4"
                    />
                    <span className="text-xs text-[var(--color-text-light)] font-medium">
                      Recordarme
                    </span>
                  </label>
                  <a className="text-xs text-[var(--color-primary)] font-semibold cursor-pointer hover:opacity-75 transition-opacity">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                {/* Términos */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={() => setAccepted(!accepted)}
                    className="mt-0.5 accent-[var(--color-primary)] w-4 h-4"
                  />
                  <span className="text-xs text-[var(--color-text-light)]">
                    He leído y acepto los{" "}
                    <a className="text-[var(--color-primary)] font-semibold cursor-pointer">
                      términos y condiciones
                    </a>
                  </span>
                </div>

                {/* Botón */}
                <button
                  disabled={!accepted}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    accepted
                      ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.98] shadow-sm hover:shadow-md"
                      : "bg-[var(--color-muted)] text-[var(--color-text-light)] cursor-not-allowed border border-[var(--color-border)]"
                  }`}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>

            {/* ── REGISTER ── */}
            <div className="w-1/2 pl-3">
              <div className="flex flex-col gap-3 mb-4">
                {/* Step dots */}
                <div className="flex justify-center gap-1.5 mb-1">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-400 ${
                        activeStep >= s
                          ? "bg-[var(--color-primary)] w-6"
                          : "bg-[var(--color-border)] w-2"
                      }`}
                    />
                  ))}
                </div>

                {/* Nombre + Apellido */}
                {/* FIX 2: grid-cols-1 en mobile, grid-cols-2 desde sm en adelante */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="relative">
                    {/* FIX 1: sin icono → inputNoIcon (px-4) */}
                    <input
                      type="text"
                      placeholder="Primer Nombre"
                      className={inputNoIcon}
                      onChange={() => setActiveStep((s) => Math.max(s, 1))}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Segundo Nombre"
                      className={inputNoIcon}
                      onChange={() => setActiveStep((s) => Math.max(s, 1))}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Primer Apellido"
                      className={inputNoIcon}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Segundo Apellido"
                      className={inputNoIcon}
                    />
                  </div>
                </div>

                {/* Email — con icono */}
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] z-10 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="tucorreo@mail.com"
                    className={inputBase}
                    onChange={() => setActiveStep((s) => Math.max(s, 2))}
                  />
                </div>

                {/* Celular — sin icono */}
                <div className="relative">
                  {/* FIX 1: el icono era FiMail pero semánticamente era celular; se deja sin icono */}
                  <input
                    type="tel"
                    placeholder="Celular"
                    className={inputNoIcon}
                    onChange={() => setActiveStep((s) => Math.max(s, 2))}
                  />
                </div>

                {/* Contraseña — con icono */}
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] z-10 pointer-events-none" />
                  <input
                    type={showRegPw ? "text" : "password"}
                    placeholder="Mín. 8 caracteres"
                    className={`${inputBase} pr-10`}
                    value={pwValue}
                    onChange={(e) => {
                      setPwValue(e.target.value);
                      if (e.target.value.length >= 1)
                        setActiveStep((s) => Math.max(s, 2));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPw(!showRegPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {showRegPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                {/* Strength bars */}
                {pwValue.length > 0 && (
                  <div className="flex gap-1 -mt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                          i <= strength
                            ? strengthColor
                            : "bg-[var(--color-border)]"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Confirmar contraseña — con icono */}
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] z-10 pointer-events-none" />
                  <input
                    type={showRegPw2 ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    className={`${inputBase} pr-10`}
                    onChange={() => setActiveStep(3)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPw2(!showRegPw2)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {showRegPw2 ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                {/* Términos */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={() => setAccepted(!accepted)}
                    className="mt-0.5 accent-[var(--color-primary)] w-4 h-4"
                  />
                  <span className="text-xs text-[var(--color-text-light)]">
                    He leído y acepto los{" "}
                    <a className="text-[var(--color-primary)] font-semibold cursor-pointer">
                      términos y condiciones
                    </a>
                  </span>
                </div>

                {/* Botón */}
                <button
                  disabled={!accepted}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    accepted
                      ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.98] shadow-sm hover:shadow-md"
                      : "bg-[var(--color-muted)] text-[var(--color-text-light)] cursor-not-allowed border border-[var(--color-border)]"
                  }`}
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
