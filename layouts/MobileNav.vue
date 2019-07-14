<template>
  <ul class="mobile-nav">
    <li
      v-for="(link, index) in  nav"
      :key="index"
    >
      <NuxtLink 
        :to="localePath(link.name)"
        exact
      >
        {{ link.text }}
      </NuxtLink>
    </li>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        nav: []
      }
    },
    created() {
      const links = this.$t('nav.links');
  
      links.map((item) => {
        this.nav.push(item);
      });
    },
    methods: {
      openMobileNav() {
        const { body } = document;
        body.classList.toggle('is-nav-opened');
      }
    }
  }
</script>