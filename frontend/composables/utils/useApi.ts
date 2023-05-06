import { notify } from '@kyvg/vue3-notification'

export function useApi (url: string, props?: object) {
  async function post (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: props,
      credentials: 'include'
    })

    if (error.value != null) {
      notify({
        type: 'error',
        title: 'Ошибка',
        text: `${error.value?.data.message as string}`
      })
      return false
    }

    return data.value as object
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

    if (error.value != null) {
      notify({
        type: 'error',
        title: 'Ошибка',
        text: `${error.value?.data.message as string}`
      })
      return false
    }

    return data.value as object
  }

  return { get, post }
}
