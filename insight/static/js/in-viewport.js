


export default function IsInViewport(el){
  // Binding all videos and elements to stop when they are out of view
  this.el = el;

  this.handler = (entries,observers) => {
    entries.forEach((entry, i) => {
      // console.log(entry);
      if(entry.intersectionRatio <= 0.45){

        let video = entry.target.querySelector('video');
        let audio = entry.target.querySelector('audio');
        if(video != null){
          video.pause();
        }
        if(audio != null){
          audio.pause()
        }
      }
    });

  }

  this.$init = function() {
    let options ={
      root: null,
      rootMargin:'0px',
      threshold:0.4
    }
   let sliders = this.el.querySelectorAll('.slider');
   sliders.forEach((slider, i) => {
     let observer = new IntersectionObserver(this.handler,options);
     observer.observe(slider);
   });


  }


}





// Usage.
