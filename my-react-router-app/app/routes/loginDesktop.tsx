import { useEffect, useRef, useState } from "react";
import {
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import logo from "../assets/logo.jpg";

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

  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.5,
    x: Math.round((i / 12) * 100),
    size: 32 + (i % 4) * 20,
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

          {/* Contenido principal branding */}
          <div className="relative z-10 flex flex-col items-start px-14 pt-14">
            <img src={logo} alt="Logo" className="h-24 brightness-0 invert" />
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center px-14">
            {/* Barra informativa — cambia de posición según tab para efecto de desplazamiento */}
            {/* En login: viene desde arriba. En register: viene desde abajo. */}
            <div
              key={`infobar-${tab}`}
              className={
                tab === "login" ? "info-bar-login" : "info-bar-register"
              }
            >
              {/* Título */}
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-2">
                {tab === "login" ? (
                  <>¡Bienvenido de nuevo!</>
                ) : (
                  <>¡Únete ahora!</>
                )}
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-xs">
                {tab === "login"
                  ? "Accede a todos tus servicios en un solo lugar. Rápido, seguro y siempre disponible."
                  : "Crea tu cuenta en menos de 2 minutos y empieza a gestionar todo desde un solo lugar."}
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            LADO DERECHO — FORMULARIO
        ══════════════════════════════════════ */}
        <div className="flex flex-1 flex-col transition-all duration-700">
          {/* Header mobile */}
          <div className="lg:hidden flex justify-center pt-10 pb-4">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          {/* Área scrollable del formulario */}
          <div className="flex-1 flex items-center justify-center px-8 py-10 overflow-y-auto">
            <div className="w-full max-w-lg">
              {/* Título */}
              <div key={`title-${tab}`} className="mb-7 animate-fade-up">
                <h2 className="text-2xl font-extrabold text-[var(--color-text)] tracking-tight">
                  {tab === "login" ? "Iniciar sesión" : "Crear cuenta"}
                </h2>
                <p className="text-sm text-[var(--color-text-light)] mt-1">
                  {tab === "login"
                    ? "Ingresa tus credenciales para continuar"
                    : "Completa el formulario para registrarte"}
                </p>
              </div>

              {/* ── TABS — barra con indicador deslizante ── */}
              {/* position:relative + overflow:hidden para que el indicador quede contenido */}
              <div
                className="relative flex bg-[var(--color-muted)] rounded-full p-1 mb-8 border border-[var(--color-border)] overflow-hidden"
                style={{ isolation: "isolate" }}
              >
                {/* Indicador pill que se desliza de un lado al otro */}
                <div
                  className="tab-indicator absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[var(--color-primary)] shadow-md"
                  style={{
                    transform:
                      tab === "login"
                        ? "translateX(4px)"
                        : "translateX(calc(100% + 4px))",
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-light)] pointer-events-none" />
                      <input
                        type="email"
                        placeholder="tucorreo@mail.com"
                        className={inputWithIcon}
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Segundo nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Opcional"
                        className={inputNoIcon}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
                        Primer apellido
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Pérez"
                        className={inputNoIcon}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-light)] mb-1.5">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
