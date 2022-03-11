import {route} from '../route.js'

export default function ProductList({$target, initialState}) {
    this.state = initialState
    this.$target = document.createElement('ul')
    $target.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const template = this.state
            .map(
                item => `
            <li class="Product" data-id="${item.id}">
                <img src="${item.imageUrl}">
                <div class="Product__info">
                <div>${item.name}</div>
                <div>${item.price.toLocaleString()}원~</div>
                </div>
            </li>
        `
            )
            .join('')
        this.$target.innerHTML = template
    }

    this.$target.addEventListener('click', event => {
        console.log(event)
        const targ = event.target.closest('.Product')
        console.log(targ)
        if (targ && targ.dataset.id) route(`/web/products/${targ.dataset.id}`)
    })

    this.render()
}
