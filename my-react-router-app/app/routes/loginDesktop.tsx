import { useEffect, useRef, useState } from "react";
import {
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import innova from "../assets/Portal_Pacientes.png";
import logo from "../assets/Recurso1.png";

/* ─────────────────────────────────────────
   Tipos
───────────────────────────────────────── */
type Tab = "login" | "register";

/* ─────────────────────────────────────────
   Clases base de inputs
───────────────────────────────────────── */
const inputWithIcon =
  "w-full py-3 pl-10 pr-4 rounded-xl border border-[var(--color-border)] " +
  "bg-[var(--color-muted)] text-[var(--color-text)] placeholder:text-[var(--color-text-light)] " +
  "focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] " +
  "focus:bg-[var(--color-surface)] outline-none transition-all duration-200";

const inputNoIcon =
  "w-full py-3 px-4 rounded-xl border border-[var(--color-border)] " +
  "bg-[var(--color-muted)] text-[var(--color-text)] placeholder:text-[var(--color-text-light)] " +
  "focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] " +
  "focus:bg-[var(--color-surface)] outline-none transition-all duration-200";

const selectNoIcon =
  "w-full py-3 px-4 rounded-xl border border-[var(--color-border)] " +
  "bg-[var(--color-muted)] text-[var(--color-text)] " +
  "focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] " +
  "focus:bg-[var(--color-surface)] outline-none transition-all duration-200 appearance-none";

/* ─────────────────────────────────────────
   Partícula flotante (branding side)
───────────────────────────────────────── */
function Particle({
  delay,
  x,
  size,
}: {
  delay: number;
  x: number;
  size: number;
}) {
  return (
    <div
      className="absolute bottom-0 rounded-full bg-white/10 animate-float-up"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        animationDuration: `${6 + (delay % 3)}s`,
      }}
    />
  );
}

