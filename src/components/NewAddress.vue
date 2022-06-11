<script setup>
import { reactive, ref } from "@vue/reactivity";
import inputBox from "./inputBox.vue";
import Header from "./header.vue";
import { router } from "../router";
import { nextTick, watch } from "@vue/runtime-core";
import Map from "./map.vue";
import axios from "axios";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const formState = reactive({
  name: "",
  lastname: "",
  phone: "",
  mobile: "",
  address: "",
  gender: "",
  lat: "",
  lng: "",
});

const formErrors = reactive({
  name: [],
  lastname: [],
  phone: [],
  mobile: [],
  address: [],
  lat: [],
  lng: [],
});

const validate = () => {
  const temp = formState.lastname;
  formState.lastname = temp + "a";
  nextTick(() => {
    formState.lastname = temp;
  });
};

const currentStage = ref(0);
const goNextStage = async () => {
  validate();

  if (formErrors.name?.length && !formState.name.length) return;
  if (formErrors.lastname?.length && !formState.lastname.length) return;
  if (formErrors.phone?.length && !formState.phone.length) return;
  if (formErrors.address?.length && !formState.address.length) return;
  if (!formState.gender?.length && !formState.gender.length) return;
  if (currentStage.value === 0) {
    nextTick(() => {
      currentStage.value = 1;
    });
  }
  if (currentStage.value === 1) {
    nextTick(() => {
      currentStage.value = 2;
    });
    const res = await axios.post(
      "https://stage.achareh.ir/api/karfarmas/address",
      {
        first_name: formState.name,
        last_name: formState.lastname,
        coordinate_phone_number: formState.phone,
        coordinate_mobile: formState.mobile,
        address: formState.address,
        region: 1,
        lat: formState.lat,
        lng: formState.lng,
      },
      { headers: { Authorization: "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Ng==" } }
    );
    if (res.data?.address_id) {
      nextTick(() => {
        currentStage.value = 3;
      });
    }
  }
};

const coords = ref({ lat: "", lng: "" });
watch(coords, (newCoords) => {
  formState.lat = newCoords?.lat;
  formState.lng = newCoords?.lng;
});
</script>

<template>
  <div class="bg-gray-100 wrapper">
    <Header />
    <main
      class="flex flex-col p-4 md:mx-32 mt-4 md:mt-10 text-gray-600"
      dir="rtl"
      v-if="currentStage == 0"
    >
      <div class="text-base font-bold">ثبت آدرس</div>
      <div
        class="bg-white text-sm font-bold rounded-sm shadow-sm p-4 mt-4 flex flex-col md:p-10"
      >
        <div>لطفا مشخصات و آدرس خود را وارد کنید</div>
        <div class="form-box">
          <input-box
            :validations="['required']"
            v-model="formState.name"
            v-model:validation-errors="formErrors.name"
            label="نام"
          />
          <input-box
            :validations="['min:3']"
            v-model="formState.lastname"
            label="نام و نام خانوادگی"
          />
          <input-box
            :validations="['mobile']"
            v-model="formState.mobile"
            label="تلفن همراه"
          />
          <input-box
            :validations="['phone']"
            v-model="formState.phone"
            label="تلفن ثابت"
          />
          <input-box
            :validations="['required', 'min:3']"
            v-model="formState.address"
            label="آدرس"
            box-classes="occupy-2"
          />
          <div class="flex my-4 gap-8">
            <label for="gener">جنسیت</label>
            <div class="flex items-center cursor-pointer px-1 gap-2">
              <input
                type="radio"
                id="opt_female"
                name="gender"
                value="female"
                v-model="formState.gender"
              />
              <label for="opt_female">خانم</label>
            </div>
            <div class="flex items-center cursor-pointer px-1 gap-2">
              <input
                type="radio"
                id="opt_male"
                name="gender"
                value="male"
                v-model="formState.gender"
              />
              <label for="opt_male">آقا</label>
            </div>
          </div>
        </div>
      </div>
      <div class="h-16"></div>
    </main>
    <main v-if="currentStage == 1" class="flex flex-col p-4" dir="rtl">
      <Map v-model="coords" />
    </main>
    <div
      v-if="currentStage == 3"
      class="flex flex-col p-8 justify-center items-center h-[90vh]"
      dir="rtl"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        class="w-12 my-4"
        viewBox="0 0 122.881 122.88"
        enable-background="new 0 0 122.881 122.88"
        xml:space="preserve"
      >
        <g>
          <path
            d="M61.44,0c16.966,0,32.326,6.877,43.445,17.995s17.996,26.479,17.996,43.444c0,16.967-6.877,32.327-17.996,43.445 S78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.995S0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444 S44.474,0,61.44,0L61.44,0z M34.556,67.179c-1.313-1.188-1.415-3.216-0.226-4.529c1.188-1.313,3.216-1.415,4.529-0.227L52.3,74.611 l31.543-33.036c1.223-1.286,3.258-1.336,4.543-0.114c1.285,1.223,1.336,3.257,0.113,4.542L54.793,81.305l-0.004-0.004 c-1.195,1.257-3.182,1.338-4.475,0.168L34.556,67.179L34.556,67.179z M100.33,22.55C90.377,12.598,76.627,6.441,61.44,6.441 c-15.188,0-28.938,6.156-38.89,16.108c-9.953,9.953-16.108,23.702-16.108,38.89c0,15.188,6.156,28.938,16.108,38.891 c9.952,9.952,23.702,16.108,38.89,16.108c15.187,0,28.937-6.156,38.89-16.108c9.953-9.953,16.107-23.702,16.107-38.891 C116.438,46.252,110.283,32.502,100.33,22.55L100.33,22.55z"
          ></path>
        </g>
      </svg>
      <p>اطلاعات شما با موفقیت ثبت شد.</p>
      <button
        class="my-6 px-20 md:px-36 p-4 border-primary border rounded-lg"
        @click="$router.push('/addresses')"
      >
        مشاهده اطلاعات
      </button>
    </div>
    <div
      class="fixed bottom-0 left-0 bg-white h-16 w-full border-t-2 shadow-xs border-gray-200 p-3 md:h-16 md:px-16 flex flex-col justify-center items-center z-[401]"
    >
      <button
        class="bg-primary text-white p-3 w-full rounded-lg md:w-64 relative flex items-center justify-center"
        @click="goNextStage"
      >
        <p v-if="currentStage !== 2">ثبت و ادامه</p>
        <template v-if="currentStage === 2">
          &nbsp
          <div class="dot-elastic mx-auto my-auto"></div>
        </template>
      </button>
    </div>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @apply bg-gray-100;
}
.form-box {
  display: flex;
  flex-direction: row;
  @apply flex-wrap w-full gap-4;
}
</style>
