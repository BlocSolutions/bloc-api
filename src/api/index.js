import http from './http'
import regions from './regions'
import { ListingDetails, ListingIndex } from './resolvers'

function Listings() {
  this.ready = false
  this.config = { region: 'quebec' }
  http('https://api.bloc.solutions/api/public/listings')
    .then(index =>
      index.forEach(listing =>
        Object.assign(this.store, { [listing.uid]: listing })))
    .then(() => {
      this.ready = true
    })
    .catch(err => {
      console.error(err)
    })
}

Listings.prototype.index = function() {

}

Object.defineProperties(Listings.prototype, {
  pending: { value: Array() },
  store: { value: Object() },
  region: {
    get() { return this.config.region },
    set(region) {
      let valid = !!~regions.indexOf(region)
      if (!valid) console.warn(`"${region}" is not a recognized region`)
      else this.config.region = region
    }
  }
})

export default (uid) {
  listings(region = 'quebec') {

    if (!~regions.indexOf(region)) return console.error(`"${region}" is not a recognized region`)
    return fetch(`/listings/${region}`, )
  },

  listing(uid) {
    if (!uid) return console.error(`No listing UID provided`)
    return fetch(`/listings/get/${uid}` (res) => res[0])
  }
}
