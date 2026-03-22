const listeners = new Set()

let swState = {
  updateReady: false,
  offlineReady: false,
  waitingWorker: null,
}

function notify() {
  const snapshot = {
    updateReady: swState.updateReady,
    offlineReady: swState.offlineReady,
  }

  listeners.forEach((listener) => {
    listener(snapshot)
  })
}

function setState(partialState) {
  swState = {
    ...swState,
    ...partialState,
  }
  notify()
}

function watchRegistration(registration) {
  if (!registration) {
    return
  }

  if (registration.waiting) {
    setState({ updateReady: true, waitingWorker: registration.waiting })
  }

  registration.addEventListener('updatefound', () => {
    const installingWorker = registration.installing

    if (!installingWorker) {
      return
    }

    installingWorker.addEventListener('statechange', () => {
      if (installingWorker.state !== 'installed') {
        return
      }

      if (navigator.serviceWorker.controller) {
        setState({ updateReady: true, waitingWorker: registration.waiting ?? installingWorker })
        return
      }

      setState({ offlineReady: true })
    })
  })
}

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        `${import.meta.env.BASE_URL}service-worker.js`,
      )

      watchRegistration(registration)

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    } catch {
      setState({ updateReady: false, offlineReady: false, waitingWorker: null })
    }
  })
}

export function subscribeToServiceWorker(listener) {
  if (typeof listener !== 'function') {
    return () => {}
  }

  listeners.add(listener)
  listener({
    updateReady: swState.updateReady,
    offlineReady: swState.offlineReady,
  })

  return () => listeners.delete(listener)
}

export function activateServiceWorkerUpdate() {
  if (!swState.waitingWorker) {
    return false
  }

  swState.waitingWorker.postMessage({ type: 'SKIP_WAITING' })
  return true
}
