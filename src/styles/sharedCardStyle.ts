export const sharedCardStyle = {
  cardClassName: "rounded-xl border shadow-sm flex flex-col gap-3 m-2", // Reduced margin and gap
  cardStyle: {
    minWidth: 340,
    maxWidth: 400,
    background: "rgba(255,255,255,0.85)", // Ensures semi-transparency
    boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #bbb",
    margin: 8, // Reduced margin
  } as React.CSSProperties,
  titleStyle: {
    fontWeight: 700,
    fontFamily: 'Fira Mono, Consolas, Menlo, monospace',
  } as React.CSSProperties,
}; 