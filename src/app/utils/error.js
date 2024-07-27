export function getInputErrorKey(target) {
  for (const key in target) {
    if (target[key]) return key
  }
  return ''
}
