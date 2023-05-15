import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ApplicationEvents = {
  'catalog:dropdown': 'sort' | 'filter'
  'catalog:update': {
    sort?: Client.CatalogSortType
    filter?: Client.CatalogFilter
  }
}

const emitter = mitt<ApplicationEvents>()

export const useEvent = emitter.emit
export const useListen = emitter.on
