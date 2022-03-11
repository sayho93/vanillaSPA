import ProductDetail from '../components/productDetail.js'
import Helper from '../api/helper.js'

export default function ProductDetailPage({$app, id}) {
    this.state = {
        id: id,
        info: null,
        selected: [],
    }
    this.$target = document.createElement('div')
    this.$target.className = 'ProductDetailPage'
    this.$target.innerHTML = '<h1>커피잔 상품 정보</h1>'

    const productDetail = new ProductDetail({
        $target: this.$target,
        initialState: {
            info: null,
            selected: [],
        },
        selectItem: row => {
            const next = [...this.state.selected, row]
            this.setState({...this.state, selected: next})
        },
        onCntChange: list => {
            this.setState({...this.state, selected: list})
        },
    })

    this.setState = nextState => {
        this.state = nextState
        productDetail.setState({info: this.state.info, selected: this.state.selected})
        this.render()
    }

    this.render = () => {
        $app.appendChild(this.$target)
    }

    const getData = async () => {
        const info = await Helper.getProducts(this.state.id)
        console.log(info)
        this.setState({...this.state, info: info})
    }

    getData()
}
