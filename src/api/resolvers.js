export function ListingDetails(data) {
  let listing = data[0]
  let uid = listing.uid

  if (!this.store[uid]) this.store[uid] = []
  Object.assign(this.store[listing.uid], listing)
}

export function ListingIndex(data) {
  this.


  if (!Array.isArray(data)) data = (typeof data === 'object') ? Object.keys(data).map(key => data[key]) : []
  data.index = data.reduce((index, node) => Object.assign(index, { [node.uid]: node }), {})
  return data
}
