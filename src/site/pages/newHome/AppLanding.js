import React from 'react';
import {ParallaxProvider} from 'react-scroll-parallax';
import {Col, Container, Row} from 'reactstrap';
import KeyFeatures from './KeyFeatures';

const AppLanding = () => {
    return (
        <div>
<section class="banner bg-1" id="home">
	<div class="container">
		<div class="row">
			<div class="col-md-8 align-self-center">
			 
				<div class="content-block">
					<h1>Amazing App Best for business</h1>
					<h5>Let you track everything in your life with a simple way</h5>
				 
					<div class="app-badge">
						<ul class="list-inline">
							<li class="list-inline-item">
								<a href="#" class="btn btn-download"><i class="ti-android"></i>
									<div>Get it on the<span>GOOGLE PLAY</span></div>
								</a>
							</li>
							<li class="list-inline-item">
								<a href="#" class="btn btn-download"><i class="ti-apple"></i>
									<div>Available on the<span>Apple store</span></div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				
				<div class="image-block">
					<img class="img-fluid phone-thumb" src="images/phones/iphone-banner.png" alt="iphone-banner"/>
				</div>
			</div>
		</div>
	</div>
</section>



<section class="about section bg-2" id="about">
	<div class="container">
		<div class="row">
			<div class="col-lg-6 align-self-center text-center">
				
				<div class="image-block">
					<img class="phone-thumb-md" src="images/phones/iphone-feature.png" alt="iphone-feature" class="img-fluid"/>
				</div>
			</div>
			<div class="col-lg-6 col-md-10 m-md-auto align-self-center ml-auto">
				<div class="about-block">
					
					<div class="about-item">
						<div class="icon">
							<i class="ti-palette"></i>
						</div>
						<div class="content_s">
							<h5>Creative Design</h5>
							<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
								and I will give you a complete accounta</p>
						</div>
					</div>
				
					<div class="about-item active">
						<div class="icon">
							<i class="ti-panel"></i>
						</div>
						<div class="content_s">
							<h5>Easy to Use</h5>
							<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
								and I will give you a complete accounta</p>
						</div>
					</div>
				
					<div class="about-item">
						<div class="icon">
							<i class="ti-vector"></i>
						</div>
						<div class="content_s">
							<h5>Best User Experience</h5>
							<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
								and I will give you a complete accounta</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

{/* <!--====  End of About  ====-->

<!--==============================
=            Features            =
===============================--> */}

<section class="section feature" id="feature">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="section-title">
					<h2>App Features</h2>
					<p>Demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee idea of
						denouncing pleasure and praising</p>
				</div>
			</div>
		</div>
		<div class="row bg-elipse">
			<div class="col-lg-4 align-self-center text-center text-lg-right">
				
				<div class="feature-item">
					
					<div class="icon">
						<i class="ti-brush-alt"></i>
					</div>
				
					<div class="content">
						<h5>Beautiful Interface Design</h5>
						<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
					</div>
				</div>
			
				<div class="feature-item">
				
					<div class="icon">
						<i class="ti-gift"></i>
					</div>
					
					<div class="content">
						<h5>Unlimited Features</h5>
						<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
					</div>
				</div>
			</div>
			<div class="col-lg-4 text-center">
			
				<div class="feature-item mb-0">
				
					<div class="icon">
						<i class="ti-comments"></i>
					</div>
				
					<div class="content">
						<h5>Full free chat</h5>
						<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
					</div>
				</div>
				<div class="app-screen">
					<img class="img-fluid" src="images/phones/i-phone-screen.png" alt="app-screen"/>
				</div>
			
				<div class="feature-item">
			
					<div class="icon">
						<i class="ti-support"></i>
					</div>
					
					<div class="content">
						<h5>24/7 support by real people</h5>
						<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
					</div>
				</div>
			</div>
			<div class="col-lg-4 text-center text-lg-left align-self-center">
			
				<div class="feature-item">
					
					<div class="icon">
						<i class="ti-image"></i>
					</div>
					
					<div class="content">
						<h5>Retina ready greaphics</h5>
						<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
					</div>
				</div>
				
				<div class="feature-item">
					
					<div class="icon">
						<i class="ti-pie-chart"></i>
					</div>
					
					<div class="content">
						<h5>IOS &amp; android version </h5>
						<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

{/* <!--====  End of Features  ====-->

<!--=================================
=            Promo Video            =
==================================--> */}

<section class="section promo-video bg-3 overlay">
	<div class="container">
		<div class="row">
			<div class="col-12">
				 
				<div class="video">
					<img class="img-fluid" src="images/backgrounds/promo-video-bg.jpg" alt="video-thumbnail"/>
					<div class="video-button video-box">
					 
						<a href="javascript:void(0)">
							<span class="icon" data-video="https://www.youtube.com/embed/jrkvirglgaQ?autoplay=1">
								<i class="ti-control-play"></i>
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

{/* <!--====  End of Promo Video  ====-->

<!--===================================
=            Pricing Table            =
====================================--> */}

<section class="pricing section bg-shape" id="pricing">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="section-title mb-4">
					<h2 class="mb-3">Choose Your Subscription Plan</h2>
					<p>Demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee idea of
						denouncing pleasure and praising</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-4 col-md-6">
				
<div class="pricing-table text-center">	
	
	<div class="title">	
		<h5>Free</h5>
	</div>
	
	<div class="price">	
		<p>$0<span>/month</span></p>
	</div>
	
	<ul class="feature-list">
		<li>Android App</li>
		<li>One time payment</li>
		<li>Build & Publish</li>
		<li>Life time support</li>
	</ul>
	
	<div class="action-button">
		<a href="" class="btn btn-main-rounded">Start Now</a>
	</div>
</div>
			</div>
			<div class="col-lg-4 col-md-6">
				
<div class="pricing-table featured text-center">	
	
	<div class="title">	
		<h5>Basic</h5>
	</div>
	
	<div class="price">	
		<p>$19<span>/month</span></p>
	</div>
	
	<ul class="feature-list">
		<li>Android App</li>
		<li>One time payment</li>
		<li>Build &amp; Publish</li>
		<li>Life time support</li>
	</ul>
	
	<div class="action-button">
		<a href="" class="btn btn-main-rounded">Start Now</a>
	</div>
</div>
			</div>
			<div class="col-lg-4 col-md-6 m-md-auto">
				
<div class="pricing-table text-center">	
	
	<div class="title">	
		<h5>Advance</h5>
	</div>
	
	<div class="price">	
		<p>$99<span>/month</span></p>
	</div>
	
	<ul class="feature-list">
		<li>Android App</li>
		<li>One time payment</li>
		<li>Build &amp; Publish</li>
		<li>Life time support</li>
	</ul>
	
	<div class="action-button">
		<a href="" class="btn btn-main-rounded">Start Now</a>
	</div>
</div>
			</div>
		</div>
	</div>
</section>

{/* <!--====  End of Pricing Table  ====-->

<!--=============================================
=            Call to Action Download            =
==============================================--> */}

<section class="cta-download bg-3 overlay">
	<div class="container">
		<div class="row">
			<div class="col-lg-5 text-center">
				<div class="image-block">
                    <img class="phone-thumb img-fluid" src="images/phones/iphone-chat.png" alt="" /></div>
			</div>
			<div class="col-lg-7">
				<div class="content-block">
					
					<h2>Free Download Now</h2>
					
					<p>Demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee idea of
						denouncing pleasure and praising</p>
				
					<div class="app-badge">
						<ul class="list-inline">
							<li class="list-inline-item">
								<a href="#" class="btn btn-download"><i class="ti-android"></i>
									<div>Get it on the<span>GOOGLE PLAY</span></div>
								</a>
							</li>
							<li class="list-inline-item">
								<a href="#" class="btn btn-download"><i class="ti-apple"></i>
									<div>Available on the<span>Apple store</span></div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

{/* <!--====  End of Call to Action Download  ====-->

<!--=============================
=            Counter            =
==============================--> */}

{/* <section class="section counter bg-gray">
	<div class="container">
		<div class="row">
			<div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
				<div class="counter-item">
					
					<h3><span class="count" data-count="29">0</span>k</h3>
					
					<p>Download</p>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
				<div class="counter-item">
					
					<h3><span class="count" data-count="200">0</span>k</h3>
					
					<p>Active Account</p>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
				<div class="counter-item">
					
					<h3><span class="count" data-count="60">0</span>k</h3>
					
					<p>Happy User</p>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
				<div class="counter-item">
					
					<h3><span class="count" data-count="300">0</span>k<sup>+</sup></h3>
					
					<p>Download</p>
				</div>
			</div>
		</div>
	</div>
</section> */}

{/* <!--====  End of Counter  ====-->

<!--==========================
=            Team            =
===========================--> */}

{/* <section class="section team bg-shape-two" id="team">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="section-title mb-4">
					<h2 class="mb-3">Our Creative Team</h2>
					<p>Demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee idea of
						denouncing pleasure and praising</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-3 col-md-6">
				<!-- Team Member -->
<div class="team-member text-center mb-4 mb-lg-0">
	<div class="image">
		<img class="img-fluid" src="images/team/member-one.jpg" alt="team-member">
	</div>
	<div class="name">
		<h5>Johnny Depp</h5>
	</div>
	<div class="position">
		<p>Production Designer</p>
	</div>
	<div class="skill-bar">
		<div class="progress">
		  	<div class="progress-bar" style="width:85%;"></div>
		</div>
		<span>85%</span>
	</div>
	<ul class="social-icons list-inline">
		<li class="list-inline-item">
			<a href=""><i class="ti-facebook"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-twitter-alt"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-linkedin"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-instagram"></i></a>
		</li>
	</ul>
</div>
			</div>
			<div class="col-lg-3 col-md-6">
				<!-- Team Member -->
<div class="team-member text-center mb-4 mb-lg-0">
	<div class="image">
		<img class="img-fluid" src="images/team/member-two.jpg" alt="team-member">
	</div>
	<div class="name">
		<h5>cristin milioti</h5>
	</div>
	<div class="position">
		<p>UX Researcher</p>
	</div>
	<div class="skill-bar">
		<div class="progress">
		  	<div class="progress-bar" style="width:95%;"></div>
		</div>
		<span>95%</span>
	</div>
	<ul class="social-icons list-inline">
		<li class="list-inline-item">
			<a href=""><i class="ti-facebook"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-twitter-alt"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-linkedin"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-instagram"></i></a>
		</li>
	</ul>
</div>
			</div>
			<div class="col-lg-3 col-md-6">
				<!-- Team Member -->
<div class="team-member text-center mb-4 mb-lg-0">
	<div class="image">
		<img class="img-fluid" src="images/team/member-three.jpg" alt="team-member">
	</div>
	<div class="name">
		<h5>john doe</h5>
	</div>
	<div class="position">
		<p>Head of Ideas</p>
	</div>
	<div class="skill-bar">
		<div class="progress">
		  	<div class="progress-bar" style="width:80%;"></div>
		</div>
		<span>80%</span>
	</div>
	<ul class="social-icons list-inline">
		<li class="list-inline-item">
			<a href=""><i class="ti-facebook"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-twitter-alt"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-linkedin"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-instagram"></i></a>
		</li>
	</ul>
</div>
			</div>
			<div class="col-lg-3 col-md-6">
				<!-- Team Member -->
<div class="team-member text-center mb-4 mb-lg-0">
	<div class="image">
		<img class="img-fluid" src="images/team/member-four.jpg" alt="team-member">
	</div>
	<div class="name">
		<h5>mario gotze</h5>
	</div>
	<div class="position">
		<p>UX/UI designer</p>
	</div>
	<div class="skill-bar">
		<div class="progress">
		  	<div class="progress-bar" style="width:75%;"></div>
		</div>
		<span>75%</span>
	</div>
	<ul class="social-icons list-inline">
		<li class="list-inline-item">
			<a href=""><i class="ti-facebook"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-twitter-alt"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-linkedin"></i></a>
		</li>
		<li class="list-inline-item">
			<a href=""><i class="ti-instagram"></i></a>
		</li>
	</ul>
</div>
			</div>
		</div>
	</div>
</section> */}

{/* <!--====  End of Team  ====-->

<!--=================================
=            Testimonial            =
==================================--> */}

{/* <section class="section testimonial bg-primary-shape" id="testimonial">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="section-title">
					<h2 class="text-white">Our Happy Customers</h2>
					<p class="text-white">Demoralized by the charms of pleasure of the moment, so blinded by desire, that they
						cannot foresee idea of denouncing pleasure and praising</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-10 mx-auto">
				<!-- Testimonial Carosel -->
<div class="testimonial-slider">
	<!-- testimonial item -->
	<div class="testimonial-item">
		<div class="row">
			<div class="col-md-5 client-img" style="background-image: url(images/testimonial/client-1.jpg);">
			</div>
			<div class="col-md-7">
				<div class="p-4 bg-white">
					<strong class="mb-3 d-block">They are great agency</strong>
					<p class="lead font-italic mb-4">I recently hired Genox to develop a new version of my most popular website
						and I’m extremely happy with their work.</p>
					<h6>Mike Andrew</h6>
					<p>CEO - Philandropia</p>
				</div>
			</div>
		</div>
	</div>
	<!-- testimonial item -->
	<div class="testimonial-item">
		<div class="row">
			<div class="col-md-5 client-img" style="background-image: url(images/testimonial/client-2.jpg);">
			</div>
			<div class="col-md-7">
				<div class="p-4 bg-white">
					<strong class="mb-3 d-block">They are great agency</strong>
					<p class="lead font-italic mb-4">I recently hired Genox to develop a new version of my most popular website
						and I’m extremely happy with their work.</p>
					<h6>Selena Catt</h6>
					<p>CEO - Philandropia</p>
				</div>
			</div>
		</div>
	</div>
</div>
			</div>
		</div>
	</div>
</section> */}


{/* <!--====  End of Testimonial  ====--> */}

{/* <section class="section cta-subscribe" id="contact">
	<div class="container">
		<div class="row bg-elipse-red">
			<div class="col-lg-4">
				<div class="image"><img class="phone-thumb" src="images/phones/iphone-banner.png" alt="iphone-app"/></div>
			</div>
			<div class="col-lg-8 align-self-center">
				<div class="content">
					<div class="mb-4">
						<h2>Subscribe Our Newsletter</h2>
					</div>
					<div class="description">
						<p>Demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee idea
							of denouncing pleasure and praising</p>
					</div>
					<form action="#">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Enter your email address"/>
							<div class="input-group-append">
								<span class="input-group-text ti-arrow-right"></span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section> */}
</div>);
};

export default AppLanding;
