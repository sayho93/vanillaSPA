import api from './api/Api.js'
import SearchInput from './components/SearchInput.js'
import History from './components/History.js'
import SearchResult from './components/SearchResult.js'
import ImageInfo from './components/ImageInfo.js'
import Loading from './components/Loading.js'

export default function App($app) {
    this.state = {
        isLoading: false,
        list: [],
        selectedInfo: null,
        modalVisible: false,
        history: [],
        searchTxt: '',
    }

    const loading = new Loading({$app, initialState: false})

    const searchInput = new SearchInput({
        $app,
        initialState: '',
        onSearch: async keyword => {
            const history = [...this.state.history]
            history.unshift(keyword)
            if (history.length > 5) history.pop()
            this.setState({...this.state, isLoading: true, history: history, searchTxt: keyword})

            const response = await api.fetchCats(keyword)
            console.log(response)
            if (response.returnCode === 1) this.setState({...this.state, list: response.data.data})
            else alert('status code: ' + response.returnMessage)
            this.setState({...this.state, isLoading: false})
        },
        onRandom: async () => {
            this.setState({...this.state, isLoading: true})

            const response = await api.fetchRandom()
            console.log(response)
            if (response.returnCode === 1) this.setState({...this.state, list: response.data.data})
            else alert('status code: ' + response.returnMessage)
            this.setState({...this.state, isLoading: false})
        },
    })

    const history = new History({
        $app,
        initialState: this.state.history,
        onClick: async keyword => {
            console.log(keyword)
            this.setState({...this.state, isLoading: true, searchTxt: keyword})
            const response = await api.fetchCats(keyword)
            console.log(response)
            if (response.returnCode === 1) this.setState({...this.state, list: response.data.data})
            else alert('status code: ' + response.returnMessage)
            this.setState({...this.state, isLoading: false})
        },
    })

    const searchResult = new SearchResult({
        $app,
        initialState: this.state.list,
        onClick: async image => {
            // this.setState({...this.state, isLoading: true})
            const response = await api.fetchCatInfo(image.id)
            if (response.returnCode === 1) this.setState({...this.state, selectedInfo: response.data.data, modalVisible: true})
            else alert(`status code: ${response.returnMessage}`)
            // this.setState({...this.state, isLoading: false})
        },
    })

    const imageInfo = new ImageInfo({
        $app,
        initialState: {
            info: null,
            modalVisible: false,
        },
    })

    this.setState = nextState => {
        this.state = nextState
        searchInput.setState(this.state.searchTxt)
        searchResult.setState(this.state.list)
        imageInfo.setState({info: this.state.selectedInfo, modalVisible: this.state.modalVisible})
        loading.setState(this.state.isLoading)
        history.setState(this.state.history)
        console.log(this.state)
    }

    const init = () => {
        //
    }

    init()
}
