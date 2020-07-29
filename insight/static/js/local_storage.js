export default function FrozenStorage() {
  this.storage = window.localStorage

  this.set = function(key, value) {
    window.localStorage.setItem(`ins_${key}`, JSON.stringify(value))
  }

  this.get = function(key) {
      return JSON.parse(window.localStorage.getItem(`ins_${key}`));
  }

  this.remove = function(key){
      window.localStorage.removeItem(`ins_${key}`);
  }

  this.clear = function(){
      window.localStorage.clear();
  }
}
