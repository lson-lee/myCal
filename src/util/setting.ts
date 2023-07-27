import store from '@/store'
export const getSetting = (option) => {
    return store.state.setting[option];
}

export const setSetting = (option, value) => {
    return store.commit('setSetting', {
        key: option,
        value
    })
}