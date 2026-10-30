export function ChevronIcon({ direction = 'left', size = 20 }: {
  direction?: 'left' | 'right';
  size?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="butt" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m15 6-6 6 6 6" transform={direction === 'right' ? 'rotate(180 12 12)' : undefined} />
    </svg>
  );
}
