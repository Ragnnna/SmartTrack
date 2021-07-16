const checkRequiredAndLength = (str: string, min: number, max: number): boolean => {
  if(str.length < min || str.length > max){
    return false
  }
  return true
}

const checkEmail = (str: string): boolean => {
  return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(str)
}

const normalizeColor = (str: string): string => {
  return str.match(/.*(?=, 0.19)/)![0] + ')'
}

export {
  checkEmail,
  checkRequiredAndLength,
  normalizeColor
}