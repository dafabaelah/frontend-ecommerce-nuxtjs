export const state = () => ({
    isOnline: true
})

export const mutations = {
    SET_ONLINE_STATUS(state, status) {
        state.isOnline = status
    }
}

export const actions = {
    nuxtServerInit({ commit }) {
        // Inisialisasi status jaringan saat server init
        commit('SET_ONLINE_STATUS', true)
    }
}