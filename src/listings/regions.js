const regions = ['quebec']
regions.validate = (region) =>
  !!~regions.indexOf(region)

export { regions as default }
