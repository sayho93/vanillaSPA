import Constants from '../api/Constants.js'
import ReturnModel from '../models/ReturnModel.js'

const BASE_URL = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev`
const API_CAT = `${BASE_URL}/`

const Helper = {
    getList: async id => {
        const api = `${API_CAT}${id}`
        try {
            const res = await fetch(api)
            return res.json()
            if(!res.ok) throw new Error(res.statusText)
        } catch (err){
            throw new Error(err.message)
        }

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
    },
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
    // checkNick: nick => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_CHEK_NICK
    //         Log.info(api)
    //         axios.get(api, {params: {nick: nick}})
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // sendAuthSMS: (phone) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_SEND_AUTH_SMS
    //         Log.info(api)
    //         const postParams = new URLSearchParams({to: phone})
    //         axios.post(api, postParams)
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // checkSMS: (phone, code) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_CHECK_SMS
    //         Log.info(api)
    //         const postParams = new URLSearchParams({to: phone, code: code})
    //         axios.post(api, postParams)
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // join: params => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_JOIN
    //         Log.info(api)
    //         const postParams = new URLSearchParams(params)
    //         axios.post(api, postParams)
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
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
    // updateUser: (userId, field, value) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_UPDATE_USER
    //         Log.info(api)
    //         axios.post(api, new URLSearchParams({id: userId, field: field, content: value}))
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // procFilesUnbound: (userId, file) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_PROC_FILE_UNBOUND
    //         Log.info(api)
    //         const formData = new FormData()
    //         formData.append('userKey', userId)
    //         formData.append('file[]', {
    //             uri: file.uri,
    //             name: file.name === undefined ? Constants.UPLOAD_IMG_FNAME : file.name
    //         })
    //         axios({
    //             url: api,
    //             method: 'POST',
    //             data: formData,
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-type': 'multipart/form-data',
    //             }
    //         })
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // revertUploadedData: id => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_REVERT_UPLOAD
    //         Log.info(api)
    //         axios.get(api, {params: {id: id}})
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    //
    // getBoardList: (params) => {
    //     return new Promise( (resolve, reject) => {
    //         Log.info(`${Constants.API_GET_BOARD}`)
    //         const postParams = new URLSearchParams()
    //         for(let key in params)
    //             postParams.append(key, params[key])
    //         axios.post(`${Constants.API_GET_BOARD}`, postParams)
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // getZipList: () => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_GET_ZIP
    //         Log.info(api)
    //         axios.get(api)
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // getZipMapList: (id) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_GET_ZIP_MAP
    //         Log.info(api)
    //         axios.get(api, {params: {sidoID: id}})
    //             .then(res => resolve(res.data.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // getHomophoneOptions: (depth) => {
    //     return new Promise((resolve, reject) => {
    //         const api = Constants.API_GET_HOMOPHONE_OPTIONS
    //         axios.get(api, {params: {depth: depth}})
    //             .then(res => resolve(res.data))
    //             .catch(err => reject(err))
    //     })
    // },
    // getBoardItem: async (type, id, userId) => {
    //     const retVal = {...ReturnModel}
    //     try{
    //         const params = (token) => {
    //             return {params: {id: token}}
    //         }
    //         await axios.get(Constants.API_HIT_BOARD, params(id))
    //         let res = await axios.get(Constants.API_GET_BOARD_ITEM, params(id))
    //         retVal.data = res.data
    //         res = await axios.get(Constants.API_GET_BOARD_FILES, params(id))
    //         retVal.data.files = res.data
    //         res = await axios.get(Constants.API_GET_BOARD_REPLIES, params(id))
    //         retVal.data.replies = res.data
    //
    //         if(type === 0 || type === 1){
    //             res = await axios.get(Constants.API_GET_RECRUIT, params(id))
    //             retVal.data.recruit = res.data
    //             res = await axios.get(Constants.API_GET_MY_ARTICLE, params(userId))
    //             retVal.data.myArticles = res.data
    //             res = await axios.get(Constants.API_BOARD_IS_SENT_REQUEST, {params: {id: id, userId: userId}})
    //             retVal.data.isSent = res.data
    //             res = await axios.get(Constants.API_GET_BOARD_LINKS, params(id))
    //             retVal.data.links = res.data
    //         }
    //     } catch (err){
    //         retVal.returnCode = -1
    //     }
    //     return retVal
    // },
}
export default Helper
