export const fadeOut = element => {
    element.style.opacity = 1

    const fadeOutProc = () => {
        // console.log('fadeout:::')
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
        // console.log('fadeIn:::')
        var val = parseFloat(element.style.opacity)
        if (!((val += 0.1) > 1)) {
            element.style.opacity = val
            requestAnimationFrame(fadeInProc)
        }
    }
    fadeInProc()
}
