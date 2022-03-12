const API_END = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev'

const Helper = {
    getSearchList: async keyword => {
        const url = `${API_END}/languages?${keyword ? `keyword=${keyword}` : ''}`
        console.log(url)
        try {
            const res = await fetch(url)
            if (res.ok) return await res.json()
            else {
                alert('Something went wrong!')
                return null
            }
        } catch (err) {
            console.log(err)
            alert(err.message)
            return null
        }
    },
}

export default Helper
