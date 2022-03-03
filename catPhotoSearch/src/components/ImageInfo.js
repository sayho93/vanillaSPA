import * as Utils from '../utils/Utils.js'

export default function ImageInfo({$app, initialState}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'ImageInfo'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        console.log(':::::::::::', this.state)
        if (this.state.modalVisible) {
            const {name, url, temperament, origin} = this.state.info

            this.$target.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`
            Utils.fadeIn(this.$target)
        } else {
            this.$target.style.display = 'none'
        }
    }

    document.addEventListener('click', event => {
        const target = event.target
        if (target === document.querySelector('.ImageInfo') || target === document.querySelector('.close')) Utils.fadeOut(this.$target)
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') Utils.fadeOut(this.$target)
    })

    this.render()
}
