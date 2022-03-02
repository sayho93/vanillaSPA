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
            if(index === null){
                this.setState({
                    ...this.state,
                    depth: [],
                    nodes: Cache.root
                })
                return
            }

            if(index === this.state.depth.length - 1) return

            const nextState = {...state}
            const nextDepth = this.state.depth.slice(0, index + 1)

            this.setState({
                ...nextState,
                depth: nextDepth,
                nodes: Cache[nextDepth[nextDepth.length - 1].id]
            })
        }
    })

    const nodes = new Nodes({
        $app,
        initialState: {},
        onClick: async node => {
            try{
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
                        nodes: response
                    })
                    Cache[node.id] = response
                }else if(node.type === 'FILE'){
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    })
                }
            } catch(error){
                console.log(error)
            } finally {
                this.setState({...this.state, isLoading: false})
            }
        },
        onPrevClick: async () => {
            try{
                const nextState = {...this.state}
                nextState.depth.pop()
                const prevNodeId = nextState.depth.length !== 0 ? nextState.depth[nextState.depth.length - 1].id : null
                if(!prevNodeId) this.setState({...nextState, isRoot: true, nodes: Cache.root})
                else this.setState({...nextState, isRoot: false, nodes: Cache[prevNodeId]})
            } catch (err){
                console.log(err)
            }
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
        try{
            this.setState({...this.state, isLoading: true})
            const response = await Helper.getList()
            console.log(response)
            if(response.returnCode !== 1){
                alert(response.returnMessage)
                location.reload()
                return
            }
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: response.data
            })
            Cache.root = response.data
        } catch (err){
            alert(err)
        } finally {
            this.setState({...this.state, isLoading: false})
        }
    }

    init().then(() => {
        console.log(this.state)
    })
}
