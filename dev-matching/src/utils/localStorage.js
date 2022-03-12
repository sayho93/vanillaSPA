const STORAGE_KEY = 'DEV_MATCHING'

const LocalStorage = {
    setItem: item => localStorage.setItem(STORAGE_KEY, JSON.stringify(item)),
    getItem: () => JSON.parse(localStorage.getItem(STORAGE_KEY)),
    removeItem: () => localStorage.removeItem(STORAGE_KEY),
}

export default LocalStorage
