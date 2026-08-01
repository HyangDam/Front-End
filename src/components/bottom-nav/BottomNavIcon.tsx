import type { BottomNavTabId } from "./bottomNav.const";

type BottomNavIconProps = {
  tabId: BottomNavTabId;
  active: boolean;
};

const SEARCH_PETAL_ANGLES = [0, 72, 144, 216, 288];

function BottomNavIcon({ tabId, active }: BottomNavIconProps) {
  if (tabId === "home") {
    const color = active ? "#4a5a45" : "#7d756c";
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10l9-7 9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1z"
          stroke={color}
          strokeWidth="1.7"
          fill={active ? "#e4ebe2" : "none"}
          strokeLinejoin="round"
        />
        <path d="M9 21V12h6v9" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (tabId === "search") {
    const petalFill = active ? "#c4a090" : "#7d756c";
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {SEARCH_PETAL_ANGLES.map((deg) => (
          <ellipse
            key={deg}
            cx="12"
            cy="5.5"
            rx="2.2"
            ry="4"
            fill={petalFill}
            opacity={active ? 1 : 0.7}
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
        <circle
          cx="12"
          cy="12"
          r="2.5"
          fill={active ? "#fff" : "#fdf8f1"}
          stroke={active ? "#c4a090" : "#7d756c"}
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  if (tabId === "ai") {
    const color = active ? "#c4a090" : "#7d756c";
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"
          fill={active ? color : "none"}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 14l.6 1.6L21 16l-1.9.6L18.5 18l-.6-1.4L16 16l1.9-.4L18.5 14z"
          fill={color}
        />
      </svg>
    );
  }

  const color = active ? "#4a5a45" : "#7d756c";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth="1.7"
        fill={active ? "#e4ebe2" : "none"}
      />
      <path
        d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default BottomNavIcon;
