export const fadeOut = element => {
    element.style.opacity = 1

    const fade = () => {
        if ((element.style.opacity -= 0.1) < 0) {
            element.style.display = 'none'
        } else {
            requestAnimationFrame(fade)
        }
    }
    fade()
}

export const fadeIn = (element, display) => {
    element.style.opacity = 0
    element.style.display = display || 'block'

    const fade = () => {
        var val = parseFloat(element.style.opacity)
        if (!((val += 0.1) > 1)) {
            element.style.opacity = val
            requestAnimationFrame(fade)
        }
    }
    fade()
}
