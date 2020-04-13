<template>
  <section
    class="home-page-block container-fluid">
    <div
      :class="`row ${isOdd}`"
    >
      <div class="col-md-6 d-flex align-items-center home-page-block-text">
        <div>
          <p v-html="$prismic.asHtml(block.description)" />
        </div>
      </div>
      <div class="col-md-6 home-page-block-img">
        <Media
          :image="block.image"
        />
      </div>
    </div>
  </section>
</template>
<script>
  import Media from '~/components/Media';

  export default {
    props: {
      block: {
        type: Object,
        require: true,
        default: () => ({})
      },
      index: {
        type: Number,
        require: true,
        default: 0
      }
    },
    computed: {
      isOdd() {
        if (this.index % 2 === 1) {
          return 'flex-row-reverse';
        }
        return ''
      }
    },
    components: {
      Media
    }
  }
</script>