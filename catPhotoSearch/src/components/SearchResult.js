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
        console.log(!this.state, length)
        if (this.state.length) {
            template = this.state
                .map(cat => {
                    return `
            <div class="item">
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
        })
    }

    this.render()
}
