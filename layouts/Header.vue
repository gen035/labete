<template>
  <div>
    <div class="top-bar">
      <ul class="top-bar-list">
        <li class="d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">
          <NuxtLink 
            :to="localePath('stores')"
            active-class="active"
            exact
          >
            <i class="fas fa-map-marker-alt"></i>
            {{ $t('top.store') }}
          </NuxtLink>
        </li>
        <li class="d-none d-sm-inline-block d-md-inline-block d-lg-inline-block">
          <a :href="$t('top.online.link')" title="Etsy" data-track="" data-track-category="topNav" data-track-action="click" data-track-label="Acheter en ligne" target="_blank">
            <i class="fas fa-shopping-bag"></i>
              {{ $t('top.online.text') }}
          </a>
        </li>
        <li>
          <Nuxt-link :to="switchLocalePath('fr')">Français</Nuxt-link>
        </li>
        <li>
          <Nuxt-link :to="switchLocalePath('en')">English</Nuxt-link>
        </li>
      </ul>
    </div>
    <header class="header container">
      <div class="row align-items-center">
        <div class="col-8 col-sm-12 col-md-4 header-logo-wrapper">
          <a href="/" title="La Bete" data-track="" data-track-category="nav" data-track-action="click" data-track-label="Logo">
            <Media
              classes="header-logo"
              :image="this.$store.state.settings.header_logo"
            />
          </a>
        </div>
        <div class="col-md-8 col-sm-12 header-nav-wrapper">
          <ul class="nav">
             <li
                v-for="(link, index) in  nav"
                :key="index"
              >
                <NuxtLink 
                  :to="localePath(link.name)"
                  active-class="active"
                  exact
                >
                  {{ link.text }}
                </NuxtLink>
              </li>
          </ul>
        </div>
        <div class="col-4 nav-mobile-trigger" @click="toggleMobileNav">
          <span>Menu<i class="fa fa-chevron-down"></i></span>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
  import Media from '~/components/Media';
  export default {
    computed: {
      locale() {
        return this.$store.state.i18n.locale;
      }
    },
    data() {
      return {
        nav: [],
      }
    },
    created() {
      this.getNavLinks();
    },
    watch: {
      locale() {
        this.getNavLinks();
      }
    },
    methods: {
      toggleMobileNav() {
        const { body } = document;
        body.classList.toggle('is-nav-opened');
      },
      getNavLinks() {
        const links = this.$t('nav.links');
        this.nav = [];

        links.map((item) => {
          this.nav.push(item);
        });
      }
    },
    components: {
      Media
    }
  }
</script>
