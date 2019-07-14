export const state = () => ({
  settings: []
})

export const mutations = {
  SET_SETTINGS(state, settings) {
    state.settings = settings;
  }
}
