import store from '../store';

export function checkAuth(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next('/login'); 
  }
}

export function checkRole(to, from, next) {
  const requiredRole = to.meta.requiredRole;

  if (!requiredRole) {
    next();
    return;
  }

  if (store.getters.isAuthenticated) {
    const userRole = store.getters.isAdmin ? 'admin' : 'user';

    if (userRole === requiredRole) {
      next();
    } else {
      next('/forbidden'); 
    }
  } else {
    next('/login');
  }
}
