import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../providers/LanguageProvider.jsx'
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
    labelKey: 'nav.home',
    icon: (
      <NavIcon>
        <path d="M4 10.8 12 4l8 6.8" />
        <path d="M6.5 10.5V20h11V10.5" />
      </NavIcon>
    ),
  },
  {
    to: '/lessons',
    labelKey: 'nav.lessons',
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
    labelKey: 'nav.study',
    icon: (
      <NavIcon>
        <rect x="4.5" y="6" width="15" height="12" rx="2.5" />
        <path d="M8 10h8" />
      </NavIcon>
    ),
  },
  {
    to: '/quick-reference',
    labelKey: 'nav.quickRef',
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
  const { t } = useLanguage()

  return (
    <nav className={`${styles.nav} surface`} aria-label={t('nav.primary')}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          end={item.to === '/'}
          to={item.to}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          {item.icon}
          <span>{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
