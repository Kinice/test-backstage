import Vue from 'vue'

export const BUTTON_CLICK = 'BUTTON_CLICK'
export const ROW_SELECT = 'ROW_SELECT'

export default {
    state: {
        buttonAction: {},
        rowAction: []
    },
    mutations: {
        [BUTTON_CLICK](state, data) {
            state.buttonAction = data
        },
        [ROW_SELECT](state, data) {
            state.rowAction = data
        }
    },
    actions: {
        [BUTTON_CLICK]({commit}, data) {
            commit(BUTTON_CLICK, data)
        },
        [ROW_SELECT]({commit}, data) {
            commit(ROW_SELECT, data)
        }
    }
}