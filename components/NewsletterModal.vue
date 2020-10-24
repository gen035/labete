<template>
  <div class="newsletterModalWrapper" v-if="this.$store.state.newsletterOpened">
    <div class="newsletterModal">
      <i class="far fa-times-circle newsletterModal-close" v-on:click="close"></i>
      <div class="newsletterModal-img" v-bind:style="{ 'background-image': 'url(' + image.url +')' }"></div>
      <div class="newsletterModal-content">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <Newsletter :isModal="true" />
      </div>
    </div>
  </div>
</template>
<script>
  import Media from '~/components/Media';
  import Newsletter from '~/components/Newsletter';
  export default {
    created() {
      const hasCookie = this.$cookies.get('labete_newsletter');

      if(!hasCookie) {
        this.$store.commit('SET_NEWSLETTER', true);
      }
    },
    data() {
      return {
        title: this.$store.state.newsletter.title,
        description: this.$store.state.newsletter.description,
        image: this.$store.state.newsletter.image
      }
    },
    methods: {
      close() {
        this.$store.commit('SET_NEWSLETTER', false);
        this.$cookies.set(
          'labete_newsletter',
          true,
          {
            maxAge: 1 * 24 * 60 * 60
          }
        );
      }
    },
    components: {
      Media,
      Newsletter
    }
  }
</script>