import Sample from './components/Sample.js'
import Nodes from './components/Nodes.js'
import Breadcrumb from './components/Breadcrumb.js'

export default function App($app){
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }
    const sample = new Sample({$app, initialState: {text: 'Sample'}})
    const breadCrumb = new Breadcrumb({$app, initialState: this.state.depth})
    const nodes = new Nodes({
        $app,
        initialState: {isRoot: this.state.isRoot, nodes: this.state.nodes},
        onClick: node => {
            if(node.type === 'DIRECTORY'){
                //TODO directory process
            } else if(node.type === 'FILE'){
                //TODO file process
            }
        }
    })
    sample.render()
    // const nextState = {nodes: [1, 2, 3]}
    // nodes.setState(nextState)
}
