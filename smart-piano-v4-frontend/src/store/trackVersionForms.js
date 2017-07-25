import Vue from 'vue'

export const EDIT_ONE = 'EDIT_ONE'
export const EDIT_BATCH = 'EDIT_BATCH'

export default {
    state: {
        oneForm: {},
        batchForm: {} 
    },
    mutations: {
        [EDIT_ONE](state, data) {
            state.oneForm = data
        },
        [EDIT_BATCH](state, data) {
            state.batchForm = data
        }
    },
    actions: {
        [EDIT_ONE]({commit}, data) {
            commit(EDIT_ONE, data)
        },
        [EDIT_BATCH]({commit}, data) {
            commit(EDIT_BATCH, data)
        }
    }
}