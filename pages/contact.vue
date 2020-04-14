<template>
  <section class="content">
      <section class="container">
        <div class="row">
            <div
              v-html="$prismic.asHtml(content.title)"
              class="col-md-12"
            />
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-4">
            <div class="contact-item">
              <a :href="`tel:+${formattedPhone}`" title="Telephone" data-track="" data-track-category="contact" data-track-action="click" data-track-label="telephone">
                <h2>{{ $t('contact.phone') }}</h2>
                <p>{{ content.phone[0].text }}</p>
              </a>
            </div>
            <div class="contact-item">
              <a :href="`mailto:${content.email[0].text}`" title="courriel" data-track="" data-track-category="contact" data-track-action="click" data-track-label="courriel">
                <h2>{{ $t('contact.email') }}</h2>
                <p>{{ content.email[0].text }}</p>
              </a>
            </div>
            <div class="contact-item">
              <a :href="`${content.facebook_messenger[0].text}`" title="messenger" data-track="" data-track-category="contact" data-track-action="click" data-track-label="messenger" target="_blank">
                <h2>Messenger <i class="fab fa-facebook-messenger"></i></h2>
              </a>
            </div>
            <div class="contact-item">
              <a :href="`${content.instagram[0].text}`" title="instagram" data-track="" data-track-category="contact" data-track-action="click" data-track-label="insta" target="_blank">
                <h2>Instagram</h2>
                <p>@labetecreation</p>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <img :src="content.image.url" :alt="$t('contact.alt')" class="contact-img-1" />
            <img :src="content.image_mobile.url" :alt="$t('contact.alt')" class="contact-img-2" />
          </div>
        </div>
        <div class="row justify-content-center contact-downloads">
          <div
            v-for="(document, index) in content.documents"
            :key="index"
            class="col-md-4"
          >
            <h2 class="title-h2">{{ document.name[0].text }}</h2>
            <div class="button" data-track="" data-track-category="download" data-track-action="click" :data-track-label="document.document.name">
              <a :href="document.document.url" :title="document.document.name">
                <p class="button-text">
                  {{ document.boutton[0].text }}
                </p>
                <div class="button-icon-container">
                  <p class="button-icon fas fa-download"></p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
  </section>
</template>

<script>
  export default {
    async asyncData({ app, error, store }) {
      const locale = store.state.i18n.locale;
      let content = []

      await app.$prismic.api.query(
        app.$prismic.predicates.at('document.type', 'contact'), {
           lang: `${locale}-ca`
        }
      ).then((response) => {
        response.results.forEach(result => {
          content = result.data;
        });
      })

      let seo = await app.$prismic.api.getByID(content.seo.id)
      seo = seo.data;

      if (content) {
        return {
          content,
          seo
        }
      } else {
        error({ statusCode: 404, message: 'Page not found' })
      }
    },
    computed: {
      formattedPhone() {
        if(this.content.phone[0].text) {
          return this.content.phone[0].text.split('-').join('');
        }
      }
    },
    head() {
      return {
        title: this.$prismic.asText(this.seo.title),
        link: [
        //{ rel: 'canonical', href: `https://<DOMAIN>${this.$prismic.linkResolver(this.document)}` }
        ],
        meta: [
          { hid: 'description', name: 'description', content: this.$prismic.asText(this.seo.description) }
        ]
      }
    },
    nuxtI18n: {
      paths: {
        fr: '/contact',
        en: '/contact'
      }
    },
  }
</script>
