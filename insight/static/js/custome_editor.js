export function Asset(src, contenttype) {
  this.src = src
  this.contenttype = contenttype

  this.getSrc = () => this.src
  this.getContentType = () => this.contenttype

  this.isTypeOf = type => this.contenttype === type
  this.revoke = () => {
    window.URL.revokeObjectURL(this.src)
  }
}

export function AssetCollection() {
  this.assets = []
  this.getAssets = () => this.assets

  this.push = asset => {
    if (asset instanceof Asset) {
      this.assets.push(asset)
    } else {
      this.assets.push(new Asset(asset.src, asset.contenttype))
    }
  }
  
  this.forEach = (callback) => {
      this.assets.forEach(callback)
    }

  this.at = index => this.assets[index]

  this.length = () => this.assets.length

  this.removeAt = (index) => {
    if (index + 1 < this.length()) {
      this.assets = this.assets
        .slice(0, index)
        .concat(this.assets.slice(index + 1, this.length()))
    } else {
      this.assets = this.assets.slice(0, index)
    }
  }

  this.includes = function(src) {
    for (let asset of this.assets) {
      if (asset.getSrc() === src) {
        return true
      }
    }
    return false
  }

  this.replace = function(index, asset) {
    if (index < length()) {
      this.assets[index] =
        asset instanceof Asset ? asset : new Asset(asset.src, asset.contenttype)
    }
  }

  this.present = function(type) {
    for (let asset of this.assets) {
      if (asset.getContentType() === type) {
        return true
      }
    }
    return false
  }

  this.presentAt = function(type) {
    for (let index = 0; index < this.assets.length; index++) {
      if (this.assets[index].getContentType() === type) {
        return index
      }
    }
    return null
  }

  this.indexOf = item => {
    return this.assets.indexOf(item)
  }

  this.revoke = function() {
    for (let asset of this.assets) {
      asset.revoke()
    }
    this.assets = []
  }
  
}


AssetCollection.prototype[Symbol.iterator] = function(){
  let index = 0
  let assets = this.assets
  return {
    next: function() {
      return { value: assets[++index], done: !(index in assets) }
    }
  }
}


