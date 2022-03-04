export const fadeOut = element => {
    element.style.opacity = 1

    const fadeOutProc = () => {
        if ((element.style.opacity -= 0.1) < 0) {
            element.style.display = 'none'
        } else {
            requestAnimationFrame(fadeOutProc)
        }
    }
    fadeOutProc()
}

export const fadeIn = (element, display) => {
    element.style.opacity = 0
    element.style.display = display || 'block'

    const fadeInProc = () => {
        var val = parseFloat(element.style.opacity)
        if (!((val += 0.1) > 1)) {
            element.style.opacity = val
            requestAnimationFrame(fadeInProc)
        }
    }
    fadeInProc()
}

export const lazyLoad = target => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target
                const src = img.dataset.lazy
                img.setAttribute('src', src)
                img.classList.add('fadeIn')
                observer.disconnect()
            }
        })
    })
    observer.observe(target)
}
