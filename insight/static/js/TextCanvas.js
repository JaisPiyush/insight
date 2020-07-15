export default function EditText(el){
    this.el = el;
    this.slotChild= undefined;
    this.hammerManager= undefined;
    this.rotationManager= undefined;
    this.pinchManager= undefined;
    this.panManager= undefined;
    this.adjustScale= 1.0;
    this.currentScale= null;
    this.currentRotation= null;
    this.adjustRotation= 0;
    this.adjustDeltaX= 0;
    this.adjustDeltaY= 0;
    this.currentDeltaX= 0;
    this.currentDeltaY= 0;
    this.transforms= [];

    this.setupHammerEvents = function() {


        this.hammerManager = new Hammer.Manager(this.el)
        this.rotationManager = new Hammer.Rotate()
        this.pinchManager = new Hammer.Pinch()
        this.panManager = new Hammer.Pan()

        // Adding all the gestures to hammer Manager
        this.hammerManager.add([
          this.pinchManager,
          this.panManager,
          this.rotationManager
        ])
        
        this.hammerManager.get('pan').set({enable: true});
        this.hammerManager.get('pinch').set({ enable: true })
        this.hammerManager.get('rotate').set({ enable: true })

        this.hammerManager.on('pinch pan rotate', function(event) {
          // console.log(this.el);
          this.transforms = []
          this.currentRotation =
            this.adjustRotation + Math.round(event.rotation)
          this.currentScale = this.adjustScale * event.scale
          this.currentDeltaX =
            this.adjustScale + event.deltaX / this.currentScale
          this.currentDeltaY =
            this.adjustScale + event.deltaY / this.currentScale
          this.transforms.push(`scale(${this.currentScale})`)
          this.transforms.push(
            `translate(${this.currentDeltaX}px,${this.currentDeltaY}px)`
          )
          this.transforms.push(`rotate(${this.currentRotation}deg)`)
          this.el.style.transform = this.transforms.join(' ');

          this.hammerManager.on('panend pinchend rotateend', function(event) {
            this.adjustScale = this.currentScale
            this.adjustRotation = this.currentRotation
            this.adjustDeltaX = this.currentDeltaX
            this.adjustDeltaY = this.currentDeltaY
          })
        })
      
    }

    this.updateTransformations = function() {
      this.el.style.transform = this.transforms.join(' ')
    }

    this.activateTouch = function() {
      this.el.addEventListener('touchmove', event => {
        event.preventDefault()
        this.setupHammerEvents()
      });
    },
    this.deactivateTouch = function() {
      this.el.removeEventListener('touchmove');
    }
}