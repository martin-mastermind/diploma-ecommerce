import { notify } from '@kyvg/vue3-notification'

export function useApi (url: string, props?: object) {
  const apiError = ref(undefined as any | undefined)

  watch(apiError, async () => {
    if (apiError.value === undefined || apiError.value === null) { return }

    notify({
      type: 'error',
      title: 'Ошибка',
      text: `${apiError.value?.data.message as string}`
    })

    if (apiError.value?.statusCode === 403) {
      await navigateTo('/')
    }
  })

  async function post (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: props,
      credentials: 'include'
    })

    apiError.value = error.value
    return data.value as object | null ?? false
  }

  async function get (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      query: props,
      credentials: 'include'
    })

    apiError.value = error.value
    return data.value as object | null ?? false
  }

  async function put (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: props,
      credentials: 'include'
    })

    apiError.value = error.value
    return data.value as object | null ?? false
  }

  async function remove (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: props,
      credentials: 'include'
    })

    apiError.value = error.value
    return data.value as object | null ?? false
  }

  return { get, post, put, remove }
}
