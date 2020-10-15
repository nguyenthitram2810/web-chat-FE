<template>
  <section>
		<div class="gap2 no-gap gray-bg">
			<div class="container-fluid px-0">
				<div class="row">
					<div class="col-lg-12 px-0">
						<SideBar/>
            <a-empty style="height: 638px;" class="d-flex align-items-center justify-content-around" :description="false" />
					</div>
				</div>
			</div>
		</div>	
	</section><!-- content -->
</template>

<script>
import SideBar from "~/components/v-layout/SideBar"

export default {
  middleware: "authentication",
  components: {
    SideBar
  },
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 500px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
