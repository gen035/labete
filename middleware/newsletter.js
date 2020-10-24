export default function({ app, store }) {
  return app.$prismic.api.query(
    app.$prismic.predicates.at('document.type', 'newslettermodal'), {
      lang: `${app.store.state.i18n.locale}-ca`
    }
  ).then((response) => {
    response.results.forEach(result => {
      store.commit('SET_NEWSLETTER_MODAL', result.data);
    });
  })
}