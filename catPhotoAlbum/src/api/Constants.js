class Constants {
    API_UPLOAD_FILE_NOBASE = 'route.php?F=Routable.uploadFile.raw'
    APP_ID = 23

    URL = 'http://theosnara.com'
    // URL = 'http://172.30.1.27'

    BASE_URL = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/`
    BASE_IMG_URL = this.URL

    UPLOAD_IMG_FNAME = 'uploadImage.png'
    UPLOAD_PROFILE_FNAME = 'proFileImg.png'

    IAMPORT_KEY = '#'
    IAMPORT_API_KEY = '#'
    IAMPORT_API_SEC = '#'

    KAKAO_API_KEY = '#'
    KAKAO_API_CALLBACK = encodeURIComponent('http://theosnara.com/reconst/oauth.php')

    API_DOWNLOAD_FILE = `${this.BASE_URL}route.php?F=BoardRoute.downloadFileById`
}

export default new Constants()
