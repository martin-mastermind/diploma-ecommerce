import { useEvent, useListen } from '~/composables/utils/useEventBus'
import { useUser } from '~/store/client/user'

export function useAuthModal () {
  const isOpened = ref(false)
  const modalType = ref<'login' | 'registration'>('login')

  useListen('auth:modal', (event) => {
    isOpened.value = event
  })

  useListen('auth:type', (event) => {
    modalType.value = event
  })

  function changeModalType (type: 'login' | 'registration') {
    useEvent('auth:type', type)
  }

  function closeModal () {
    useEvent('auth:modal', false)
  }

  function openModal () {
    useEvent('auth:modal', true)
  }

  async function checkForAuth () {
    const { verifyUser } = useUser()
    const hasAuth = await verifyUser()

    if (hasAuth) { return true }

    changeModalType('login')
    openModal()
    return false
  }

  return { isOpened, modalType, changeModalType, closeModal, openModal, checkForAuth }
}
