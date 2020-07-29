export default function EditText(el) {
  this.el = el
  this.slotChild = undefined
  this.hammerManager = undefined
  this.rotationManager = undefined
  this.pinchManager = undefined
  this.panManager = undefined
  this.tapManager = undefined
  this.doubleTapManager = undefined
  this.adjustScale = 1.0
  this.currentScale = null
  this.currentRotation = null
  this.adjustRotation = 0
  this.adjustDeltaX = 0
  this.adjustDeltaY = 0
  this.currentDeltaX = 0
  this.currentDeltaY = 0
  this.transforms = []
  this.tapFunction = undefined
  this.doubleTapFunction = undefined

  this.setupHammerEvents = function() {
    // console.log(this.el)
    this.hammerManager = new Hammer.Manager(this.el)
    this.rotationManager = new Hammer.Rotate()
    this.pinchManager = new Hammer.Pinch()
    this.panManager = new Hammer.Pan()
    this.tapManager = new Hammer.Tap({
      event: 'singletap',
      taps: 1
    })
    this.doubleTapManager = new Hammer.Tap({
      event: 'doubletap',
      taps: 2
    })

    // Adding all the gestures to hammer Manager
    this.hammerManager.add([
      this.pinchManager,
      this.panManager,
      this.rotationManager,
      this.tapManager,
      this.doubleTapManager
    ])

    this.hammerManager.get('pan').set({ enable: true })
    this.hammerManager.get('pinch').set({ enable: true })
    this.hammerManager.get('rotate').set({ enable: true })

    var self = this

    this.hammerManager.on('pinch pan rotate tap doubletap', function(event) {
      self.transforms = []
      self.currentRotation = self.adjustRotation + Math.round(event.rotation)
      self.currentScale = self.adjustScale * event.scale
      self.currentDeltaX = self.adjustScale + event.deltaX / self.currentScale
      self.currentDeltaY = self.adjustScale + event.deltaY / self.currentScale
      if(self.currentScale <= 4){
        self.transforms.push(`scale(${self.currentScale})`)
      }else{
        self.transforms.push(`scale(4)`)
      }
      
      if(event.center.x <= window.innerWidth && event.center.x >= 0){
        self.transforms.push(
          `translate(${self.currentDeltaX}px,${self.currentDeltaY}px)`
        )
      }
      self.transforms.push(`rotate(${self.currentRotation}deg)`)
      self.el.style.transform = self.transforms.join(' ')
      console.log(self, event)

      self.hammerManager.on('panend pinchend rotateend', function(event) {
        self.adjustScale = self.currentScale
        self.adjustRotation = self.currentRotation
        self.adjustDeltaX = self.currentDeltaX
        self.adjustDeltaY = self.currentDeltaY
      })
    })
  }

  this.updateTransformations = function() {
    this.el.style.transform = this.transforms.join(' ')
  }

  ;(this.activateTouch = function() {
    var self = this
    this.el.addEventListener('touchmove', event => {
      event.preventDefault()
      self.setupHammerEvents()
    })
  }),
    (this.deactivateTouch = function() {
      this.el.removeEventListener('touchmove')
    })
}
