<script setup lang="ts">
defineProps<{
  isOpened: boolean
  id: number
}>()

const data = ref<{
  admin?: {
    name: string
  }
  status: 'new' | 'in-work' | 'closed'
  messages: {
    from_admin: boolean
    sent_time: string
    message: string
  }[]
}>({
  admin: {
    name: 'Скала Петр Иванович'
  },
  status: 'in-work',
  messages: [
    {
      from_admin: false,
      sent_time: '14.05.2023 15:41',
      message: 'Здавствуйте! У меня проблема'
    },
    {
      from_admin: true,
      sent_time: '14.05.2023 15:42',
      message: 'Здавствуйте! Что случилось?'
    },
    {
      from_admin: false,
      sent_time: '14.05.2023 15:41',
      message: 'Здавствуйте! У меня проблема'
    },
    {
      from_admin: true,
      sent_time: '14.05.2023 15:42',
      message: 'Здавствуйте! Что случилось?'
    },
    {
      from_admin: false,
      sent_time: '14.05.2023 15:41',
      message: 'Здавствуйте! У меня проблема'
    },
    {
      from_admin: true,
      sent_time: '14.05.2023 15:42',
      message: 'Здавствуйте! Что случилось?'
    },
    {
      from_admin: false,
      sent_time: '14.05.2023 15:41',
      message: 'Здавствуйте! У меня проблема'
    },
    {
      from_admin: true,
      sent_time: '14.05.2023 15:42',
      message: 'Здавствуйте! Что случилось?'
    }
  ]
})

const newMessage = ref<string | null>(null)

const emit = defineEmits(['update:isOpened'])

function sendMessage () {
  alert('Сообщение отправлно')
}
</script>

<template>
  <div v-if="isOpened" class="flex justify-center items-center fixed w-screen bg-black bg-opacity-50 inset-0">
    <section class="w-[90%] bg-white rounded-sm p-5 overflow-auto flex flex-col gap-5">
      <header class="flex justify-between items-center">
        <h2 class="text-lg font-bold md:text-2xl">
          Обращение
        </h2>
        <ClientUiIconButton name="material-symbols:close-rounded" @click="emit('update:isOpened', false)" />
      </header>
      <article class="flex flex-col gap-5 lg:gap-10 max-h-96 overflow-auto">
        <div v-for="(message, i) in data.messages" :key="i" class="flex flex-col border-b pb-2 border-slate-500 last:border-b-0">
          <div class="flex gap-2 items-center">
            <h3 :data-own="!message.from_admin" class="text-xl data-[own=true]:font-bold">
              {{ message.from_admin ? data.admin?.name : 'Вы' }}
            </h3>
            <p class="text-sm">
              {{ message.sent_time }}
            </p>
          </div>
          <div class="text-lg">
            {{ message.message }}
          </div>
        </div>
      </article>
      <footer class="mt-auto flex flex-col md:flex-row w-full justify-center gap-5">
        <ClientUiInput v-model:value="newMessage" label="Сообщение" type="text" placeholder="Сообщение о проблеме" />
        <button class="bg-blue-700 text-white px-5 py-3 rounded-md self-end transition-colors disabled:bg-slate-400 hover:bg-blue-800 active:bg-blue-900" @click="sendMessage">
          Отправить
        </button>
      </footer>
    </section>
  </div>
</template>