/* ─────────────────────────────────────────
   Componente principal
───────────────────────────────────────── */
export default function LoginWeb() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPw, setShowPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegPw2, setShowRegPw2] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [acceptedReg, setAcceptedReg] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const prevTab = useRef<Tab>("login");

  useEffect(() => {
    prevTab.current = tab;
  }, [tab]);

  /* Fortaleza contraseña */
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
  const strengthLabel =
    strength <= 1
      ? "Débil"
      : strength <= 2
        ? "Regular"
        : strength <= 3
          ? "Buena"
          : "Fuerte";

  const particles = Array.from({ length: 16 }, (_, i) => ({
    delay: Math.random() * 5, // delays aleatorios
    x: Math.random() * 100, // posición horizontal random
    size: 20 + Math.random() * 60, // tamaños variados
    duration: 6 + Math.random() * 6, // velocidades distintas
    opacity: 0.1 + Math.random() * 0.3, // transparencia variable
  }));

  return (
    <>
      <div
        className={`min-h-screen flex bg-[var(--color-bg)] overflow-hidden transition-all duration-700 ${
          tab === "register" ? "flex-row-reverse" : ""
        }`}
      >
        {/* ══════════════════════════════════════
            LADO IZQUIERDO — BRANDING
        ══════════════════════════════════════ */}
        <div className="hidden lg:flex relative flex-col justify-between w-[46%] branding-overlay text-white overflow-hidden transition-all duration-700">
          {/* Grid decorativo de fondo */}
          <div className="absolute inset-0 grid-lines" />
          {/* Círculos de fondo con blur */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[var(--color-primary-light)]/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl transition-all duration-1000 ${
              tab === "register"
                ? "bg-[var(--color-primary-light)]/15 scale-150"
                : "bg-white/5 scale-100"
            }`}
          />
          {/* Partículas flotantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
              <Particle key={i} {...p} />
            ))}
          </div>
          <div className="relative z-10 flex flex-col justify-center h-full px-14 py-14 text-center">
            {/* Logo */}
            <div className="mb-10 flex justify-center">
              <img src={logo} alt="Logo" className="h-64" />
            </div>

            {/* Texto */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                {tab === "login" ? "¡Bienvenido de nuevo!" : "¡Únete ahora!"}
              </h1>

              <p className="text-xl text-white/70 leading-relaxed max-w-prose">
                {tab === "login"
                  ? "Tu salud, más cerca que nunca. Agenda citas, revisa tus exámenes y accede a tu información médica fácilmente."
                  : "Crea tu cuenta y comienza a gestionar tus citas, resultados y toda tu información de salud en un solo lugar."}
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            LADO DERECHO — FORMULARIO
        ══════════════════════════════════════ */}
        <div className="flex flex-1 flex-col transition-all duration-700 sm:mt-32">
          <div
            className={`flex-shrink-0 text-white pt-14 pb-10 px-6 rounded-b-[40px] transition-all duration-700 relative overflow-hidden branding-overlay lg:hidden`}
          >
            {/* Barra informativa — cambia de posición según tab para efecto de desplazamiento */}
            {/* En login: viene desde arriba. En register: viene desde abajo. */}
            <div
              key={`infobar-${tab}`}
              className={
                tab === "login" ? "info-bar-login" : "info-bar-register"
              }
            ></div>
            {/* Grid */}
            <div className="absolute inset-0 grid-lines opacity-70" />

            {/* Blobs dinámicos */}
            <div
              className={`absolute rounded-full bg-[var(--color-primary-light)]/20 blur-3xl transition-all duration-700 ${
                tab === "register"
                  ? "-top-10 -right-6 w-52 h-52 scale-125"
                  : "-top-14 -right-10 w-44 h-44"
              }`}
            />
            <div
              className={`absolute rounded-full bg-white/5 blur-3xl transition-all duration-700 ${
                tab === "register"
                  ? "-bottom-6 left-4 w-32 h-32 scale-125"
                  : "-bottom-8 left-6 w-24 h-24"
              }`}
            />
            <div
              className={`absolute rounded-full blur-2xl transition-all duration-700 ${
                tab === "register"
                  ? "top-8 left-16 w-20 h-20 bg-[var(--color-primary-light)]/40 scale-150"
                  : "top-6 left-14 w-14 h-14 bg-[var(--color-primary-light)]/30"
              }`}
            />

            {/* Glow central tipo desktop */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000 ${
                tab === "register"
                  ? "w-52 h-52 bg-[var(--color-primary-light)]/20 scale-125"
                  : "w-40 h-40 bg-white/10 scale-100"
              }`}
            />

            {/* Partículas (LA MAGIA) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((p, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 rounded-full animate-float-up"
                  style={{
                    left: `${p.x}%`,
                    width: p.size,
                    height: p.size,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    opacity: p.opacity,
                    filter: `blur(${p.size > 40 ? 3 : 1}px)`,
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
                  }}
                />
              ))}
            </div>

            {/* Contenido */}
            <div className="flex flex-col items-center text-center relative z-10">
              <img
                src={logo}
                alt="Logo"
                className={`h-36 mb-1 transition-transform duration-500 ${
                  tab === "login" ? "scale-100" : "scale-110"
                }`}
              />

              <div key={tab} className="mt-3 animate-fadeUp">
                <h1 className="text-2xl font-extrabold tracking-tight">
                  {tab === "login" ? "¡Bienvenido de nuevo!" : "¡Únete ahora!"}
                </h1>

                <p className="text-sm text-white/70 mt-1 max-w-xs">
                  {tab === "login"
                    ? "Tu salud, más cerca que nunca. Agenda citas, revisa tus exámenes y accede a tu información médica fácilmente."
                    : "Crea tu cuenta y comienza a gestionar tus citas, resultados y toda tu información de salud en un solo lugar."}
                </p>
              </div>
            </div>
          </div>

          {/* Área scrollable del formulario */}
          <div className="flex-1 flex justify-center px-4 sm:px-8 py-6 overflow-hidden">
            <div className="w-full max-w-lg flex flex-col h-full">
              {/* Título */}
              <div
                key={`title-${tab}`}
                className="mb-5 animate-fade-up text-center"
              >
                <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
                  {tab === "login" ? "Iniciar sesión" : "Crear cuenta"}
                </h2>
                <p className="text-normal text-[var(--color-text-light)]">
                  {tab === "login"
                    ? "Ingresa tus credenciales para continuar"
                    : "Completa el formulario para registrarte"}
                </p>
              </div>

              {/* ── TABS — barra con indicador deslizante ── */}
              {/* position:relative + overflow:hidden para que el indicador quede contenido */}
              <div
                className="relative grid grid-cols-2 bg-[var(--color-muted)] rounded-full p-1 mb-4 border border-[var(--color-border)] overflow-hidden"
                style={{ isolation: "isolate" }}
              >
                {/* Indicador pill que se desliza */}
                <div
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[var(--color-primary)] shadow-md transition-all duration-300 ease-in-out"
                  style={{
                    left: "4px",
                    transform:
                      tab === "register"
                        ? "translateX(100%)"
                        : "translateX(0%)",
                  }}
                />
                {(["login", "register"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                      tab === t
                        ? "text-white"
                        : "text-[var(--color-text-light)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {t === "login" ? "Iniciar sesión" : "Registrarse"}
                  </button>
                ))}
              </div>

              {/* ── LOGIN ── */}
              {tab === "login" && (
                <div
                  key="login-form"
                  className="flex flex-col gap-4 form-emerge"
                >
                  {/* Tipo documento */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                      Tipo de documento
                    </label>
                    <select className={selectNoIcon}>
                      <option value="">Seleccionar...</option>
                      <option>Cédula de ciudadanía</option>
                      <option>Pasaporte</option>
                      <option>Cédula de extranjería</option>
                    </select>
                  </div>

                  {/* Número documento */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                      Número de documento
                    </label>
                    <div className="relative">
                      <FiCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Ej. 1020304050"
                        className={inputWithIcon}
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                      Contraseña
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none" />
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        className={`${inputWithIcon} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Helper row */}
                  <div className="flex items-center justify-between -mt-1">
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
                    onClick={() => {
                      if (accepted) setLoginSuccess(true);
                      setTimeout(() => setLoginSuccess(false), 2500);
                    }}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                      accepted
                        ? "btn-shimmer text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/30 active:scale-[0.98]"
                        : "bg-[var(--color-muted)] text-[var(--color-text-light)] cursor-not-allowed border border-[var(--color-border)]"
                    }`}
                  >
                    {loginSuccess ? (
                      <span className="flex items-center gap-2 animate-bounce-in">
                        Acceso concedido
                      </span>
                    ) : (
                      <>Iniciar sesión</>
                    )}
                  </button>

                  <div className="mb-10 flex justify-center">
                    <img src={innova} alt="Logo" className="h-12" />
                  </div>
                </div>
              )}

              {/* ── REGISTER ── */}
              {tab === "register" && (
                <div
                  key="register-form"
                  className="flex flex-col gap-4 form-emerge"
                >
                  {/* Step dots */}
                  <div className="flex items-center gap-2 mb-1">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            activeStep >= s
                              ? "bg-[var(--color-primary)] w-8"
                              : "bg-[var(--color-border)] w-3"
                          }`}
                        />
                        {s < 3 && (
                          <div className="w-3 h-px bg-[var(--color-border)]" />
                        )}
                      </div>
                    ))}
                    <span className="text-xs text-[var(--color-text-light)] ml-1 font-medium">
                      Paso {activeStep} de 3
                    </span>
                  </div>

                  {/* Nombres — 2 columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Primer nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Juan"
                        className={inputNoIcon}
                        onChange={() => setActiveStep((s) => Math.max(s, 1))}
                      />
                    </div>
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Segundo nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Opcional"
                        className={inputNoIcon}
                      />
                    </div>
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Primer apellido
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Pérez"
                        className={inputNoIcon}
                      />
                    </div>
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Segundo apellido
                      </label>
                      <input
                        type="text"
                        placeholder="Opcional"
                        className={inputNoIcon}
                      />
                    </div>
                  </div>

                  {/* Contacto — 2 columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <FiMail
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none"
                          size={14}
                        />
                        <input
                          type="email"
                          placeholder="tucorreo@mail.com"
                          className={inputWithIcon}
                          onChange={() => setActiveStep((s) => Math.max(s, 2))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Celular
                      </label>
                      <div className="relative">
                        <FiPhone
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none"
                          size={14}
                        />
                        <input
                          type="tel"
                          placeholder="300 000 0000"
                          className={inputWithIcon}
                          onChange={() => setActiveStep((s) => Math.max(s, 2))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contraseñas — 2 columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Contraseña
                      </label>
                      <div className="relative">
                        <FiLock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none"
                          size={14}
                        />
                        <input
                          type={showRegPw ? "text" : "password"}
                          placeholder="Mín. 8 caracteres"
                          className={`${inputWithIcon} pr-10`}
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {showRegPw ? (
                            <FiEyeOff size={14} />
                          ) : (
                            <FiEye size={14} />
                          )}
                        </button>
                      </div>
                      {/* Strength */}
                      {pwValue.length > 0 && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <div className="flex gap-1 flex-1">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-[var(--color-border)]"}`}
                              />
                            ))}
                          </div>
                          <span
                            className={`text-[10px] font-semibold ${strength <= 1 ? "text-red-400" : strength <= 2 ? "text-amber-400" : "text-green-500"}`}
                          >
                            {strengthLabel}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className=" text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <FiLock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none"
                          size={14}
                        />
                        <input
                          type={showRegPw2 ? "text" : "password"}
                          placeholder="Repite tu contraseña"
                          className={`${inputWithIcon} pr-10`}
                          onChange={() => setActiveStep(3)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPw2(!showRegPw2)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {showRegPw2 ? (
                            <FiEyeOff size={14} />
                          ) : (
                            <FiEye size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Términos */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={acceptedReg}
                      onChange={() => setAcceptedReg(!acceptedReg)}
                      className="mt-0.5 accent-[var(--color-primary)] w-4 h-4"
                    />
                    <span className="text-xs text-[var(--color-text-light)]">
                      He leído y acepto los{" "}
                      <a className="text-[var(--color-primary)] font-semibold cursor-pointer">
                        términos y condiciones
                      </a>{" "}
                      y la{" "}
                      <a className="text-[var(--color-primary)] font-semibold cursor-pointer">
                        política de privacidad
                      </a>
                    </span>
                  </div>

                  {/* Botón */}
                  <button
                    disabled={!acceptedReg}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                      acceptedReg
                        ? "btn-shimmer text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/30 active:scale-[0.98]"
                        : "bg-[var(--color-muted)] text-[var(--color-text-light)] cursor-not-allowed border border-[var(--color-border)]"
                    }`}
                  >
                    Crear mi cuenta
                  </button>

                  <div className="mb-10 flex justify-center">
                    <img src={innova} alt="Logo" className="h-12" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
