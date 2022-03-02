import Nodes from './components/Nodes.js'
import Breadcrumb from './components/Breadcrumb.js'
import Helper from './api/Helper.js'
import ImageView from './components/ImageView.js'
import Loading from './components/Loading.js'
import Cache from './models/Cache.js'

export default function App($app){
    this.state = {
        isRoot: true,
        nodes: [],
        depth: [],
        selectedFilePath: null,
        isLoading: false,
    }

    const loading = new Loading({$app, initialState: this.state.isLoading})

    const breadCrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth,
        onClick: index => {
            if(index === this.state.depth.length - 1) return

            if(index === null){
                this.setState({
                    ...this.state,
                    isRoot: true,
                    depth: [],
                    nodes: Cache.root
                })
            } else{
                const nextDepth = this.state.depth.slice(0, index + 1)
                this.setState({
                    ...this.state,
                    depth: nextDepth,
                    nodes: Cache[nextDepth[nextDepth.length - 1].id]
                })
            }
        }
    })

    const nodes = new Nodes({
        $app,
        initialState: {},
        onClick: async node => {
            if(node.type === 'DIRECTORY'){
                this.setState({...this.state, isLoading: true})
                let response
                if(Cache[node.id]) response = Cache[node.id]
                else{
                    response = await Helper.getList(node.id)
                    if(response.returnCode !== 1){
                        alert(response.message)
                        location.reload()
                    }
                    response = response.data
                }
                this.setState({
                    ...this.state,
                    isRoot: false,
                    depth: [...this.state.depth, node],
                    nodes: response,
                    isLoading: false
                })
                Cache[node.id] = response
            }else if(node.type === 'FILE'){
                this.setState({
                    ...this.state,
                    selectedFilePath: node.filePath
                })
            }
        },
        onPrev: async () => {
            const nextState = {...this.state}
            nextState.depth.pop()
            const prevNode = this.state.depth.length === 0 ? null : this.state.depth[this.state.depth.length - 1]

            this.setState({
                ...nextState,
                isRoot: this.state.depth.length === 0,
                nodes: prevNode === null ? Cache.root : Cache[prevNode.id],
            })
        }
    })

    const imageView = new ImageView({$app, initialState: this.state.selectedFilePath, onClick: () => this.setState({...this.state, selectedFilePath: null})})

    this.setState = nextState => {
        this.state = nextState
        breadCrumb.setState(this.state.depth)
        nodes.setState({isRoot: this.state.isRoot, nodes: this.state.nodes})
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    const init = async () => {
        this.setState({...this.state, isLoading: true})
        const response = await Helper.getList()
        // const response = await Helper.postTest()
        console.log(response)
        if(response.returnCode !== 1){
            alert(response.returnMessage)
            location.reload()
            return
        }
        // return
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: response.data,
            isLoading: false,
        })
        Cache.root = response.data
    }

    init().then(() => {
        console.log(this.state)
    })
}
