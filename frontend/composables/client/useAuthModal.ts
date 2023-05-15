import { useEvent, useListen } from '~/composables/utils/useEventBus'

export function useAuthModal () {
  const isOpened = ref(false)

  useListen('auth:modal', (event) => {
    isOpened.value = event
  })

  function closeModal () {
    useEvent('auth:modal', false)
  }

  function openModal () {
    useEvent('auth:modal', true)
  }

  return { isOpened, closeModal, openModal }
}
