<template>

<div class="container mt-5">
  
  <h1>Admin panel</h1>
  <div class="row">
    <!-- Картка Користувачів -->
    <div class="col-lg-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Users</h5>
          <p class="card-text">Manage website users</p>
          <router-link to="/admin/allUsers" class="btn btn-primary btn-icon">
            <i class="fa fa-users"></i> Перейти
          </router-link>
        </div>
      </div>
    </div>

    <!-- Картка Гостей -->
    <div class="col-lg-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Guests</h5>
          <p class="card-text"> Information and management of guests</p>
          <router-link to="/guests" class="btn btn-primary btn-icon">
            <i class="fa fa-user"></i> Перейти
          </router-link>
        </div>
      </div>
    </div>

    <!-- Картка Приміщень -->
    <div class="col-lg-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Apartments</h5>
          <p class="card-text">Information about apartments and their management</p>
          <router-link to="/apartments" class="btn btn-primary btn-icon">
            <i class="fa fa-building"></i> Перейти
          </router-link>
        </div>
      </div>
    </div>

    <!-- Картка Бронювань -->
    <div class="col-lg-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Bookings</h5>
          <p class="card-text">View and manage bookings</p>
          <router-link to="/admin/allBookings" class="btn btn-primary btn-icon">
            <i class="fa fa-calendar"></i> Перейти
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>