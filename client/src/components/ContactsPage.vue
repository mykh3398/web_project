<template>
  <div class="container-fluid mt-2">
    <div class="row" >
        <div class="col-sm-6">
        <div class="card mb-3">
            <div class="row">
            <div class="col-md-3">
                <img src="../assets/Charlie.jpg" class="img-fluid rounded-start contact-img"/>
            </div>
            <div class="col-md-9">
                <div class="card-header">
                The contact person 1
                </div>
                <div class="card-body" style="color: firebrick">
                <h5 class="card-title">Charlie Morningstar</h5>
                <p class="card-text">The founder of the Hazbin Hotel</p>
                <p class="card-text"><a href="tel:050-152-9507" class="btn btn-primary">050-152-9507</a></p>
                </div>
            </div>
            </div>
        </div>
        </div>

        <div class="col-sm-6">
        <div class="card mb-3">
            <div class="row">
            <div class="col-md-3">
                <img src="../assets/Alastor.jpg" class="img-fluid rounded-start contact-img"/>
            </div>
            <div class="col-md-9">
                <div class="card-header">
                The contact person 2
                </div>
                <div class="card-body" style="color: firebrick">
                <h5 class="card-title">Alastor</h5>
                <p class="card-text">The co-founder of the Hazbin Hotel</p>
                <a href="tel:093-394-0406" class="btn btn-primary">093-394-0406</a>
                </div>
            </div>
            </div>
        </div>
        </div>

    </div>
  </div>
</template>


<script>
export default {
  name: 'ContactsPage'
}
</script>