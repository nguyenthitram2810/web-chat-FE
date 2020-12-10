<template>
  <video ref="remotelVideo" class="col video__remote m-auto" autoplay></video>
</template>
<script>
export default {
  name: "Video", 
  props: ["peer"], 
  created() {
    this.peer.on("stream", stream => {
      this.$refs.remotelVideo.srcObject = stream;
    })
  }
}
</script>
