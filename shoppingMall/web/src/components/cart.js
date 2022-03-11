const API_BASE = 'https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products'

const Helper = {
    getProducts: async (id = null) => {
        const url = `${API_BASE}${id ? `/${id}` : ''}`
        try {
            const res = await fetch(url)
            if (res.ok) return await res.json()
            else return null
        } catch (err) {
            console.log(err)
        }
    },
}

export default Helper
