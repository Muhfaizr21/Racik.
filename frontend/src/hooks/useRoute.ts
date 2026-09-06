import { useState, useEffect, useCallback } from 'react'

export type AppRoute = 'home' | 'passport' | 'studio' | 'workflow' | 'pricing' | 'admin'

export interface RouteState {
  route: AppRoute
  hashParam?: string // e.g. for #passport?hash=2609-EDP-042 or #passport/2609-EDP-042
  rawHash: string
}

function parseCurrentLocation(): RouteState {
  const hash = window.location.hash || ''
  const pathname = window.location.pathname || '/'

  // 1. Check Passport route variations
  // matches: #passport, #/passport, /passport, #passport?hash=..., #/passport/2609-...
  if (
    hash.startsWith('#passport') ||
    hash.startsWith('#/passport') ||
    pathname.startsWith('/passport')
  ) {
    let hashParam: string | undefined

    // Check ?hash= or &hash=
    const queryMatch = hash.match(/[?&]hash=([^&]+)/) || window.location.search.match(/[?&]hash=([^&]+)/)
    if (queryMatch && queryMatch[1]) {
      hashParam = decodeURIComponent(queryMatch[1])
    } else {
      // Check path style e.g. #/passport/2609-EDP-042 or /passport/2609-EDP-042
      const pathParts = (hash.replace(/^#\/?/, '') || pathname.replace(/^\//, '')).split('/')
      if (pathParts.length > 1 && pathParts[1] && !pathParts[1].startsWith('?')) {
        hashParam = decodeURIComponent(pathParts[1])
      }
    }

    return {
      route: 'passport',
      hashParam,
      rawHash: hash,
    }
  }

  // 2. Check Studio Lab route
  if (hash.startsWith('#studio') || hash.startsWith('#/studio') || pathname.startsWith('/studio')) {
    return { route: 'studio', rawHash: hash }
  }

  // 3. Check Workflow route
  if (hash.startsWith('#workflow') || hash.startsWith('#/workflow') || pathname.startsWith('/workflow')) {
    return { route: 'workflow', rawHash: hash }
  }

  // 4. Check Pricing route
  if (hash.startsWith('#pricing') || hash.startsWith('#/pricing') || pathname.startsWith('/pricing')) {
    return { route: 'pricing', rawHash: hash }
  }

  // 5. Check Admin route
  if (hash.startsWith('#admin') || hash.startsWith('#/admin') || pathname.startsWith('/admin')) {
    return { route: 'admin', rawHash: hash }
  }

  // Default: Home
  return { route: 'home', rawHash: hash }
}

export function useRoute() {
  const [routeState, setRouteState] = useState<RouteState>(() => parseCurrentLocation())

  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseCurrentLocation()
      setRouteState(parsed)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  const navigate = useCallback((toRoute: AppRoute, param?: string) => {
    let targetHash = '#/'

    switch (toRoute) {
      case 'passport':
        targetHash = param ? `#/passport?hash=${encodeURIComponent(param)}` : '#/passport'
        break
      case 'studio':
        targetHash = '#/studio'
        break
      case 'workflow':
        targetHash = '#/workflow'
        break
      case 'pricing':
        targetHash = '#/pricing'
        break
      case 'admin':
        targetHash = '#/admin'
        break
      case 'home':
      default:
        targetHash = '#/'
        break
    }

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    } else {
      // Force update if hash is same but param changed
      setRouteState(parseCurrentLocation())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return {
    ...routeState,
    navigate,
  }
}
