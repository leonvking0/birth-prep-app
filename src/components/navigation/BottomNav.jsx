import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

function NavIcon({ children }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  )
}

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <NavIcon>
        <path d="M4 10.8 12 4l8 6.8" />
        <path d="M6.5 10.5V20h11V10.5" />
      </NavIcon>
    ),
  },
  {
    to: '/lessons',
    label: 'Lessons',
    icon: (
      <NavIcon>
        <path d="M6 6.5h12" />
        <path d="M6 12h12" />
        <path d="M6 17.5h8" />
      </NavIcon>
    ),
  },
  {
    to: '/study',
    label: 'Study',
    icon: (
      <NavIcon>
        <rect x="4.5" y="6" width="15" height="12" rx="2.5" />
        <path d="M8 10h8" />
      </NavIcon>
    ),
  },
  {
    to: '/quick-reference',
    label: 'Quick Ref',
    icon: (
      <NavIcon>
        <path d="M12 4.5v15" />
        <path d="M4.5 12h15" />
        <path d="M8 8l8 8" />
      </NavIcon>
    ),
  },
]

export default function BottomNav() {
  return (
    <nav className={`${styles.nav} surface`} aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          end={item.to === '/'}
          to={item.to}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
