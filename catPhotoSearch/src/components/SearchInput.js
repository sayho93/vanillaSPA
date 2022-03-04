export default function SearchInput({$app, initialState, onSearch, onRandom}) {
    this.state = initialState
    this.onSearch = onSearch
    this.onRandom = this.onRandom

    this.$header = document.createElement('header')
    this.$header.className = 'Header'

    this.$button = document.createElement('a')
    this.$button.className = 'RandomBtn'
    this.$button.innerText = '랜덤 고양이!'

    this.$target = document.createElement('input')
    this.$target.className = 'SearchInput'
    this.$target.placeholder = '고양이를 검색해보세요.|'
    this.$target.autofocus = 'true'

    this.$header.appendChild(this.$target)
    this.$header.appendChild(this.$button)
    $app.appendChild(this.$header)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.value = this.state
    }

    this.$target.addEventListener('keyup', event => {
        if (event.key === 'Enter') onSearch(event.target.value)
    })

    this.$target.addEventListener('click', event => {
        if (event.target.value) event.target.value = ''
    })

    this.$button.addEventListener('click', event => {
        onRandom()
    })

    this.render()
}
