export default (uri, transform) => {
    let res, err
    const onLoad = []
    const onError = []
    const req = new XMLHttpRequest()

    const $promise = {
      then: (cb) => {
        if (res && !err) cb(res)
        else onLoad.push(cb)
        return $promise
      },
      catch: (cb) => {
        if (!err) onError.push(cb)
        else cb(err)
        return $promise
      }
    }

    const errorHandler = function(error) {
      err = error
      onError.forEach(handler => cb(handler))
    }

    const loadHandler = function() {
      try {
        let response = JSON.parse(this.response)
        if (transform) response = transform(response)
        res = response
      } catch (error) {
        return errorHandler(error)
      }

      if (this.status < 200 || 400 <= this.status) return errorHandler(this.statusText)
      onLoad.forEach(handler => handler(res))
    }

    req.open('GET', uri, true)
    req.addEventListener('load', loadHandler)
    req.addEventListener('error', errorHandler)
    req.send()

    return $promise
  }
