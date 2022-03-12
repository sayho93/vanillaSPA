import Helper from './api/helper.js'
import SearchInput from './component/searchInput.js'
import SelectedLanguage from './component/selectedLanguage.js'
import Suggestion from './component/suggestion.js'
import LocalStorage from './utils/localStorage.js'

const cache = {}

export default function App({$app}) {
    this.state = {
        selected: [],
        searchTxt: '',
        suggestion: [],
        selectedSuggestion: 0,
    }

    const selectedLanguage = new SelectedLanguage({
        $app,
        initialState: this.state.selected,
    })

    const onSelect = (event, idx = null) => {
        event.preventDefault()
        if (idx !== null) this.setState({...this.state, selectedSuggestion: idx})
        const name = this.state.suggestion[this.state.selectedSuggestion]
        alert(name)

        if (this.state.selected.includes(name)) return
        const prev = [...this.state.selected]
        if (this.state.selected.length === 5) prev.shift()
        this.setState({...this.state, selected: [...prev, name]})

        LocalStorage.setItem({...this.state})
    }

    const searchInput = new SearchInput({
        $app,
        initialState: this.state.searchTxt,
        searchTxtHandler: async text => {
            this.setState({...this.state, searchTxt: text})

            if (text === '') {
                this.setState({...this.state, suggestion: []})
                return
            }

            const check = cache[this.state.searchTxt] !== undefined
            let toSave = []
            if (check) toSave = cache[this.state.searchTxt]
            else {
                const res = await Helper.getSearchList(this.state.searchTxt)
                if (res !== null) {
                    cache[this.state.searchTxt] = res
                    toSave = res
                }
            }

            toSave = toSave.map(item => {
                const org = item
                let last = 0
                let str = ''
                while (item.length) {
                    const idx = item.toLowerCase().indexOf(this.state.searchTxt.toLowerCase())
                    if (idx === -1) {
                        str += item
                        break
                    }

                    str +=
                        org.slice(last, last + idx) +
                        `<span class="Suggestion__item--matched">${org.slice(last + idx, last + idx + this.state.searchTxt.length)}</span>`
                    item = item.slice(idx + this.state.searchTxt.length)
                    last = last + idx + this.state.searchTxt.length
                }
                return {org: org, display: str}
            })

            this.setState({...this.state, suggestion: toSave, selectedSuggestion: 0})

            LocalStorage.setItem({...this.state})
        },
        selectedHandler: value => {
            if (this.state.suggestion.length) {
                const val = this.state.selectedSuggestion + value
                let next = val
                if (val < 0) next = this.state.suggestion.length - 1
                else if (val >= this.state.suggestion.length) next = 0
                this.setState({...this.state, selectedSuggestion: next})

                LocalStorage.setItem({...this.state})
            }
        },
        onSelect: onSelect,
    })
    const suggestion = new Suggestion({
        $app,
        initialState: {list: this.state.suggestion, selected: this.state.selectedSuggestion},
        onSelect: onSelect,
    })

    this.setState = nextState => {
        this.state = nextState
        console.log('App.js state')
        console.log(this.state)
        suggestion.setState({list: this.state.suggestion, selected: this.state.selectedSuggestion})
        selectedLanguage.setState(this.state.selected)
    }

    const init = () => {
        const storageInfo = LocalStorage.getItem()
        if (storageInfo) {
            this.setState(storageInfo)
            searchInput.setState(this.state.searchTxt)
        }
    }

    init()
}
