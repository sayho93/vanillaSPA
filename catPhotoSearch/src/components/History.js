export default function History({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('div')
    this.$target.className = 'HistoryList'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (this.state.length) {
            const template = this.state
                .map(history => {
                    return `<button class="history" data-keyword="${history}">${history}</button>`
                })
                .join('')

            this.$target.innerHTML = template

            this.$target.querySelectorAll('.history').forEach(($item, index) => {
                $item.addEventListener('click', event => {
                    this.onClick(event.target.dataset.keyword)
                })
            })
        }
    }

    this.render()
}
