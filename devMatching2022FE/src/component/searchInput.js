import debounce from '../utils/debounce.js'

export default function SearchInput({$app, initialState, searchTxtHandler, selectedHandler, onSelect}) {
    this.state = initialState
    this.$target = document.createElement('form')
    this.$target.onsubmit = onSelect
    this.$target.className = 'SearchInput'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `
            <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">
        `

        const input = this.$target.querySelector('.SearchInput__input')
        // input.addEventListener('input', event => {
        //     debounce(() => searchTxtHandler(event.target.value))
        // })

        function keyUpFn(event) {
            debounce(() => searchTxtHandler(event.target.value), 500)()
        }

        input.addEventListener('input', keyUpFn)
        input.focus()
    }

    this.$target.addEventListener('keyup', event => {
        event.preventDefault()
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            selectedHandler(event.key === 'ArrowDown' ? 1 : -1)
        }
    })

    this.render()
}
