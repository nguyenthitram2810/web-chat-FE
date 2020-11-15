<template>
  <div class="call-wraper active">
		<div class="m-live-calling">
			<!-- <figure><img src="images/resources/author.jpg" alt=""></figure> -->
			<div class="call-box">
				<h6>Jack Carter</h6>
				<span>incoming call</span>
				<i class="ti-microphone"></i>
				<div class="wave">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
				<div class="yesorno">
					<a @click="cancel" class="bg-red decline-call" title=""><i class="fa fa-close"></i></a>
				</div>
			</div>
		</div>
	</div><!-- audio video call popup -->
</template>

<script>
export default {
  name: 'Call',
  methods: {  
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>