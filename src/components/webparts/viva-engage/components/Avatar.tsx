/** Avatar Viva Engage : image si fournie, sinon initiales sur fond rose (modèle). */
export function Avatar({ name, src, size = 40 }: { name: string; src?: string; size?: number }) {
  const initials = name.trim().split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  if (src) {
    return <img src={src} alt={name} width={size} height={size} className="rounded-full object-cover shrink-0" style={{ width: size, height: size }} />;
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0 font-semibold"
      style={{ width: size, height: size, background: '#f4c7cf', color: '#9d4b5d', fontSize: size * 0.35 }}
    >
      {initials}
    </span>
  );
}
