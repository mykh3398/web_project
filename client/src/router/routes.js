import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/components/MainPage'
import FAQPage from '@/components/FAQPage'
import ContactsPage from '@/components/ContactsPage'

import AdminView from '@/components/admin/AdminView'
import AdminUsers from '@/components/admin/AdminUsers'
import AdminBookings from '@/components/admin/AdminBookings'

import ViewApartments from '@/components/apartments/ViewApartments'
import CreateApartment from '@/components/apartments/CreateApartment'
import ViewApartment from '@/components/apartments/ViewApartment'
import EditApartment from '@/components/apartments/EditApartment'

import SignUpUser from '@/components/SignUpUser'
import SignInUser from '@/components/SignInUser'
import EditUser from '@/components/user/EditUser'
import UserProfile from '@/components/user/UserProfile'
import UserBookings from '@/components/user/UserBookings'


import CreateGuest from '@/components/admin/guests/CreateGuest'
import EditGuest from '@/components/admin/guests/EditGuest'
import ViewGuests from '@/components/admin/guests/ViewGuests'
import ViewGuest from '@/components/admin/guests/ViewGuest'
import CreateBookingGuest from '@/components/admin/guests/CreateBookingGuest' 

import CreateBooking from '@/components/booking/CreateBooking'
import ViewBooking from '@/components/booking/ViewBooking'
import EditBooking from '@/components/booking/EditBooking'


import { checkAuth, checkRole } from '@/middleware/authMiddleware';

const routes = [
  {
    path: '/home',
    name: 'main',
    component: MainPage
  },
  {
    path: '/FAQ',
    name: 'faq',
    component: FAQPage
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsPage
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/admin/allUsers',
    name: 'adminUsers',
    component: AdminUsers,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/admin/allBookings',
    name: 'adminBookings',
    component: AdminBookings,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },

  {
    path: '/register',
    name: 'register',
    component: SignUpUser
  },
  {
    path: '/login',
    name: 'login',
    component: SignInUser
  },
  {
    path: '/user/edit/:ID_User',
    name: 'user-edit',
    component: EditUser,
    props: true,
    beforeEnter: checkAuth
  },
  {
    path: '/user/profile/:ID_User',
    name: 'user-profile',
    component: UserProfile,
    beforeEnter: checkAuth
  },
  {
    path: '/apartments/create',
    name: 'apartments-create',
    component: CreateApartment,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/apartments/edit/:ID_Apart',
    name: 'apartment-edit',
    component: EditApartment,
    props: true,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/apartments/:ID_Apart',
    name: 'apartment',
    component: ViewApartment,
    meta: { requiredRole: 'user' },
    beforeEnter: checkAuth
  },
  {
    path: '/apartments',
    name: 'apartments',
    component: ViewApartments,
    beforeEnter: checkAuth
  },
  {
    path: '/guests/create',
    name: 'guest-create',
    component: CreateGuest,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/guests/edit/:ID_Guest',
    name: 'guest-edit',
    component: EditGuest,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/guests/:ID_Guest',
    name: 'guest',
    component: ViewGuest,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/guests',
    name: 'guests',
    component: ViewGuests,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: AdminBookings,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/booking/create/:ID_Apart',
    name: 'booking-create',
    component: CreateBooking,
    beforeEnter: checkAuth
  },
  {
    path: '/bookingGuest/create',
    name: 'booking-create-guest',
    component: CreateBookingGuest,
    meta: { requiredRole: 'admin' },
    beforeEnter: [checkAuth, checkRole],
  },
  {
    path: '/booking/create/guest',
    name: 'booking-guest',
    component: ViewBooking,
    beforeEnter: checkAuth
  },
  {
    path: '/bookingsUser/:ID_User',
    name: 'bookingsUser',
    component: UserBookings,
    beforeEnter: checkAuth
  },
  {
    path: '/booking/:ID_Booking',
    name: 'booking-user',
    component: ViewBooking,
    beforeEnter: checkAuth
  },

  {
    path: '/booking/edit/:ID_Booking',
    name: 'booking-edit',
    component: EditBooking,
    meta: { requiredRole: 'user' },
    beforeEnter: [checkAuth, checkRole],
  },

  { path: '/', redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router