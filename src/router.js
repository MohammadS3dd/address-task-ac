import { createRouter, createWebHashHistory } from "vue-router";

import NewAddress from "./components/NewAddress.vue";
import AllAddresses from "./components/AllAddresses.vue";
const routes = [
  { path: "/", component: NewAddress, name: "newAddress" },
  { path: "/addresses", component: AllAddresses, name: "allAddresses" },
];
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
