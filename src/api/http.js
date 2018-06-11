import Promise from 'promise-polyfill'

export default (uri) =>
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()

    req.addEventListener('load', () => {
      let res = req.response
      if (req.status < 200 || req.status >= 400) return reject(req.statusText)
      try { res = JSON.parse(res) } catch (error) { return reject(error) }
      resolve(res)
    })

    req.addEventListener('error', reject)
    req.open('GET', uri, true)
    req.send()
  })
