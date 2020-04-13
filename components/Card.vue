<template>
  <a
    :target="linkTarget"
    :href="card.link.url"
    :title="card.title[0].text"
  >
    <Media
      classes="d-none d-md-block d-lg-block"
      :image="card.image"
    />
    <Media
      classes="d-block d-md-none d-lg-none"
      :image="card.image_mobile"
    />
    <p>{{ card.title[0].text }}</p>
  </a>
</template>
<script>
  import Media from '~/components/Media';

  export default {
    props: {
      card: {
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
      Media
    }
  }
</script>
