import * as Utils from '../utils/Utils.js'

export default function ImageInfo({$app, initialState, onClose}) {
    this.state = initialState
    this.onClose = onClose
    this.$target = document.createElement('div')
    this.$target.className = 'ImageInfo'

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (this.state.modalVisible) {
            $app.appendChild(this.$target)
            const {name, url, temperament, origin} = this.state.info

            this.$target.innerHTML = /*html*/ `
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
                </div>
            `
            Utils.fadeIn(this.$target)
        }
    }

    document.addEventListener('click', event => {
        const target = event.target
        if (target === document.querySelector('.ImageInfo') || target === document.querySelector('.close')) {
            this.onClose()
            Utils.fadeOut(this.$target)
        }
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            this.onClose()
            Utils.fadeOut(this.$target)
        }
    })

    this.render()
}
