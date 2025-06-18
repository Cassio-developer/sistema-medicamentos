export default function HealthIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-indigo-600"
    >
    
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      <path
        d="M45 60h30M60 45v30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
     
      <circle
        cx="60"
        cy="60"
        r="25"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      
      <path
        id="circlePath"
        d="M60 20a40 40 0 0 1 0 80 40 40 0 0 1 0-80"
        fill="none"
        stroke="transparent"
      />
      <text>
        <textPath
          href="#circlePath"
          startOffset="25%"
          className="text-sm font-semibold fill-current"
        >
          Sistema de Gerenciamento
        </textPath>
      </text>
    </svg>
  )
} 