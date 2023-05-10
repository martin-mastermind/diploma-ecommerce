<template>
  <div>
    <notifications class="p-5 text-md pointer-events-none" width="25%" />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

.vue-notification {
  font-size: unset !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

:root {
  --vc-pgn-border-radius: 5rem;
}
</style>
