import styles from "./XrayScan.module.css";

type XrayScanProps = {
  /** extra svg children rendered above the anatomy (annotations, masks) */
  children?: React.ReactNode;
  className?: string;
  /** dim the underlying anatomy so overlays read more clearly */
  dim?: boolean;
};

/* anatomically-suggestive, not literal — built from curves so it stays
   crisp at any size and matches the phosphor reading-room palette. */
function Ribs() {
  const sides = [-1, 1];
  const ribs = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g className={styles.ribs}>
      {sides.map((s) =>
        ribs.map((i) => {
          const top = 86 + i * 34;
          const spread = 70 + i * 16;
          const drop = top + 60 + i * 10;
          const cx = 200 + s * (spread * 0.55);
          return (
            <path
              key={`${s}-${i}`}
              d={`M 200 ${top}
                  C ${200 + s * 30} ${top - 8}, ${cx} ${top + 4}, ${
                200 + s * spread
              } ${top + 34}
                  S ${cx + s * 8} ${drop}, ${200 + s * (spread * 0.5)} ${drop + 10}`}
            />
          );
        })
      )}
    </g>
  );
}

export default function XrayScan({ children, className, dim }: XrayScanProps) {
  return (
    <svg
      className={`${styles.xray} ${className ?? ""}`}
      viewBox="0 0 400 470"
      role="img"
      aria-label="Synthetic chest radiograph"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="lungGlow" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#2c3338" />
          <stop offset="55%" stopColor="#15191c" />
          <stop offset="100%" stopColor="#0a0c0e" />
        </radialGradient>
        <radialGradient id="heartShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="boneSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(220,232,236,0.85)" />
          <stop offset="100%" stopColor="rgba(150,168,176,0.35)" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* film base */}
      <rect x="0" y="0" width="400" height="470" fill="url(#lungGlow)" />

      <g className={dim ? styles.anatomyDim : styles.anatomy}>
        {/* lung fields */}
        <ellipse cx="138" cy="210" rx="74" ry="118" className={styles.lung} />
        <ellipse cx="262" cy="210" rx="74" ry="118" className={styles.lung} />

        {/* heart / mediastinal shadow */}
        <ellipse cx="178" cy="300" rx="74" ry="80" fill="url(#heartShadow)" />

        {/* spine */}
        <rect x="194" y="70" width="12" height="320" rx="6" className={styles.spine} />
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1="194"
            x2="206"
            y1={92 + i * 28}
            y2={92 + i * 28}
            className={styles.vertebra}
          />
        ))}

        {/* clavicles */}
        <path
          d="M 200 96 C 150 70, 110 78, 78 104"
          className={styles.bone}
          filter="url(#soft)"
        />
        <path
          d="M 200 96 C 250 70, 290 78, 322 104"
          className={styles.bone}
          filter="url(#soft)"
        />

        <Ribs />

        {/* diaphragm */}
        <path
          d="M 70 372 C 120 410, 180 412, 200 388 C 220 412, 286 410, 332 366"
          className={styles.diaphragm}
        />
      </g>

      {/* overlays (annotations / masks) */}
      {children}
    </svg>
  );
}
