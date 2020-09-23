import Vue from 'vue'
import vueRotuer from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import PaintMixing from './components/PaintMixing.vue';
import PaintMixingConfirm from './components/PaintMixingConfirm.vue';
import PaintBookIn from './components/PaintBookIn.vue';
import PaintBookOut from './components/PaintBookOut.vue';
import Production from './components/Production.vue';
const routes = [
  {
    path:'/',
    component:Home,
    children: [
      {
        path: '/',
        name: '',
        component: Production,
        meta:{
          needLogin:false
        }
      },
      {
        path: 'paint-mixing',
        name: 'paint-mixing',
        component: PaintMixing
      },
      {
        path: 'paint-mixing-confirm',
        name: 'paint-mixing-confirm',
        component: PaintMixingConfirm
      },
      {
        path: 'paint-book-in',
        name: 'paint-book-in',
        component: PaintBookIn
      },
      {
        path: 'paint-book-out',
        name: 'paint-book-out',
        component: PaintBookOut
      },
      {
        path: 'production',
        name: 'production',
        component: Production
      },
    ]
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    children: [
      {
        path: '/',
        name: '',
        component: PaintMixing,
        meta:{
          needLogin:false
        }
      },
      {
        path: 'paint-mixing',
        name: 'paint-mixing',
        component: PaintMixing
      },
      {
        path: 'paint-mixing-confirm',
        name: 'paint-mixing-confirm',
        component: PaintMixingConfirm
      },
      {
        path: 'paint-book-in',
        name: 'paint-book-in',
        component: PaintBookIn
      },
      {
        path: 'paint-book-out',
        name: 'paint-book-out',
        component: PaintBookOut
      },
      {
        path: 'production',
        name: 'production',
        component: Production
      },
    ]
  },
]

Vue.use(vueRotuer);
const router = new vueRotuer({ routes });

router.beforeEach(async (to, from, next) => {
  console.log(to, 'to');
  if (to.meta.needLogin) {
      next({
        path: '/login',
        // query: { redirect: to.fullPath },
      });
  }else{
    next();
  }
  // if (!isPublic && !loggedIn) {
    // next({
    //   name: 'home',
    //   // query: { redirect: to.fullPath },
    // });
  // } else if (loggedIn && onlyWhenLoggedOut) {
  //   next({ path: '/' });
  // } else if (loggedIn && appPermissionRequired) {
  //   const appPath = to.fullPath.split('/');
  //   if (await isAppProvisioned(appPath[1])) {
  //     next();
  //   } else {
  //     next({ name: '401' });
  //   }
  // } else {
  //   next();
  // }
});

export default router;