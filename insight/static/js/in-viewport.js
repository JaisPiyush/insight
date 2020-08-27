export default function IsInViewport(el) {
  // Binding all videos and elements to stop when they are out of view
  this.el = el

  this.handler = (entries, observers, callback) => {
    entries.forEach((entry, i) => {
      // console.log(entry.intersectionRatio);
      callback(entry);
      if (entry.intersectionRatio <= 0.45) {
        let video = entry.target.querySelector('video')
        let audio = entry.target.querySelector('audio')
        if (video != null) {
          video.pause()
        }
        if (audio != null) {
          audio.pause()
        }
      } 
    })
  }

  this.$unbind = function(el){
    this.observer.unobserve(el);
  }

  this.$init = function(el, callback) {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }
    //  let sliders = this.el.querySelectorAll('.slider');
    //  sliders.forEach((slider, i) => {
    this.observer = new IntersectionObserver((entries, observers) => {
      this.handler(entries, observers, callback)
    }, options)
    this.observer.observe(el)
    //  });
  }
}

// Usage.
