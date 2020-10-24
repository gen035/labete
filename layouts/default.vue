<template>
  <div :class="$route.name">
    <Header />
    <nuxt />
    <MobileNav />
    <Footer />
  </div>
</template>
<script>
  import Footer from './Footer';
  import Header from './Header';
  import MobileNav from './MobileNav';

  export default {
    middleware: ['settings'],
    components: {
      Footer,
      Header,
      MobileNav
    }
  }
</script>
