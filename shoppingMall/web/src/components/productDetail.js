import LocalStorage from '../utils/localStorage.js'
import {route} from '../route.js'

export default function ProductDetail({$target, initialState, selectItem, onCntChange}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'ProductDetail'
    $target.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (this.state.info) {
            const template = `
                <img src="${this.state.info.imageUrl}">
                <div class="ProductDetail__info">
                    <h2>${this.state.info.name}</h2>
                    <div class="ProductDetail__price">${this.state.info.price.toLocaleString()}원~</div>
                    <select id="options">
                        <option value="-1">선택하세요.</option>
                        ${this.state.info.productOptions.map(
                            (option, idx) => `
                            <option ${option.stock ? '' : 'disabled'} value="${idx}">
                                ${option.stock ? '' : '(품절)'} ${this.state.info.name} ${option.name} ${
                                option.price > 0 ? `(+${option.price.toLocaleString()}원)` : ''
                            }
                            </option>
                        `
                        )}
                    </select>
                    <div class="ProductDetail__selectedOptions">
                    <h3>선택된 상품</h3>
                    <ul>
                        ${this.state.selected
                            .map(
                                (select, idx) => `
                            <li>${select.name} ${select.price.toLocaleString()}원 
                                <div>
                                    <input type="number" class="SelectCounter" value="${select.cnt}" data-idx="${idx}">개
                                </div> 
                            </li> 
                        `
                            )
                            .join('')}
                    </ul>
                    <div class="ProductDetail__totalPrice">
                        ${this.state.selected.reduce((acc, cur) => acc + cur.price * cur.cnt, 0).toLocaleString()}원
                    </div>
                    <button class="OrderButton">주문하기</button>
                    </div>
                </div>
            `
            this.$target.innerHTML = template
        }
    }

    this.$target.addEventListener('input', event => {
        if (event.target.id === 'options') {
            const value = event.target.value
            if (value > -1) {
                const option = this.state.info.productOptions[value]
                if (this.state.selected.filter(i => i.id === option.id).length) return
                selectItem({...option, name: `${this.state.info.name} ${option.name}`, price: option.price + this.state.info.price, cnt: 1})
            }
        } else if (event.target.className === 'SelectCounter') {
            const next = [...this.state.selected]
            if (!new RegExp('[0-9]+').test(event.target.value)) {
                console.log(':::::')
                event.target.value = 1
            }
            if (next[event.target.dataset.idx].stock < event.target.value) {
                event.target.value = next[event.target.dataset.idx].stock
            }
            next[event.target.dataset.idx].cnt = event.target.value
            onCntChange(next)
        }
    })

    this.$target.addEventListener('click', event => {
        const targ = event.target.closest('.OrderButton')
        if (targ) {
            if (this.state.selected.length === 0) {
                alert('장바구니가 비어 있습니다')
                route('/web/')
                return
            }
            LocalStorage.setItem(this.state.selected.map(row => ({productId: this.state.info.id, optionId: row.id, quantity: row.cnt})))
            route('/web/cart')
        }
    })

    this.render()
}
