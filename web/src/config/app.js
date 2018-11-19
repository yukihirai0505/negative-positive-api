export const isProd = process.env.NODE_ENV === 'production'
export const apiBaseUrl = isProd ?
  'https://diary.yabaiwebyasan.com' :
  'http://localhost:5000'
