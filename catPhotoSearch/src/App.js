import api from './api/Api.js'
import SearchInput from './components/SearchInput.js'
import History from './components/History.js'
import SearchResult from './components/SearchResult.js'
import ImageInfo from './components/ImageInfo.js'
import Loading from './components/Loading.js'
import Banner from './components/Banner.js'

export default function App($app) {
    this.state = {
        isLoading: false,
        list: [],
        selectedInfo: null,
        modalVisible: false,
        history: [],
        bannerList: null,
        searchTxt: '',
        pageInfo: {
            lock: false,
            apiType: 0, //0: search 1: random
            page: '',
        },
    }

    const loading = new Loading({$app, initialState: false})

    const searchInput = new SearchInput({
        $app,
        initialState: '',
        onSearch: async keyword => {
            if (keyword === '') this.setState({...this.state, list: [], searchTxt: ''})
            else {
                const history = [...this.state.history]
                history.unshift(keyword)
                if (history.length > 5) history.pop()
                this.setState({...this.state, isLoading: true, history: history, searchTxt: keyword})

                const response = await api.fetchCats(keyword)
                if (response.returnCode === 1) {
                    const pageInfo = {lock: false, apiType: 0, page: ''}
                    this.setState({...this.state, list: response.data.data, pageInfo})
                } else alert('status code: ' + response.returnMessage)
                this.setState({...this.state, isLoading: false})
            }
        },
        onRandom: async () => {
            this.setState({...this.state, isLoading: true, searchTxt: ''})
            const response = await api.fetchRandom()
            if (response.returnCode === 1) {
                const pageInfo = {lock: false, apiType: 1, page: ''}
                this.setState({...this.state, list: response.data.data, pageInfo})
            } else alert('status code: ' + response.returnMessage)
            this.setState({...this.state, isLoading: false})
        },
    })

    const history = new History({
        $app,
        initialState: this.state.history,
        onClick: async keyword => {
            this.setState({...this.state, isLoading: true, searchTxt: keyword})
            const response = await api.fetchCats(keyword)
            if (response.returnCode === 1) {
                const pageInfo = {...this.state.pageInfo}
                pageInfo.api = 1
                this.setState({...this.state, list: response.data.data, pageInfo})
            } else alert('status code: ' + response.returnMessage)
            this.setState({...this.state, isLoading: false})
        },
    })

    const banner = new Banner({$app, initialState: this.state.bannerList})

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
        nextPage: async () => {
            console.log(this.state.pageInfo)
            if (!this.state.pageInfo.lock) {
                const pageInfo = {...this.state.pageInfo}
                pageInfo.lock = true

                pageInfo.page = this.state.pageInfo.page ? this.state.pageInfo.page + 1 : 2
                this.setState({...this.state, pageInfo, isLoading: true})

                const response =
                    pageInfo.apiType === 0
                        ? await api.fetchCats(this.state.searchTxt, this.state.pageInfo.page)
                        : await api.fetchRandom(this.state.pageInfo.page)
                if (response.returnCode === 1) {
                    let list = [...this.state.list]
                    list = list.concat(response.data.data)
                    this.setState({...this.state, list: list})
                } else alert(`status code: ${response.returnMessage}`)
                pageInfo.lock = false
                this.setState({...this.state, isLoading: false, pageInfo})
            }
        },
    })

    const imageInfo = new ImageInfo({
        $app,
        initialState: {
            info: null,
            modalVisible: false,
        },
        onClose: () => {
            this.setState({...this.state, modalVisible: false})
        },
    })

    this.setState = nextState => {
        console.log('App.js setState()')
        this.state = nextState
        searchInput.setState(this.state.searchTxt)
        searchResult.setState(this.state.list)
        imageInfo.setState({info: this.state.selectedInfo, modalVisible: this.state.modalVisible})
        loading.setState(this.state.isLoading)
        history.setState(this.state.history)
        banner.setState(this.state.bannerList)
        const tmp = {...this.state}
        tmp.bannerList = null
        sessionStorage.setItem('data', JSON.stringify(tmp.bannerList))
        console.log(this.state)
    }

    const init = async () => {
        const lastData = JSON.parse(sessionStorage.getItem('data'))
        if (lastData) this.setState(lastData)
        if (!this.state.bannerList) {
            this.setState({...this.state, isLoading: true})
            const response = await api.fetchRandom()
            if (response.returnCode === 1) this.setState({...this.state, bannerList: [...response.data.data.slice(0, 5)]})
            else alert(`status code: ${response.returnMessage}`)
            this.setState({...this.state, isLoading: false})
        }
    }

    init()
}
