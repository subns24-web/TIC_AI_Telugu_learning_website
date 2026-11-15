/* The TIC AI mark: a die resting with the 3-face toward the viewer.
 *
 * Drawn in cabinet projection — true isometric puts a vertical EDGE at the
 * front, leaving no face to carry the pips.
 *
 * What makes it read as a solid object rather than three flat shapes:
 *   - a dark silhouette underneath, drawn with a round line join, so the
 *     corners are rounded the way a real die's are and every face sits on a
 *     visible bevel
 *   - light from the upper left: top face brightest, front mid, right in
 *     shade, with each face shaded ACROSS itself rather than filled flat
 *   - pips are holes, not dots. A recessed hole lit from the upper left is
 *     dark on its upper-left wall and catches light on the lower-right, so
 *     each pip carries an off-centre radial gradient plus a rim catch
 *   - a soft contact shadow on the ground, and a specular sheen across the
 *     top-left corner
 *
 * No SVG filters anywhere: gradients only, so this renders identically in
 * the browser and through cairosvg when the app icons are generated.
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
  const u = (name: string) => `url(#${id}-${name})`;

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        {/* Top face — brightest, light falling from the upper left */}
        <linearGradient id={`${id}-top`} x1="0.1" y1="1" x2="0.9" y2="0">
          <stop offset="0" stopColor="#e8d294" />
          <stop offset="0.45" stopColor="#f6e9c2" />
          <stop offset="1" stopColor="#d9b863" />
        </linearGradient>

        {/* Front face — mid tone, darkening towards the bottom right */}
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0" stopColor="#e2c074" />
          <stop offset="0.5" stopColor="#c89a3c" />
          <stop offset="1" stopColor="#9d7526" />
        </linearGradient>

        {/* Right face — in shade, with a little bounce light low down */}
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#9a7128" />
          <stop offset="0.6" stopColor="#70511c" />
          <stop offset="1" stopColor="#8a6424" />
        </linearGradient>

        {/* A pip is a hole: shadowed upper-left wall, lit lower-right wall */}
        <radialGradient id={`${id}-pip`} cx="0.34" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#05080f" />
          <stop offset="0.6" stopColor="#0d1424" />
          <stop offset="1" stopColor="#2a3752" />
        </radialGradient>

        {/* Specular sheen. A hard-edged triangle left a visible crease down
            the face, so this is a soft radial that dies out before any edge. */}
        <radialGradient id={`${id}-sheen`} cx="0.26" cy="0.2" r="0.78">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Contact shadow on the ground */}
        <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0e1527" stopOpacity="0.42" />
          <stop offset="0.6" stopColor="#0e1527" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0e1527" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow, squashed and offset the way a light from upper left throws it */}
      <ellipse cx="33" cy="58.5" rx="23" ry="4.2" fill={u("shadow")} />

      {/* Silhouette in the bevel colour. The round join is what gives the
          whole solid its rounded corners — drawing six rounded paths and
          hoping they meet leaves seams. */}
      <path
        d="M8 24 L21 13 L53 13 L53 45 L40 56 L8 56 Z"
        fill="#7d5c22"
        stroke="#7d5c22"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* faces, inset slightly so the bevel shows at every edge */}
      <path d="M9.6 23.4 L21.6 13.4 L51.6 13.4 L40.4 23.4 Z" fill={u("top")} stroke={u("top")} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M41.6 24.4 L52.4 14.6 L52.4 44.4 L41.6 54.2 Z" fill={u("side")} stroke={u("side")} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M9.6 25.4 L39.4 25.4 L39.4 54.4 L9.6 54.4 Z" fill={u("front")} stroke={u("front")} strokeWidth="2.6" strokeLinejoin="round" />

      {/* sheen first — over the face, under the pips */}
      <rect x="9.6" y="25.4" width="29.8" height="29" fill={u("sheen")} />

      {/* the 3, on the diagonal as a real die has it */}
      <g>
        {[
          [16.5, 32.5],
          [24.5, 40],
          [32.5, 47.5],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="3.1" fill={u("pip")} />
            {/* light caught on the lower-right inner wall */}
            <path
              d={`M${cx - 2.2} ${cy + 2.2} a3.1 3.1 0 004.4 0`}
              stroke="#c9a34a"
              strokeOpacity="0.55"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* top face shows the 2 — skewed into the face's own plane */}
      <g transform="matrix(30 0 12 -10 10.6 23.2)">
        <circle cx="0.3" cy="0.3" r="0.085" fill="#121a2c" />
        <circle cx="0.7" cy="0.7" r="0.085" fill="#121a2c" />
      </g>

      {/* right face shows the 1 */}
      <g transform="matrix(10.8 -9.8 0 29.8 41.6 24.4)">
        <circle cx="0.5" cy="0.5" r="0.1" fill="#0b1120" />
      </g>

      {/* bright catch along the two lit top edges */}
      <g stroke="#fdf6e0" strokeOpacity="0.65" strokeWidth="0.9" strokeLinecap="round">
        <path d="M10.6 23.2 L40.2 23.2" />
        <path d="M22 13.8 L51.4 13.8" />
      </g>
    </svg>
  );
}
