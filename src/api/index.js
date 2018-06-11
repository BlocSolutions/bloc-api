import http from './http'
import store from './store'
import regions from './regions'
import Promise from 'promise-polyfill'

export default {
  // scope for the index query
  region: 'quebec',

  // fetch an index object of all listings, returns a Promise
  getIndex(region) {
    region = region || this.region
    if (!~regions.indexOf(region)) return Promise.reject(new Error(`"${region}" is not a recognized region`))

    store.clear()
    return http(`https://api.bloc.solutions/api/public/listings/${region}`)
      .then(list =>
        list.reduce((index, listing) =>
          Object.assign(index, { [listing.uid]: listing }), store))
  },

  // fetch a detailed object of one or many listings by UID, returns a Promise
  getListings(...uids) {
    if (!uids.length) return Promise.reject(new Error('No listing UID provided'))

    const listingData = () =>
      Promise.all(uids.map(uid =>
        http(`https://api.bloc.solutions/api/public/listings/get/${uid}`)
          .then(data => (!data.length) ? { uid, error: 'Listing not found' } : data[0])))

    const indexData = () =>
      (!store.count)
        ? this.getIndex()
        : Promise.resolve(store)

    return Promise.all([indexData(), listingData()])
      .then(([index, listings]) =>
        listings.map(listing =>
          Object.assign(listing, index[listing.uid])))
  }
}
