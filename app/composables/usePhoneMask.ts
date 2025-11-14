export function usePhoneMask() {
  const format = (input: string) => {
    let v = input.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)
    if (v.length > 6) return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`
    if (v.length > 2) return `(${v.slice(0,2)}) ${v.slice(2)}`
    if (v.length > 0) return `(${v}`
    return ''
  }
  return { format }
}
