export default function Nodes({$app, initialState, onClick, onPrevClick}){
    this.state = initialState
    this.onClick = onClick
    this.onPrevClick = onPrevClick
    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if(this.state.nodes){
            const template = this.state.nodes.map(node => {
                const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'
                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}" alt="${node.name}"/>
                        <span>${node.name}</span>
                    </div>
                `
            }).join('')
            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="/assets/prev.png" alt="Back"/></div>${template}` : template
        }
    }

    this.$target.addEventListener('click', event => {
        const $node = event.target.closest('.Node')
        if($node){
            const nodeId = $node.dataset.nodeId
            if(!nodeId){
                this.onPrevClick()
                return
            }
            const selectedNode = this.state.nodes.find(node => node.id === nodeId)
            if(selectedNode) this.onClick(selectedNode)
        }
    })


    this.render()
}
