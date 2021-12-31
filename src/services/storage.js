const sessionStore = (key, item) => {
    sessionStorage.setItem(key, item);
}

const sessionGet = (key) => {
    return sessionStorage.getItem(key);
}

const cacheStore = (key, item) => {
    localStorage.setItem(key, item);
}

const cacheGet = (key) => {
    return localStorage.getItem();
}

const AppStorage = {
    sessionGet,
    sessionStore,
    cacheGet,
    cacheStore
}
export default AppStorage;