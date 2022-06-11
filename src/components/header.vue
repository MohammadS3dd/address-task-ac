<template>
  <div
    class="fixed inset-0 bg-white flex h-12 w-full flex-row border-b-2 shadow-xs border-gray-200 p-3 md:h-16 md:px-16"
    dir="rtl"
  >
    <img
      src="https://achareh.co/_nuxt/img/achareh-type-logo.a2a4993.png"
      alt=""
    />
    <div class="mr-auto flex opacity-80">
      <button
        class="px-2 font-bold text-sm"
        :class="[
          $route.name !== 'newAddress'
            ? 'text-primary'
            : 'text-gray-800 pointer-events-none',
        ]"
        @click="$router.push('/')"
      >
        ثبت آدرس
      </button>
      <button
        class="px-2 font-bold text-sm"
        :class="[
          $route.name !== 'allAddresses'
            ? 'text-primary'
            : 'text-gray-800 pointer-events-none',
        ]"
        @click="$router.push('/addresses')"
      >
        مشاهده آدرس ها
      </button>
    </div>
  </div>
  <div class="h-12"></div>
</template>
