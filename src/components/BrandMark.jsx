export default function BrandMark({
  height = 56,
  className = '',
  showLabel = false,
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        flex: '0 0 auto',
        minWidth: 0
      }}
    >
      <img
        src="/images/logo.png"
        alt="Namaste China logo"
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          flex: '0 0 auto'
        }}
      />
      {showLabel && <span style={{ whiteSpace: 'nowrap' }}>Namaste China</span>}
    </span>
  );
}
