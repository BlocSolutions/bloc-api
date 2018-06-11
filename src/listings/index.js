import http from './http'
import store from './store'
import regions from './regions'
import Promise from 'promise-polyfill'

const config = { region: 'quebec' }

const listToIndex = (index, node) =>
  Object.assign(index, { [node.uid]: node })

// main interface
const listingsInterface = function(...uids) {
  // fetch an index of all listings, returns a Promise
  const getIndex = function() {
    store.clear()
    return http(`https://api.bloc.solutions/api/public/listings/${config.region}`)
      .then(list => list.map(item => {
        item.price = Number(item.price)
        item.vacancy = new Date(item.vacancy)
        return item
      }))
      .then(list => list.reduce(listToIndex, store))
  }

  const listingData = () =>
    Promise.all(uids.map(uid =>
      http(`https://api.bloc.solutions/api/public/listings/get/${uid}`)
        .then(data => (!data.length) ? { uid, error: 'Listing not found' } : data[0])))

  const indexData = () =>
    (!store.count) ? getIndex() : Promise.resolve(store)

  if (!uids.length) return getIndex()

  return Promise.all([indexData(), listingData()])
    .then(([index, listings]) =>
      listings
        .map(listing => Object.assign(listing, index[listing.uid]))
        .reduce(listToIndex, {}))
}

Object.defineProperty(listingsInterface, 'region', {
  get() { return config.region },
  set(region) {
    if (!regions.validate(region)) throw new Error(`"${region}" is not a recognized region`)
    config.region = region
  }
})

export { listingsInterface as default }
