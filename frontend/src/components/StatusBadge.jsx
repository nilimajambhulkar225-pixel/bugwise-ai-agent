export default function StatusBadge({ value }) {
  return <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span>;
}
