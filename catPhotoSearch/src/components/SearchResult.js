export default function SearchResult({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('div')
    this.$target.className = 'SearchResult'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        let template = `<span class="Empty">조건에 일치하는 결과가 없습니다.</span>`
        if (this.state.length) {
            template = this.state
                .map(cat => {
                    return /*html*/ `
                        <div class="item" data-name="${cat.name}">
                            <img src=${cat.url} alt=${cat.name} />
                        </div>
                    `
                })
                .join('')
        }
        this.$target.innerHTML = template

        this.$target.querySelectorAll('.item').forEach(($item, index) => {
            $item.addEventListener('click', () => {
                this.onClick(this.state[index])
            })

            $item.addEventListener('mouseover', event => {
                const target = event.target.closest('.item')
                if (target) {
                    const name = target.dataset.name
                    console.log(name)
                }
            })
        })
    }

    this.render()
}
