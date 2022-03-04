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
            ret.returnMessage = res.status
        }
        return ret
    } catch (err) {
        ret.returnCode = -2
        ret.returnMessage = err.message
        return ret
    }
}

const api = {
    fetchCats: keyword => Helper(`${API_ENDPOINT}/cats/search?q=${keyword}`),
    fetchCatInfo: (id = '') => Helper(`${API_ENDPOINT}/cats/${id}`),
    fetchRandom: () => Helper(`${API_ENDPOINT}/cats/random50`),
}

export default api
