<template>
  <a-layout>
    <BaseHeader />
    <nuxt />
  </a-layout>
</template>

<script>
import BaseHeader from '~/components/v-layout/BaseHeader'
import BaseFooter from '~/components/v-layout/BaseFooter'

export default {
  name: 'DefaultLayout',
  middleware: "authentication",
  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>
