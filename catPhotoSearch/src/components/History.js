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
                    return /*html*/ `<history class="history" data-keyword="${history}">${history}</history>`
                })
                .join('')

            this.$target.innerHTML = template
        }
    }

    this.$target.addEventListener('click', event => {
        const target = event.target.closest('.history')
        if (target) this.onClick(target.dataset.keyword)
    })

    this.render()
}
