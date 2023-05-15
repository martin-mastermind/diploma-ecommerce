import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ApplicationEvents = {
  'user:registered': string
}

const emitter = mitt<ApplicationEvents>()

export const useEvent = emitter.emit
export const useListen = emitter.on
