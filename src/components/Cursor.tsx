interface CursorProps {
  x: number;
  y: number;
  userName: string;
  color?: string;
}

export default function Cursor({ x, y, userName, color = "#ff4444" }: CursorProps) {
  return (
    <div 
      className="absolute pointer-events-none z-50 transition-all duration-75 ease-out"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-2px, -2px)',
      }}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M3 3L17 8L10 10L8 17L3 3Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      
      <div 
        className="ml-5 -mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap shadow-lg"
        style={{ backgroundColor: color }}
      >
        {userName}
      </div>
    </div>
  );
}
