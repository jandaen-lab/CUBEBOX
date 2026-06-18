import React from "react";

interface CubeBoxLogoProps {
  variant?: "horizontal" | "vertical" | "icon-only";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CubeBoxLogo({
  variant = "horizontal",
  size = "md",
  className = "",
}: CubeBoxLogoProps) {
  // Brand color scheme from corporate identity (Obsidian Black and Premium Bronze)
  const blackColor = "#1D1D1B";

  // Dimension mapping for the standard standalone icon-only version
  const dimensions = {
    sm: { width: 32, height: 36 },
    md: { width: 48, height: 55 },
    lg: { width: 72, height: 82 },
  };
  const { width, height } = dimensions[size];

  // Helper component to render the beautiful high-fidelity Hexagon emblem
  const HexagonEmblem = () => (
    <>
      <defs>
        {/* Real metallic linear gradient for premium bronze look matching the image exactly */}
        <linearGradient id="logoBronzeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5E5045" />
          <stop offset="35%" stopColor="#8A7667" />
          <stop offset="70%" stopColor="#A89485" />
          <stop offset="100%" stopColor="#C5B4A6" />
        </linearGradient>
      </defs>

      {/* Outer Split Dual-Hexagon Shell in Bronze with rounded joints */}
      <path
        d="M 23 15 L 50 2 L 95 28 L 95 86 L 77 96"
        stroke="url(#logoBronzeGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 77 99 L 50 112 L 5 86 L 5 28 L 23 18"
        stroke="url(#logoBronzeGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Inner Accent Parallel Highlight Ring */}
      <path
        d="M 27 23 L 50 11 L 89 33 L 89 81 L 73 90"
        stroke="url(#logoBronzeGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M 73 91 L 50 103 L 11 81 L 11 33 L 27 25"
        stroke="url(#logoBronzeGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />

      {/* Chamfered Letter C Monogram conforming to the Hexagon grid */}
      <path
        d="M 41 32 H 40 L 23 41 V 73 L 40 82 H 41"
        stroke={blackColor}
        strokeWidth="11"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* Chamfered B Monogram with matching 120-degree angular corner cuts */}
      <path
        d="M 52 32 H 55 L 71 41 V 57 H 52 H 71 V 73 L 55 82 H 52"
        stroke={blackColor}
        strokeWidth="11"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Backbone curve spine for standard alignment check */}
      <line
        x1="52"
        y1="32"
        x2="52"
        y2="82"
        stroke={blackColor}
        strokeWidth="11"
        strokeLinecap="square"
      />

      {/* Core Solid Bronze Play Button nestled between C and B gaps */}
      <polygon
        points="41,47 41,67 58,57"
        fill="url(#logoBronzeGrad)"
      />
    </>
  );

  // Return appropriate layout structure based on variant setting
  if (variant === "icon-only") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 114"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 overflow-visible ${className}`}
      >
        <HexagonEmblem />
      </svg>
    );
  }

  if (variant === "vertical") {
    const scaleClasses = {
      sm: "w-[120px] h-[100px]",
      md: "w-[180px] h-[150px]",
      lg: "w-[240px] h-[200px]",
    };

    return (
      <svg
        viewBox="0 0 200 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${scaleClasses[size]} shrink-0 overflow-visible ${className}`}
      >
        {/* Hexagon centered horizontally at x = 100, y = 0 to 114 */}
        <g transform="translate(50, 0)">
          <HexagonEmblem />
        </g>

        {/* Brand Name CUBE with SUIT geometric typography */}
        <text
          x="65"
          y="138"
          fontFamily="SUIT, sans-serif"
          fontWeight="900"
          fontSize="24"
          fill={blackColor}
          letterSpacing="0.02em"
          textAnchor="middle"
        >
          CUBE
        </text>

        {/* Brand Name BOX section utilizing custom "O" element */}
        <text
          x="116"
          y="138"
          fontFamily="SUIT, sans-serif"
          fontWeight="900"
          fontSize="24"
          fill="url(#logoBronzeGrad)"
          letterSpacing="0.02em"
          textAnchor="middle"
        >
          B
        </text>

        {/* Custom rounded box O with play symbol inside */}
        <g transform="translate(125, 119)">
          <rect
            x="0"
            y="0"
            width="17"
            height="17"
            rx="3.5"
            stroke="url(#logoBronzeGrad)"
            strokeWidth="3"
            fill="none"
          />
          <polygon points="6,4.5 6,12.5 12,8.5" fill="url(#logoBronzeGrad)" />
        </g>

        <text
          x="153"
          y="138"
          fontFamily="SUIT, sans-serif"
          fontWeight="900"
          fontSize="24"
          fill="url(#logoBronzeGrad)"
          letterSpacing="0.02em"
          textAnchor="middle"
        >
          X
        </text>

        {/* Elegantly aligned luxury subtitle ornament */}
        <text
          x="100"
          y="158"
          fontFamily="SUIT, sans-serif"
          fontWeight="900"
          fontSize="7.5"
          fill={blackColor}
          letterSpacing="0.18em"
          textAnchor="middle"
          opacity="0.85"
        >
          — OTT LOUNGE —
        </text>
      </svg>
    );
  }

  // Primary horizontal variant (perfect for site navbar and footers)
  const scales = {
    sm: "w-[180px] h-[40px]",
    md: "w-[260px] h-[55px]",
    lg: "w-[340px] h-[75px]",
  };

  return (
    <svg
      viewBox="0 0 320 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${scales[size]} shrink-0 overflow-visible select-none ${className}`}
    >
      {/* Scaling the 100x114 emblem down to height 51 inside horizontal bar */}
      <g transform="translate(4, 6) scale(0.46)">
        <HexagonEmblem />
      </g>

      {/* CUBE (Black) */}
      <text
        x="68"
        y="35"
        fontFamily="SUIT, sans-serif"
        fontWeight="900"
        fontSize="24"
        fill={blackColor}
        letterSpacing="0.04em"
      >
        CUBE
      </text>

      {/* BOX (Metallic Bronze with play-inner O element) */}
      <text
        x="146"
        y="35"
        fontFamily="SUIT, sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="url(#logoBronzeGrad)"
        letterSpacing="0.04em"
      >
        B
      </text>

      {/* Detailed representation of O */}
      <g transform="translate(168, 16)">
        <rect
          x="0"
          y="0"
          width="19"
          height="19"
          rx="4"
          stroke="url(#logoBronzeGrad)"
          strokeWidth="3.2"
          fill="none"
        />
        <polygon points="7,6 7,13 13,9.5" fill="url(#logoBronzeGrad)" />
      </g>

      <text
        x="194"
        y="35"
        fontFamily="SUIT, sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="url(#logoBronzeGrad)"
        letterSpacing="0.04em"
      >
        X
      </text>

      {/* Styled brand tagline aligned under the wordmark */}
      <text
        x="142"
        y="52"
        fontFamily="SUIT, sans-serif"
        fontWeight="900"
        fontSize="8"
        fill={blackColor}
        letterSpacing="0.28em"
        textAnchor="middle"
        opacity="0.85"
      >
        — OTT LOUNGE —
      </text>
    </svg>
  );
}
