export default function MedicineIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-indigo-600"
    >
      {/* Frasco de Remédio */}
      <path
        d="M40 20h40v10H40z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M45 30h30v60c0 5.523-6.716 10-15 10s-15-4.477-15-10V30z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M45 30h30v60c0 5.523-6.716 10-15 10s-15-4.477-15-10V30z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 20h40M40 30h40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Comprimidos */}
      <circle
        cx="60"
        cy="50"
        r="8"
        fill="currentColor"
      />
      <circle
        cx="50"
        cy="70"
        r="6"
        fill="currentColor"
      />
      <circle
        cx="70"
        cy="70"
        r="6"
        fill="currentColor"
      />
      
      {/* Texto "Medicamentos" em formato curvo */}
      <path
        id="curve"
        d="M30 90c20-10 40-10 60 0"
        fill="none"
        stroke="transparent"
      />
      <text>
        <textPath
          href="#curve"
          startOffset="50%"
          textAnchor="middle"
          className="text-sm font-semibold fill-current"
        >
          Medicamentos
        </textPath>
      </text>
    </svg>
  )
} 