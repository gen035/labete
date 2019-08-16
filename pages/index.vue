<template>
  <section class="content">
    <section class="home-video-container">
      <video playsinline autoplay muted loop>
        <source :src="content.video.url" type="video/mp4">
        <source src="user/pages/01.home/video.ogg" type="video/ogg">
      </video>
    </section>
    <section class="home-banner">
      <div class="container">
        {{ content.hero_title[0].text }}
      </div>
    </section>
    <section
      v-if="cards"
      class="home-links-container"
    >
      <div class="container">
        <div class="row align-items-center">
          <div
            v-for="(card, index) in cards"
            class="col-md-4 home-links"
            :key="index"
          >
            <Card
              :card="card"
            />
          </div>
        </div>
      </div>
    </section>
    <template
      v-for="(block, index) in blocks"
    >
      <HomePageBlock
        :block="block"
        :index="index"
        :key="index"
      />
    </template>
    <section class="container home-images">
      <div class="row align-items-center">
        <div class="col-md-6 home-image">
          <Media
            classes="home-image3"
            :image="content.image_1"
          />
        </div>
        <div class="col-md-6 home-image">
          <Media
            classes="home-image3"
            :image="content.image_2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 home-image">
          <Media
            classes="home-image3"
            :image="content.image_3"
          />
        </div>
      </div>
    </section>
    <section class="home-bottom container-fluid">
      <div class="row no-gutters">
        <div class="offset-md-3 col-md-3">
          <div class="button">
            <NuxtLink 
              :to="localePath('stores')"
              exact
            >
              <p class="button-text" data-track="" data-track-category="home" data-track-action="click" data-track-label="home-store">
                  {{ $t('home.links.store')}}
              </p>
              <div class="button-icon-container">
                <p class="button-icon fa fa-map-marker"></p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="col-md-3">
          <div class="button">
            <a href="https://www.etsy.com/ca/shop/labetecreations" title="Online" target="_blank">
              <p class="button-text" data-track="" data-track-category="home" data-track-action="click" data-track-label="Online">
                  {{ $t('home.links.online')}}
              </p>
              <div class="button-icon-container">
                <p class="button-icon fa fa-shopping-bag"></p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import Media from '~/components/Media';
  import Card from '~/components/Card';
  import HomePageBlock from '~/components/HomePageBlock';

  export default {
    async asyncData({ app, error, store}) {
      const locale = store.state.i18n.locale;
      let content = []
      
      await app.$prismic.api.query(
        app.$prismic.predicates.at('document.type', 'home'), {
            lang: `${locale}-ca`
          }
        ).then((response) => {
          response.results.forEach(result => {
            content = result.data;
          });
        })

      let seo = await app.$prismic.api.getByID(content.seo.id)
      seo = seo.data;

      let cards = [];
      for (const card of content.cards) {
        const item = await app.$prismic.api.getByID(card.card.id);
        cards.push(item.data);
      }

      let blocks = [];
      for (const block of content.blocks) {
        const item = await app.$prismic.api.getByID(block.block.id);
        blocks.push(item.data);
      }

      if (content) {
        return {
          content,
          seo,
          blocks,
          cards
        }
      } else {
        error({ statusCode: 404, message: 'Page not found' })
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
    components: {
      Card,
      HomePageBlock,
      Media
    },
    nuxtI18n: {
      paths: {
        fr: '/',
        en: '/'
      }
    },
  }
</script>