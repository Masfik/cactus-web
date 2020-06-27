import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Room from "@/views/Room.vue";
import NoRoomSelected from "@/views/NoRoomSelected.vue";
import LoginForm from "@/components/authentication/LoginForm.vue";
import RegisterForm from "@/components/authentication/RegisterForm.vue";
import Authentication from "../views/Authentication.vue";
import Homepage from "@/views/Homepage.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Homepage,
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
    component: Authentication,
    children: [
      {
        path: "/",
        name: "login",
        component: LoginForm
      },
      {
        path: "/register",
        name: "register",
        component: RegisterForm
      }
    ]
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
