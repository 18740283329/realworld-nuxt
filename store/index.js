// import myPlugin from 'myPlugin'

// export const plugins = [myPlugin]

const cookieparser = process.server ? require('cookieparser') : null;

export const state = () => ({
    user: null,
})

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.headers.cookie) {
            const { user } = cookieparser.parse(req.headers.cookie) || {};
            if (user) commit('setUser', JSON.parse(user))
        }
    }
}