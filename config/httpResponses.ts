interface ISimplePaginatorContract<T = any> {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  rows?: T[]
}
const okPaginated = (paginatorContract: ISimplePaginatorContract) => ({
  status: 200,
  data: {
    pagination: {
      total: paginatorContract.total,
      perPage: paginatorContract.perPage,
      currentPage: paginatorContract.currentPage,
      lastPage: paginatorContract.lastPage,
    },
    data: paginatorContract.rows,
  },
})

const ok = (data) => ({ status: 200, data: { data } })
const created = (data) => ({ status: 201, data: { data } })
const noContent = () => ({ status: 204 })
const notFound = () => ({ status: 404, data: { code: 'NOT_FOUND' } })
const forbidden = (message = undefined) => ({ status: 403, data: { code: 'FORBIDDEN', message } })

export default { okPaginated, ok, created, noContent, notFound, forbidden }
