<script setup>
const props = defineProps(["address"]);
</script>
<template>
  <div
    class="bg-white shadow-sm mt-4 rounded-sm flex flex-row flex-wrap p-6 gap-y-4"
  >
    <div class="flex flex-col p-2 gap-4 w-1/4">
      <div>نام</div>
      <div class="ml-auto text-gray-600 font-bold">
        {{ props.address.first_name }}
      </div>
    </div>
    <div class="flex flex-col p-2 gap-4 w-1/4">
      <div>نام خانوادگی</div>
      <div class="ml-auto text-gray-600 font-bold">
        {{ props.address.last_name }}
      </div>
    </div>

    <div class="flex flex-col p-2 gap-4 w-1/2">
      <div>شماره تلفن همراه</div>
      <div class="ml-auto text-gray-600 font-bold">
        {{
          props.address.coordinate_mobile
            ? props.address.coordinate_mobile
            : "-"
        }}
      </div>
    </div>
    <div class="flex flex-col p-2 gap-4 w-1/4">
      <div>شماره تلفن ثابت</div>
      <div class="ml-auto text-gray-600 font-bold">
        {{
          props.address.coordinate_phone_number
            ? props.address.coordinate_phone_number
            : "-"
        }}
      </div>
    </div>
    <div class="flex flex-col p-2 gap-4 w-1/4">
      <div>جنسیت</div>
      <div class="ml-auto text-gray-600 font-bold">
        {{ props.address.gender ? props.address.gender : "-" }}
      </div>
    </div>
    <div class="flex flex-col p-2 gap-4 w-1/2">
      <div>آدرس</div>
      <div class="ml-auto text-gray-600 font-bold">
        {{ props.address.address ? props.address.address : "-" }}
      </div>
    </div>
  </div>
</template>
