import Helper from '../api/Helper.js'
import helper from '../api/Helper.js'

export default function Sample({$app, initialState, onClick}){
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('span')
    $app.appendChild(this.$target)

    helper.getList(1).then(list => {
        this.setState({text: JSON.stringify(list)})
    })

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerText = this.state.text
    }
}
