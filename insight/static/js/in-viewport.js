


export default function IsInViewport(el){
  // Binding all videos and elements to stop when they are out of view
  this.el = el;
  this.videos = [];
  this.audios = [];
  this.sliders = [];


  this._isInViewport = function(el){
    const scroll = window.scrollY || window.pageYOffset
    const boundsTop = el.getBoundingClientRect().top + scroll

    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
    }

      const bounds = {
      top: boundsTop,
      bottom: boundsTop + el.clientHeight,
    }

    return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
      || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );

  }

  this.handler = (entries,observers) => {
    entries.forEach((entry, i) => {
      if(entry.intersectionRatio <= 0.40){
        let video = entry.target.querySelector('video');
        let audio = entry.target.querySelector('audio');
        if(video != undefined){
          video.pause();
        }
        if(audio != undefined){
          audio.pause()
        }
      }
    });

  }

  this.$init = function() {
    let options ={
      root: null,
      rootMargin:'0px',
      threshold:0.40
    }
   let sliders = this.el.querySelectorAll('.slider');
   sliders.forEach((slider, i) => {
     let observer = new IntersectionObserver(this.handler,options);
     observer.observe(slider);
   });


  }


}





// Usage.
