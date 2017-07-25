import Vue from 'vue'
import Vuex from 'vuex'

import User from './user'
import Index from './navIndex'
import Grid from './gridActions'
import TrackVersion from './trackVersionForms'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    User,
    Index,
    Grid,
    TrackVersion
  }
})

export default store
