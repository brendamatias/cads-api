export const validateCnpj = (cnpj: string) => {
  console.log('aq')
  if (cnpj.length !== 14) return false

  const items = [...new Set(cnpj)]

  if (items.length === 1) return false

  const calc = (x) => {
    const slice = cnpj.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n: number = parseInt(slice[x - i], 10)

      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  const digits = cnpj.slice(12)

  const digit0 = calc(12)
  if (digit0 !== parseInt(digits[0], 10)) return false

  const digit1 = calc(13)
  return digit1 === parseInt(digits[1], 10)
}
