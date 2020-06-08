import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Homepage.vue";
import Room from "@/views/Room.vue";
import NoRoomSelected from "@/views/NoRoomSelected.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/",
        name: "home",
        component: NoRoomSelected
      },
      {
        path: "/room/:roomId",
        name: "room",
        component: Room
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Authentication.vue")
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
