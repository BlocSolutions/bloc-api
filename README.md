# bloc-api

Connect to the [Bloc.Solutions](https://bloc.solutions) listings API.

## Install

### Browser

> exposes global `bloc` object

```html
<script src="https://unpkg.com/bloc-api"></script>
<script>bloc.listings().then(function(index) { /*...*/ })</script>
```

### npm

> install from npm registry

```bash
npm i bloc-api
```

> import in your project

```javascript
import bloc from 'bloc-api'
bloc.listings().then(index => { /*...*/ })
```

## Configuration

> with default values

```javascript
bloc.listings.region = 'quebec'
```

## Usage

Unless otherwise specified, all methods return a `Promise` that recevies the query result.

### Listings index

The full list of list for the configured region

#### Example

```javascript
bloc.listings()
  .then(index => {
  	Object.values(index)
  		.forEach(item => console.log(item))
	})
```

#### Response schema

> Object where first-level keys are the listings' UIDs

```javascript
{
  [uid]: {
    uid: Number,
    geo: {
      area: String,
      position: { 
        lat: Number, 
        lng: Number 
      }
    },
    price: Number,
    bedrooms: Number,
    bathrooms: Boolean,
    vacancy: Date,
    name: String || null,
    phone: String || null,
    email: String,
    address: String,
    media: {
      img: [ String ],
      link_360: String || null
    },
    proprieties: {
      animals: Boolean,
      smoking: Boolean,
      reduced_mobility: Boolean
    },
    extras: {
      parking: Boolean
    },
    utilities: {
      heating: Boolean,
      gas: Boolean,
      electricity: Boolean,
      hot_water: Boolean,
      water_tax: Boolean
    },
    appliances: {
      stove: Boolean,
      stove_connection: Boolean,
      refrigerator: Boolean,
      refrigerator_connection: Boolean,
      washer: Boolean,
      washer_connection: Boolean,
      dryer: Boolean,
      dryer_connection: Boolean,
      dishwasher: Boolean,
      dishwasher_connection: Boolean
    }
  }
}
```

### Detailed listings

The detailed listing with all available data

#### Example

```javascript
// bloc.listings(<Number> uid [...<Number> uid])
bloc.listings(33, 95)
  .then(index => {
  	Object.values(index)
  		.forEach(item => console.log(item))
	})
```

#### Response schema

> An object where the keys are the requested UIDs

```javascript
// everything from the index data, plus:
{
  [uid]: {
    description: String,
    name: String || null,
    media: {
      blueprints: String || null
    },
    proprieties: {
      surface: Number || null,
      credit: Boolean,
      animals: Boolean,
      snow_clearance: Boolean
    },
    furniture: {
      table: Boolean,
      table_amount: Number,
      chair: Boolean,
      chair_amount: Number,
      drawer: Boolean,
      drawer_amount: Number,
      couch: Boolean,
      couch_amount: Number,
      lazyboy: Boolean,
      lazyboy_amount: Number,
      bed: Boolean,
      bed_amount: Number
    },
    utilities: {
      heating: Boolean,
      gas: Boolean,
      electricity: Boolean,
      hot_water: Boolean,
      water_tax: Boolean
    },
    extras: {
      parking: Boolean,
      parking_type: String || null,
      parking_price: String,
      storage: Boolean
    },
    bonus: {
      int_pool: Boolean,
      ext_pool: Boolean,
      private_balcony: Boolean,
      utility_room: Boolean,
      ac: Boolean,
      bbq: Boolean,
      spa: Boolean,
      internet: Boolean,
      fireplace: Boolean,
      backyard: Boolean
    }
  }
}
```

