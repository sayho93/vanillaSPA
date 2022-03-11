export const initRoute = routeHandler => {
    window.addEventListener('route', () => routeHandler())
}

export const route = (url, params) => {
    history.pushState(null, null, url)
    window.dispatchEvent(new CustomEvent('route', params))
}
