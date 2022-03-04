import Overlay from './Overlay.js'
import {lazyLoad} from '../utils/Utils.js'

export default function SearchResult({$app, initialState, onClick, nextPage}) {
    this.state = initialState
    this.onClick = onClick
    this.nextPage = nextPage
    this.$target = document.createElement('div')
    this.$target.className = 'SearchResult'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.$overlay = new Overlay({
        $app,
        initialState: {isVisible: false, overlayText: ''},
    })

    this.render = () => {
        let template = `<span class="Empty">조건에 일치하는 결과가 없습니다.</span>`
        if (this.state.length) {
            template = this.state
                .map((cat, idx) => {
                    return /*html*/ `
                        <div class="item" data-name="${cat.name}" data-idx="${idx}">
                            <img class="Lazy" data-lazy="${cat.url}" alt=${cat.name} />
                        </div>
                    `
                })
                .join('')
        }
        this.$target.innerHTML = template

        this.$target.querySelectorAll('.Lazy').forEach(lazyLoad)
    }

    this.$target.addEventListener('click', event => {
        const item = event.target.closest('.item')
        if (item) this.onClick(this.state[item.dataset.idx])
    })

    this.$target.addEventListener('mouseover', event => {
        const target = event.target.closest('.item')
        if (target) this.$overlay.setState({isVisible: true, overlayText: target.dataset.name})
    })

    this.$target.addEventListener('mouseout', event => this.$overlay.setState(false))

    document.addEventListener('scroll', event => {
        const scrollHeight = Math.min(document.documentElement.scrollHeight, document.body.scrollHeight)
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        const clientHeight = document.documentElement.clientHeight
        console.log(scrollTop, clientHeight, scrollHeight)
        if (scrollTop + clientHeight > scrollHeight) {
            this.nextPage()
        }
    })

    this.render()
}
