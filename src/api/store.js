export default
  Object.create(null, {
    count: {
      get() { return Object.keys(this).length },
      set(v) { }
    },
    clear: {
      value: function() {
        Object.keys(this).forEach(key => delete this[key])
      }
    }
  })
