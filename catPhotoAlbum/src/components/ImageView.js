import Constants from '../api/Constants.js'

export default function ImageView({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('div')
    this.$target.className = 'Modal ImageViewer'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `
            <div class="content">
                ${this.state ? `<img src="${Constants.BASE_IMG_URL}${this.state}" alt="Image" style="width: 100%"/>` : ''}            
            </div>
        `
        this.$target.style.display = this.state ? 'block' : 'none'
    }

    this.$target.addEventListener('click', () => this.onClick())

    document.addEventListener('keydown', event => {
        console.log(event.key)
        if (event.key === 'Escape') this.onClick()
    })

    this.render()
}
