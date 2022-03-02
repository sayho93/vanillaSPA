export default function Nodes({$app, initialState={}, onClick, onPrev}){
    this.state = initialState
    this.onClick = onClick
    this.onPrev = onPrev
    this.$target = document.createElement('div')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if(this.state.nodes){
            const template = this.state.nodes.map(node => {
                return `
                    <div class="Node" data-id="${node.id}">
                        <img src="${node.type === 'DIRECTORY' ? 'assets/directory.png' : './assets/file.png'}" alt="${node.name}">
                        <div>${node.name}</div>
                    </div>
                `
            }).join('')
            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="/assets/prev.png" alt="Back"/></div>${template}` : template
        }
    }

    this.$target.addEventListener('click', event => {
        const targ = event.target.closest('.Node')
        if(targ){
            const id = targ.dataset.id
            console.log(id)
            if(id) this.onClick(this.state.nodes.find(node => node.id === id))
            else this.onPrev()
        }
    })


    this.render()
}
