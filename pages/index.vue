<template>
  <section>
		<div class="gap2 no-gap gray-bg">
			<div class="container-fluid px-0">
				<div class="row">
					<div class="col-lg-12 px-0">
						<div class="message-users">
							<div class="message-head">
								<h4>Chat Messages</h4>
								<div class="more">
									<div class="more-post-optns"><a-icon type="setting" />
										<ul>
											<li><i class="fa fa-wrench"></i>Setting</li>
											<li><i class="fa fa-envelope-open"></i>Active Contacts</li>
											<li><i class="fa fa-folder-open"></i>Archives Chats</li>
											<li><i class="fa fa-eye-slash"></i>Unread Chats</li>
											<li><i class="fa fa-flag"></i>Report a problem</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="message-people-srch">
								<form method="post">
									<input type="text" placeholder="Search Friend..">
									<button type="submit"><i class="fa fa-search"></i></button>
								</form>
								<a-dropdown class="btn-group add-group align-right">
                  <a-menu slot="overlay" @click="handleMenuClick">
                    <a-menu-item key="1" class="dropdown-item"> <a-icon type="user-add" />New user</a-menu-item>
                    <a-menu-item key="2" class="dropdown-item"> <a-icon type="usergroup-add" />New Group </a-menu-item>
                  </a-menu>
                  <a-button class="btn group dropdown-toggle" style="margin-left: 8px"> Create <a-icon type="down" /> </a-button>
                </a-dropdown>
							</div>

							<div class="mesg-peple">
								<ul class="nav nav-tabs nav-tabs--vertical msg-pepl-list">
									<li class="nav-item unread">
										<a class="active" href="#link1" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-online"></span>
											</figure>
											<div class="user-name">
												<h6 class="">Andrew</h6>
												<span>you send a video - 2hrs ago</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>
													</ul>
												</div>
											</div>
										</a>
									</li>
									<li class="nav-item ">
										<a class="" href="#link2" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-away"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Jack Carter</h6>
												<span>you send a audio - Tue</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item ">
										<a class="" href="#link3" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-away"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Julie Robert</h6>
												<span>hi, i am julie - wed</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item ">
										<a class="" href="#link4" data-toggle="tab">
                      <figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Jhon Doe</h6>
												<span>May i come to.. - Thr</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item unread ">
										<a class="" href="#link5" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Single Men</h6>
												<span>hello? - a days ago</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item ">
										<a class="" href="#link6" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Sarah Jane</h6>
												<span>she send a video - a days ago</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item ">
										<a class="" href="#link7" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="">Julie Robert</h6>
												<span>She send a file - 22 jan</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item unread ">
										<a class="" href="#link8" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Frank Will</h6>
												<span>You there ? - a days ago</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item ">
										<a class="" href="#link9" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="unread">Niclos Cage</h6>
												<span>you send a video - wed</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
									<li class="nav-item ">
										<a class="" href="#link10" data-toggle="tab">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												<span class="status f-offline"></span>
											</figure>
											<div class="user-name">
												<h6 class="">kelly Quin</h6>
												<span>Hi dude.. - 23 feb</span>
											</div>
											<div class="more">
												<div class="more-post-optns"><i class="ti-more-alt"></i>
													<ul>
														<li><i class="fa fa-bell-slash-o"></i>Mute</li>
														<li><i class="ti-trash"></i>Delete</li>
														<li><i class="fa fa-folder-open-o"></i>Archive</li>
														<li><i class="fa fa-ban"></i>Block</li>
														<li><i class="fa fa-eye-slash"></i>Ignore Message</li>
														<li><i class="fa fa-envelope"></i>Mark Unread</li>

													</ul>
												</div>
											</div>
										</a>

									</li>
								</ul>
							</div>
						</div>
						<div class="tab-content messenger">
							<div class="tab-pane active fade show " id="link1" >
								<div class="row merged">
									<div class="col-lg-12">
										<div class="mesg-area-head">
											<div class="active-user">
												<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
												  <span class="status f-offline"></span>
											  </figure>
												<div>
													<h6 class="unread">Andrew</h6>
													<span>Online</span>
												</div>
											</div>
											<ul class="live-calls">
												<li class="audio-call"><span class="fa fa-phone"></span></li>
												<li class="video-call"><span class="fa fa-video"></span></li>
												<li class="uzr-info"><span class="fa fa-info-circle"></span></li>
												<!-- <li>
                          <a-dropdown>
                            <a-menu slot="overlay">
                              <a-menu-item key="1"> <i class="ti-headphone-alt"></i>Voice Call </a-menu-item>
                              <a-menu-item key="2"> <i class="ti-video-camera"></i>Video Call </a-menu-item>
                            </a-menu>
                            <span><a-icon type="appstore" /></span>
                          </a-dropdown>
												</li> -->
											</ul>
										</div>
									</div>
									<div class="col-lg-8 col-md-8">
										<div class="mesge-area">
											<ul class="conversations">
												<li>
													<!-- <figure><img src="images/resources/user1.jpg" alt=""></figure> -->
													<div class="text-box">
														<p>HI, i have faced a problem with your software. are you available now</p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:32PM</span>
													</div>
												</li>
												<li class="me">
													<!-- <figure><img src="images/resources/user2.jpg" alt=""></figure> -->
													<div class="text-box">
														<p>HI, i have checked about your query, there is no any problem like that...</p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:35PM</span>
													</div>
												</li>
												<li class="you">
													<!-- <figure><img src="images/resources/user1.jpg" alt=""></figure> -->
													<div class="text-box">
														<p>
															thank you for your quick reply, i am sending you a screenshot
															<!-- <img src="images/resources/screenshot-messenger.jpg" alt=""> -->
															<em>Size: 106kb <ins>download Complete</ins></em>
														</p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:36PM</span>
													</div>
												</li>
												<li class="me">
													<!-- <figure><img src="images/resources/user2.jpg" alt=""></figure> -->
													<div class="text-box">
														<p>Yes, i have to see, please follow the below link.. <a href="#" title="">https://www.abc.com</a></p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:38PM</span>
													</div>
												</li>
												<li class="me">
													<!-- <figure><img src="images/resources/user2.jpg" alt=""></figure> -->
													<div class="text-box">
														<p>
															Dear You May again download the package directly.. 
															<span><ins>File.txt</ins> <i class="fa fa-file"></i> 30MB download complete</span>
														</p>
														<span><i class="ti-check"></i><i class="ti-check"></i> 2:40PM</span>
													</div>
												</li>
												<li class="you">
													<!-- <figure><img src="images/resources/user1.jpg" alt=""></figure> -->
													<div class="text-box">
														<div class="wave">
															<span class="dot"></span>
															<span class="dot"></span>
															<span class="dot"></span>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div class="message-writing-box">
											<form method="post">
												<div class="text-area">
													<input type="text" placeholder="write your message here..">
													<a-button @click="sendMessage"><i class="far fa-paper-plane"></i></a-button>
												</div>
											</form>
										</div>
									</div>
									<div class="col-lg-4 col-md-4">
										<div class="chater-info">
											<figure><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""></figure>
											<h6>Andrew</h6>
											<span>Online</span>
											<div class="userabout">
												<span>About</span>
												<p>I love reading, traveling and discovering new things. You need to be happy in life.</p>
												<ul>
													<li><span>Phone:</span> +123976980</li>
													<li><span>Website:</span> <a href="#" title="">www.abc.com</a></li>
													<li><span>Email:</span> <a href="http://wpkixx.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="1c6f7d716c70795c7b717d7570327f7371">[email&#160;protected]</a></li>
													<li><span>Phone:</span> Ontario, Canada</li>
												</ul>
												<div class="media">
													<span>Media</span>
													<!-- <ul>
														<li><img src="images/resources/audio-user1.jpg" alt=""></li>
														<li><img src="images/resources/audio-user2.jpg" alt=""></li>
														<li><img src="images/resources/audio-user3.jpg" alt=""></li>
														<li><img src="images/resources/audio-user4.jpg" alt=""></li>
														<li><img src="images/resources/audio-user5.jpg" alt=""></li>
														<li><img src="images/resources/audio-user6.jpg" alt=""></li>
														<li><img src="images/resources/admin2.jpg" alt=""></li>
														<li><img src="images/resources/audio-user1.jpg" alt=""></li>
														<li><img src="images/resources/audio-user4.jpg" alt=""></li>
														<li><img src="images/resources/audio-user3.jpg" alt=""></li>
													</ul> -->
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</section><!-- content -->
</template>

<script>

export default {
  middleware: "authentication",
  methods: {
    logout() {
      localStorage.removeItem("currentUser")
    }, 
    sendMessage() {

    }
  }
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
