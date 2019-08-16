<template>
  <div id="newsletter">
    <div class="newsletter-title">{{ $t('newsletter.title') }} {{ email }}</div>
    <form action="https://app.cyberimpact.com/optin" method="post" accept-charset="utf-8" target="_blank" onsubmit="submitFooterForm()">
      <fieldset>
        <legend></legend>
          <div class="newsletter-wrapper">
            <label for="ci_email" class="sr-only">Email</label>
            <input type="text" id="ci_email" name="ci_email" class="ci_email_footer" :placeholder="$t('newsletter.placeholder')" maxlength="255" :model="email"/>
            <button type="submit" value="Send" id="ci_submit" class="is-disabled"><i class="fa fa-arrow-right"></i></button>
        </div>
        <div style="display:block; visibility:hidden; height:1px;">
        <input style="display:none;" type="text" id="ci_verification" name="ci_verification" />
        <input type="hidden" id="ci_groups" name="ci_groups" value="6" />
        <input type="hidden" id="ci_account" name="ci_account" value="910db7f6-7751-4942-41d3-c59a8ef52f8f" />
        <input type="hidden" id="ci_language" name="ci_language" :value="`${locale}_ca`" />
        <input type="hidden" id="ci_sent_url" name="ci_sent_url" value="" />
        <input type="hidden" id="ci_error_url" name="ci_error_url" value="" />
        <input type="hidden" id="ci_confirm_url" name="ci_confirm_url" value="" />
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
  export default {
    computed: {
      locale() {
        return this.$store.state.i18n.locale;
      }
    },
    data() {
      return {
        email: ''
      };
    },
    methods: {
      validate() {
        console.log(event)
        //this.email = event.value;
      }
    }
  }
</script>