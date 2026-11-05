/* The TIC AI mark: a die resting with the 3-face toward the viewer.
 *
 * Drawn in cabinet projection rather than true isometric — isometric puts a
 * vertical EDGE at the front, which would leave no face to carry the pips.
 * Here the 3-face is a flat square facing us, with the top and right faces
 * raked back to give the solid its depth. Light reads as coming from above,
 * so the top face is the lightest gold and the right face the deepest.
 */

export function Dice({
  className = "",
  id = "dice",
}: {
  className?: string;
  /* Gradient ids must be unique per instance or a second copy on the page
     inherits the first one's fills. */
  id?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcbb63" />
          <stop offset="1" stopColor="#a37926" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3e3b4" />
          <stop offset="1" stopColor="#dcbb63" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6424" />
          <stop offset="1" stopColor="#67491b" />
        </linearGradient>
      </defs>

      {/* top face */}
      <path d="M6 22 L42 22 L54 10 L18 10 Z" fill={`url(#${id}-top)`} />
      {/* right face */}
      <path d="M42 22 L54 10 L54 46 L42 58 Z" fill={`url(#${id}-side)`} />
      {/* front face, carrying the three */}
      <path d="M6 22 L42 22 L42 58 L6 58 Z" fill={`url(#${id}-front)`} />

      {/* the 3, on the diagonal as a real die has it */}
      <g fill="#0e1527">
        <circle cx="15" cy="31" r="3.6" />
        <circle cx="24" cy="40" r="3.6" />
        <circle cx="33" cy="49" r="3.6" />
      </g>

      {/* edge highlights keep the solid from flattening at small sizes */}
      <g stroke="#f7edd2" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round">
        <path d="M6 22 L42 22" />
        <path d="M42 22 L54 10" />
      </g>
    </svg>
  );
}
