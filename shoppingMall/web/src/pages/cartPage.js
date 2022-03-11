import Helper from '../api/helper.js'
import Cart from '../components/cart.js'
import LocalStorage from '../utils/localStorage.js'

export default function CartPage({$app, initialState}) {
    this.$target = document.createElement('div')
    this.$target.className = 'CartPage'
    this.$target.innerHTML = '<h1>장바구니</h1>'

    this.state = {
        list: null,
    }

    const cart = new Cart({$target: this.$target, initialState: null})

    this.setState = nextState => {
        this.state = nextState
        cart.setState(this.state.list)
    }

    this.render = () => {
        $app.appendChild(this.$target)
    }

    const initCart = async () => {
        const localItems = LocalStorage.getItem()
        const list = []
        for (let item of localItems) {
            const row = await Helper.getProducts(item.productId)
            const option = row.productOptions.filter(i => i.id === item.optionId)[0]
            list.push({...row, ...option, cnt: item.quantity, pName: row.name, priceTotal: row.price + option.price})
        }

        console.log(list)
        this.setState({...this.state, list: list})
    }

    initCart()
}
