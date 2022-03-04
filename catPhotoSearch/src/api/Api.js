const API_ENDPOINT = 'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev/api'

const ReturnModel = {
    returnCode: 1,
    returnMessage: null,
    data: null,
}

const Helper = async url => {
    console.log('API:::::::', url)
    const ret = {...ReturnModel}
    try {
        const res = await fetch(url)
        if (res.ok) ret.data = await res.json()
        else {
            ret.returnCode = -1
            ret.returnMessage = `${res.status} error`
        }
        return ret
    } catch (err) {
        ret.returnCode = -2
        ret.returnMessage = err.message
        return ret
    }
}

const api = {
    fetchCats: (keyword, page = '') => Helper(`${API_ENDPOINT}/cats/search?q=${keyword}&page=${page}`),
    fetchCatInfo: (id = '') => Helper(`${API_ENDPOINT}/cats/${id}`),
    fetchRandom: (page = '') => Helper(`${API_ENDPOINT}/cats/random50?page=${page}`),
}

export default api
