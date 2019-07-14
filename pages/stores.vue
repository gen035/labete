<template>
  <div>
    <GmapMap
      :center="{
        lat: userLat,
        lng: userLong
      }"
      :zoom="7"
      id="map"
      map-type-id="roadmap"
    >
      <gmap-custom-marker
        :key="index"
        v-for="(store, index) in stores"
        :marker="{
          lat: store.coordinates.latitude,
          lng: store.coordinates.longitude
        }"
        @click.native="toggleInfoWindow(store.coordinates.latitude, store.coordinates.longitude, index)"
      >
        <img src="//prismic-io.s3.amazonaws.com/labete%2Fd240ef5e-8063-47e8-a504-d4ea5ad80d7c_marker.svg" height="30"/>
      </gmap-custom-marker>
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @close="infoWinOpen = false"
      >
        {{ this.infoContent }}
      </GmapInfoWindow>
    </GmapMap>
    <section class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>{{ content.title[0].text }}</h1>
        </div>
      </div>
      <div class="row">
        <Store
          v-for="(store, index) in stores"
          :key="index"
          :store="store"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import Store from '~/components/Store';
  import GmapCustomMarker from 'vue2-gmap-custom-marker';

  export default {
    async asyncData({ app, error, store }) {
      const locale = store.state.i18n.locale;
      let stores = [];
      let content = []

      await app.$prismic.api.query(
        app.$prismic.predicates.at('document.type', 'storespage'), {
           lang: `${locale}-ca`
        }
      ).then((response) => {
         response.results.forEach(result => {
          content = result.data;
        });
      })

      await app.$prismic.api.query(
        app.$prismic.predicates.at('document.type', 'store'), {
           lang: `${locale}-ca`
        }
      ).then((response) => {
        response.results.forEach(result => {
          stores.push(result.data);
        });
      })

      let seo = await app.$prismic.api.getByID(content.seo.id)
      seo = seo.data;

      return {
        content,
        seo,
        stores
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
    data() {
      return {
        userLat: 45.5088400,
        userLong: -73.5878100,
        infoWindowOpen: false,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        infoWindowPos: null,
        currentMidx: null,
        infoWinOpen: false,
        infoContent: ''
      }
    },
    components: {
      Store,
      GmapCustomMarker
    },
    mounted() {
      this.userRegion();
    },
    methods: {
      userRegion() {
        const savedRegion = localStorage.getItem('region');
        if (savedRegion) {
          this.setLatLong(savedRegion)
        } else {
          this.fetchRegion()
        }
      },
      fetchRegion() {
        this.$axios.$get('https://api.ipdata.co/?api-key=8876626da10db1d6cfdf6b1a0c76e6afad9460a2b2f9b2806d9e1e39')
          .then((response) => {
            const region = response.region_code;

            localStorage.setItem('region', region);
            setLatLong(region);
          })
          .catch((error) => {
            console.log('ERROR')
          })
      },
      setLatLong(region) {
        if (region == 'BC' || region == 'AB') {
          this.userLat = 51.3962164;
          this.userLong = -116.4945477;
        }
      },
      toggleInfoWindow(lat, long, index) {

        this.infoWindowPos = {lat: lat, lng: long};
        this.infoContent = this.stores[index].name[0].text;

        if (this.currentMidx == index) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        else {
          this.infoWinOpen = true;
          this.currentMidx = index;
        }
      }
    },
    nuxtI18n: {
      paths: {
        fr: '/points-de-ventes',
        en: '/stores'
      }
    },
  }
</script>
