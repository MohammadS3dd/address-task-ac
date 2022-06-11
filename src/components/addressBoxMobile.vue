<script setup>
const props = defineProps(["address"]);
</script>
<template>
  <div class="bg-white shadow-sm mt-4 rounded-sm flex flex-col p-2">
    <div class="flex flex-row p-2 gap-2">
      <div>نام و نام خانوادگی</div>
      <div class="mr-auto text-gray-600 font-bold">
        {{ props.address.first_name }} {{ props.address.last_name }}
      </div>
    </div>
    <div class="flex flex-row p-2 gap-2">
      <div>جنسیت</div>
      <div class="mr-auto text-gray-600 font-bold">
        {{ props.address.gender ? props.address.gender : "-" }}
      </div>
    </div>
    <div class="flex flex-row p-2 gap-2">
      <div>شماره تلفن همراه</div>
      <div class="mr-auto text-gray-600 font-bold">
        {{
          props.address.coordinate_mobile
            ? props.address.coordinate_mobile
            : "-"
        }}
      </div>
    </div>
    <div class="flex flex-row p-2 gap-2">
      <div>شماره تلفن ثابت</div>
      <div class="mr-auto text-gray-600 font-bold">
        {{
          props.address.coordinate_phone_number
            ? props.address.coordinate_phone_number
            : "-"
        }}
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex flex-col p-2 gap-2">
      <div>آدرس</div>
      <div class="mr-auto text-gray-600 font-bold">
        {{ props.address.address ? props.address.address : "-" }}
      </div>
    </div>
  </div>
</template>
