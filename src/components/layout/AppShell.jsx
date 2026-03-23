import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { activateServiceWorkerUpdate, subscribeToServiceWorker } from '../../lib/pwa/registerServiceWorker.js'
import { loadPreferences, updatePreferences } from '../../lib/storage.js'
import { useLanguage } from '../../providers/LanguageProvider.jsx'
import { useStudy } from '../../providers/StudyProvider.jsx'
import { useTheme } from '../../providers/ThemeProvider.jsx'
import InstallBanner from '../pwa/InstallBanner.jsx'
import BottomNav from '../navigation/BottomNav.jsx'
import styles from './AppShell.module.css'

function isStandaloneDisplay() {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  return window.navigator.standalone === true
}

export default function AppShell() {
  const location = useLocation()
  const { dueCount } = useStudy()
  const { theme, cycleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const [installPromptEvent, setInstallPromptEvent] = useState(null)
  const [installDismissedAt, setInstallDismissedAt] = useState(
    () => loadPreferences().installPromptDismissedAt,
  )
  const [swState, setSwState] = useState({
    updateReady: false,
    offlineReady: false,
  })

  useEffect(() => {
    updatePreferences({
      lastRoute: `${location.pathname}${location.search}`,
    })
  }, [location.pathname, location.search])

  useEffect(() => subscribeToServiceWorker(setSwState), [])

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()

      if (installDismissedAt || isStandaloneDisplay()) {
        return
      }

      setInstallPromptEvent(event)
    }

    const handleAppInstalled = () => {
      setInstallPromptEvent(null)
      setInstallDismissedAt(null)
      updatePreferences({ installPromptDismissedAt: null })
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [installDismissedAt])

  const outletContext = useMemo(
    () => ({
      installState: {
        canInstall: Boolean(installPromptEvent) && !installDismissedAt && !isStandaloneDisplay(),
        updateReady: swState.updateReady,
        offlineReady: swState.offlineReady,
        async installApp() {
          if (!installPromptEvent) {
            return false
          }

          try {
            await installPromptEvent.prompt()
            const result = await installPromptEvent.userChoice

            if (result?.outcome !== 'accepted') {
              const dismissedAt = new Date().toISOString()
              setInstallDismissedAt(dismissedAt)
              updatePreferences({ installPromptDismissedAt: dismissedAt })
            }

            setInstallPromptEvent(null)
            return result?.outcome === 'accepted'
          } catch {
            return false
          }
        },
        dismissInstall() {
          const dismissedAt = new Date().toISOString()
          setInstallDismissedAt(dismissedAt)
          setInstallPromptEvent(null)
          updatePreferences({ installPromptDismissedAt: dismissedAt })
        },
        applyUpdate() {
          return activateServiceWorkerUpdate()
        },
      },
    }),
    [installPromptEvent, installDismissedAt, swState.offlineReady, swState.updateReady],
  )

  return (
    <div className={styles.shell}>
      <div className={styles.toggleGroup}>
        <button
          className={`button-ghost ${styles.utilityToggle}`}
          onClick={toggleLanguage}
          type="button"
          aria-label={t('language.toggleAria', {
            nextLanguage: t(`language.next.${language}`),
          })}
        >
          {t(`language.current.${language}`)}
        </button>
        <button
          className={`button-ghost ${styles.utilityToggle}`}
          onClick={cycleTheme}
          type="button"
          aria-label={t('theme.toggleAria', {
            theme: t(`theme.${theme}`),
          })}
        >
          {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🔄'}
        </button>
      </div>
      <div className={styles.frame}>
        <header className={`${styles.topBar} surface`}>
          <div className={styles.brandBlock}>
            <span className="eyebrow">{t('app.brand')}</span>
            <h1 className={styles.title}>{t('app.title')}</h1>
            <p className="subtle">{t('app.subtitle')}</p>
          </div>

          <div className={styles.actions}>
            <div className={`${styles.summaryCard} surface-strong`}>
              <span className="pill pill-brand">{t('app.dueToday')}</span>
              <strong>{t('app.dueCount', { count: dueCount })}</strong>
            </div>
          </div>
        </header>

        {swState.updateReady ? (
          <InstallBanner
            kind="update"
            onConfirm={() => outletContext.installState.applyUpdate()}
            message={t('app.updateMessage')}
            description={t('app.updateDescription')}
            confirmLabel={t('app.updateConfirm')}
          />
        ) : null}

        <main className={styles.content}>
          <Outlet context={outletContext} />
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
