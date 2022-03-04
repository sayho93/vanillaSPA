export default function Overlay({$app, initialState, onHover}) {
    this.state = initialState
    this.$target = document.createElement('overlay')
    this.$target.className = 'Overlay'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (this.state.isVisible) {
            this.$target.innerHTML = this.state.overlayText
            this.$target.style.display = 'block'
        } else this.$target.style.display = 'none'
    }

    this.render()
}
