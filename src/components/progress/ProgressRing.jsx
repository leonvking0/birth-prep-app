export default function ProgressRing({ label, mastered, total, percentage }) {
  const clampedPercentage = Math.max(0, Math.min(percentage, 1))
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - clampedPercentage)

  return (
    <div className="surface install-banner" data-kind="install">
      <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="var(--surface-muted)"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 40 40)"
        />
      </svg>

      <div className="metric">
        <strong>{label}</strong>
        <span className="metric-value">{Math.round(clampedPercentage * 100)}%</span>
        <span className="subtle">
          {mastered} mastered / {total} total
        </span>
      </div>
    </div>
  )
}
