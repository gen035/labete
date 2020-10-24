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
  import NewsletterModal from './../components/NewsletterModal';
  export default {
    middleware: ['settings', 'newsletter'],
    components: {
      Footer,
      Header,
      MobileNav,
      NewsletterModal
    }
  }
</script>
