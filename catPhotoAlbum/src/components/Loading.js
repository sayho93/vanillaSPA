export default function Loading({$app, initialState}){
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Modal Loading'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `
            <div class="loadingContainer">
                <img src="./assets/nyan-cat.gif" alt="Loading..." style="width: 100%" />
            </div>
        `
        this.$target.style.display = this.state ? 'block' : 'none'
    }
    this.render()
}
