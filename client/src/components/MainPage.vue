<template>
  <div class="container-fluid">

    <div class="row">
      <div id="divWelcome" class="col-sm-2">
        <div class="card">
          <img src="../assets/welcome.png" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">Nifty the helper</h5>
            <p class="card-text">Hello! My name is Nifty! If you need some help, you can call me! I`ll help you!</p>
            <a href="tel:093-394-0406" class="btn btn-primary">Call me</a>
          </div>
        </div>
      </div>

      <div id="divCarousel" class="col-sm-7">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/restourant.jpg">                        
              <span>
                Hazbin Hotel is a devilishly delightful destination unlike any other! Nestled in the heart of Hell, our luxurious establishment is here to cater to all your sinfully entertaining needs.
                Step into a realm where redemption meets revelry, and enter a world where the damned can find a glimmer of hope. Hazbin Hotel offers a unique opportunity for demons and sinners to escape the eternal torment and embark on a path to redemption.
                Our lavish accommodations feature exquisite devilish designs, blending elegance and mischief in every corner. From spacious suites to cozy dens, each room is thoughtfully crafted to provide comfort and a touch of wickedness. Experience the epitome of luxury as you bask in the mystical ambiance of Hell.
              </span>
            </div>
            <div class="carousel-item">
              <img src="../assets/hotel.jpg">           
              <span>
                But that's not all! Hazbin Hotel is also home to an unparalleled array of entertainment. Allow our talented staff to amuse and titillate you with captivating live performances, filled with music, dance, and irreverent humor. Witness extravagant spectacles that push the boundaries of entertainment, enticing you to forget your worries and embrace the sinful delights of Hell.
                If indulging in delectable cuisine is your desire, our world-class chefs will entice your palate with a devilishly delicious selection of culinary wonders, catering to all tastes and cravings. From demon delicacies to inventive creations, each dish is crafted with the utmost care, tantalizing both the senses and the soul.
              </span>
            </div>
            <div class="carousel-item">
              <img src="../assets/room1.jpg">
              <span>
                But what truly sets Hazbin Hotel apart is our mission to save souls. Under the watchful eye of the spirited and audacious Charlie, the Hotel's fearless founder, we strive to rehabilitate the damned and guide them on a path to redemption. Witness firsthand the battles between good and evil, as unlikely friendships are forged and unexpected transformations occur.
                So whether you're seeking a sinful escape or a chance at redemption, Hazbin Hotel is the perfect destination to indulge in the soul-stirring wonders of Hell. Join us and discover a world unlike any other, where chaos and redemption collide in a symphony of wicked delight. Book your stay today and unlock the gates to an extraordinary experience that will leave you craving more.
              </span>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div id="divCard" class="col-sm-3">
        <div>
          <div>
            <h2>Our advantages</h2>
            <h6>
              <ul class="list-group">
                <li class="list-group-item"><i class="fa fa-coffee" aria-hidden="true"></i>&nbsp;Panoramic restaurant</li>                      
                <li class="list-group-item"><i class="fa fa-globe" aria-hidden="true"></i>&nbsp;Travel through the city</li> 
                <li class="list-group-item"><i class="fa fa-wifi" aria-hidden="true"></i>&nbsp;Wifi</li> 
                <li class="list-group-item"><i class="fa fa-car" aria-hidden="true"></i>&nbsp;Car sharing</li> 
            </ul>
          </h6>
          </div>
        </div>
        <div>
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m22!1m12!1m3!1d82345.00325540337!2d23.95343836730957!3d49.837170795155174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m7!3e6!4m0!4m4!2s49.837230%2C%2024.035886!3m2!1d49.83723!2d24.035885999999998!5e0!3m2!1suk!2sua!4v1695848190000!5m2!1suk!2sua" 
            style="width: 100%; border:0; min-height: 550px; height: auto;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',

}
</script>