import Helper from '../api/helper.js'
import ProductList from '../components/productList.js'

export default function ProductListPage({$app}) {
    this.state = {
        list: [],
    }
    this.$target = document.createElement('div')
    this.$target.className = 'ProductListPage'
    this.$target.innerHTML = '<h1>상품목록</h1>'

    const productList = new ProductList({$target: this.$target, initialState: []})

    this.setState = nextState => {
        this.state = nextState
        productList.setState(this.state.list)
        this.render()
    }

    this.render = () => {
        $app.appendChild(this.$target)
    }

    const getData = async () => {
        const list = await Helper.getProducts()
        console.log(list)
        this.setState({...this.state, list})
    }

    getData()
}
