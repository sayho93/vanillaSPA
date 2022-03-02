export default function Breadcrumb({$app, initialState = [], onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('nav')
    this.$target.className = 'Breadcrumb'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `
            <div class="navItem" style="${this.state.length > 0 ? 'color:#007bff' : ''}">root</div>
            ${this.state.map((node, idx) => {
                return `<div class="navItem" data-idx="${idx}" style="${idx !== this.state.length - 1 ? 'color:#007bff;' : ''}">${node.name}</div>`
            }).join('')}
        `
    }

    this.$target.addEventListener('click', event => {
        const $navItem = event.target.closest('.navItem')
        if($navItem){
            const idx = $navItem.dataset.idx
            this.onClick(idx ? parseInt(idx) : null)
        }
    })

    this.render()
}
