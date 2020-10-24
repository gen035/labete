export const state = () => ({
  newsletter: [],
  newsletterOpened: false,
  settings: []
})

export const mutations = {
  SET_NEWSLETTER(state, isOpened) {
    state.newsletterOpened = isOpened;
  },
  SET_NEWSLETTER_MODAL(state, modal) {
    state.newsletter = modal;
  },
  SET_SETTINGS(state, settings) {
    state.settings = settings;
  }
}
