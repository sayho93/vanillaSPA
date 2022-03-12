export default function Suggestion({$app, initialState, onSelect}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Suggestion'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (this.state.list.length > 0) {
            this.$target.style.display = 'block'
            this.$target.innerHTML = `
                <ul>
                    ${this.state.list
                        .map(
                            (row, idx) => `
                        <li data-idx="${idx}" ${this.state.selected === idx ? `class="Suggestion__item--selected"` : ''}>
                        ${row.display}
                        </li>`
                        )
                        .join('')}
                </ul>
                `
        } else this.$target.style.display = 'none'
    }

    this.$target.addEventListener('click', event => {
        const targ = event.target.closest('li')
        if (targ) onSelect(event, targ.dataset.idx)
    })

    this.render()
}
