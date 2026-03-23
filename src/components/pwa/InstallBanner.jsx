import { useLanguage } from '../../providers/LanguageProvider.jsx'

export default function InstallBanner({
  kind = 'install',
  message,
  description,
  confirmLabel,
  onConfirm,
  onDismiss,
}) {
  const { t } = useLanguage()

  return (
    <section className="surface install-banner" data-kind={kind}>
      <div className="page-heading">
        <span className={kind === 'update' ? 'pill pill-accent' : 'pill pill-brand'}>
          {kind === 'update' ? t('banner.update') : t('banner.install')}
        </span>
        <strong>{message}</strong>
        <p className="subtle">{description}</p>
      </div>

      <div className="chip-row">
        <button className="button-primary" onClick={onConfirm} type="button">
          {confirmLabel}
        </button>
        {onDismiss ? (
          <button className="button-secondary" onClick={onDismiss} type="button">
            {t('banner.dismiss')}
          </button>
        ) : null}
      </div>
    </section>
  )
}
