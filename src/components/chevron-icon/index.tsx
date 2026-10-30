export function ChevronIcon({ direction = 'left', size = 20 }: {
  direction?: 'left' | 'right';
  size?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M15 5v2.6L10.6 12l4.4 4.4V19l-7-7z" transform={direction === 'right' ? 'rotate(180 12 12)' : undefined} />
    </svg>
  );
}
