<script setup>
import { computed, defineAsyncComponent, onMounted } from "@vue/runtime-core";
import axios from "axios";
import Header from "./header.vue";
import { ref, onBeforeUnmount } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const addressBoxDesktop = defineAsyncComponent(() =>
  import("./addressBoxDesktop.vue")
);
const addressBoxMobile = defineAsyncComponent(() =>
  import("./addressBoxMobile.vue")
);
const addresses = ref([]);
const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value > 768);
onMounted(() => {
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});
onMounted(async () => {
  const res = await axios.get(
    "https://stage.achareh.ir/api/karfarmas/address",
    {
      headers: { Authorization: "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Ng==" },
    }
  );
  console.log(res.data);
  addresses.value = res.data;
});

const paginatedAddresses = ref([]);
const page = ref(1);
const perPage = 10;
const load = ($state) => {
  page.value += 1;
  const currentLen = paginatedAddresses.value.length;
  const targetLen = page.value * perPage;

  if (targetLen > addresses.value.length) {
    $state.complete();
    return;
  }
  paginatedAddresses.value = paginatedAddresses.value.concat(
    addresses.value.slice(currentLen, targetLen)
  );
  $state.loaded();
};
</script>

<template>
  <div class="bg-gray-100 wrapper">
    <Header />

    <main
      dir="rtl"
      class="flex flex-col p-4 md:mx-72 mt-4 md:mt-10 text-gray-600"
    >
      <div class="text-base font-bold">آدرس ها و مشخصات</div>
      <template v-if="!isDesktop">
        <address-box-mobile
          v-for="address in paginatedAddresses"
          :key="address"
          :address="address"
        />
      </template>
      <template v-if="isDesktop">
        <address-box-desktop
          v-for="address in paginatedAddresses"
          :key="address"
          :address="address"
        />
      </template>
      <!-- <div
        class="bg-white shadow-sm md:shadow-lg mt-4 rounded-sm flex flex-col md:flex-row p-2"
        v-for="address in paginatedAddresses"
        :key="address"
      >
        <div class="flex flex-row md:flex-col p-2 gap-2">
          <div>نام و نام خانوادگی</div>
          <div class="mr-auto md:mr-0 text-gray-600 font-bold">
            {{ address.first_name }} {{ address.last_name }}
          </div>
        </div>
        <div class="flex flex-row md:flex-col p-2 gap-2">
          <div>نام و نام خانوادگی</div>
          <div class="mr-auto md:mr-0 text-gray-600 font-bold">
            {{ address.first_name }} {{ address.last_name }}
          </div>
        </div>
      </div> -->
      <InfiniteLoading
        v-if="addresses.length"
        :load="load"
        :paginatedAddresses="paginatedAddresses"
        @infinite="load"
      />
    </main>
  </div>
</template>

<style>
@import url(https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v32.102/Vazirmatn-font-face.css);
body {
  font-family: Vazirmatn, sans-serif;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @apply bg-gray-100;
}
</style>
