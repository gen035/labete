<template>
  <VueSlickCarousel
    :arrows="data.arrows"
    :autoplay="data.autoplay"
    :autoplaySpeed="data.autoplay_speed"
    :dots="data.dots"
    :fade="data.fade"
    :infinite="data.infinite"
    :pauseOnHover="data.pause_on_hover"
    :slidesToShow="data.slides_to_show"
    :speed="data.speed"
  >
    <template v-for="(item, index) in data.slides">
      <img :key="index" :src="item.slide.url" :alt="item.slide.alt" />
    </template>
  </VueSlickCarousel>
</template>
<script>
  import VueSlickCarousel from 'vue-slick-carousel';
  import 'vue-slick-carousel/dist/vue-slick-carousel.css';

  export default {
    props: {
      data: {
        type: Object,
        require: true,
        default: () => ({})
      }
    },
    computed: {
      linkTarget() {
        if (this.card.link.url.indexOf('etsy') === -1) {
          return "_self"
        } else {
          return "_blank"
        }
      }
    },
    components: {
      VueSlickCarousel
    }
  }
</script>
