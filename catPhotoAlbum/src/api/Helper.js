import Constants from '../api/Constants.js'
import ReturnModel from '../models/ReturnModel.js'


const Helper = {
    getList: async (id='') => {
        const api = `${Constants.BASE_URL}/${id}`
        const ret = {...ReturnModel}
        try {
            // throw new Error('error test')
            const res = await fetch(api)
            if(res.ok) ret.data = await res.json()
            else {
                ret.returnCode = -1
                ret.returnMessage = res.statusText
            }
            return ret
        } catch (err){
            ret.returnCode = -1
            ret.returnMessage = err.message
            return ret
        }
    },
    //TODO POST
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         title: "Test",
    //         body: "I am testing!",
    //         userId: 1,
    //     }),
    // }).then((response) => console.log(response));

    // findPass: (email, pw) => {
    //     return new Promise( (resolve, reject) => {
    //         Log.info(Constants.API_FIND_USER)
    //         let params = new URLSearchParams()
    //         params.append('email', email)
    //         params.append('name', pw)
    //
    //         axios.post(Constants.API_FIND_USER, params)
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(new Error(err)))
    //     })
    // },

    // setProfileImg: (userId, uri) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_SET_PROFILE_IMG
    //         Log.info(api)
    //         const formData = new FormData()
    //         formData.append('userId', userId)
    //         formData.append('img[]', {
    //             uri: uri,
    //             type: 'image/png',
    //             name: Constants.UPLOAD_PROFILE_FNAME
    //         })
    //
    //         axios({
    //             url: api,
    //             method: 'POST',
    //             data: formData,
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-type': 'multipart/form-data',
    //             }
    //         }).then(res => resolve(res.data)).catch(err => reject(err))
    //
    //     })
    // },
}
export default Helper
