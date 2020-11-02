<template>
  <div class="message-people-srch">
		<a-input-search class="mb-3" v-model="txtSearchMessage" placeholder="Search Message.." style="width: 100%" @change="searchMessage" />
	</div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      txtSearchMessage: ''
    }
  },
  methods: {
    searchMessage() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>