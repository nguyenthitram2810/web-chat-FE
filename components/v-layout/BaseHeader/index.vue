<template>
  <a-layout-header>
	  <div class="logo" />
	</a-layout-header>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
export default {
  name: 'BaseHeader',
  props: {},

  methods: {
    loggOut () {
      this.$store.dispatch('auth/signOut', {vue: this})
    }
  }
}
</script>
