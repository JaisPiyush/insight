<template>
  <div v-if="this.visible" class="absolute w-full px-4 h-screen z-10 overflow-hidden">
    <client-only>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
      />
      <div
        class="rounded-t-md flex flex-row-reverse mt-10 px-4 py-2 h-12 bg-white border border-b-0 border-gray-500"
      >
        <button
          class="px-4 py-1 bg-blue-600 font-lato text-white rounded-md"
          @click="sendDelta()"
        >
          Done
        </button>
        <button
          class="mr-6 px-4 py-1 bg-red-600 font-lato text-white rounded-md"
          @click="cancelQuillEditor()"
        >
          Cancel
        </button>
      </div>
      <div class="ql-container shadow-lg">
        <!-- Toolbar of Editor -->
        <div class="toolbar-container bg-white h-0 display-none">
        </div>

        <!--  editor-box -->
        <div id="quill-editor" class="ql-editor bg-white shadow-lg" style="height:80vh;"></div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ['active','text'],
  mounted() {},
  updated: function() {
    this.$nextTick(function() {
      if (process.client && this.visible) {
        var Quill = require('@/node_modules/quill/dist/quill.js')
        this.quill = new Quill('.ql-editor', {
          modules: {
            toolbar: '.toolbar-container'
          },
          
        })
        if(this.text != undefined){
          let formedDelta = this.quill.clipboard.convert(this.text);
          console.log(formedDelta);
          this.quill.setContents(formedDelta)
        }

        // Arranging Quill Position
        let containers = document.getElementsByClassName('quill-container')
        if (containers.length > 0) {
          let container = containers[0]
          container.style.setProperty('top', '30%')
        }
      }
    })
  },
  data() {
    return {
      content: null,
      visible: this.active,
      quill: undefined
    }
  },
  methods: {
    deactivateQuillEditor: function() {
      this.quill.enable(false)
      this.quill = null
      this.visible = false
    },
    sendDelta: function() {
      // send delta to upper editor for rendering it into canvas
      let a = '↵'
      let html = this.quill.root.innerHTML;
      let text = this.quill.getText();
      let delta = {'html':html,'text':text, 'edited': false};
      if(this.text != undefined){
        delta['edited'] = true
      }
      this.deactivateQuillEditor()
      this.$emit('deltaReceiver', delta)
    },
    cancelQuillEditor: function(){
      this.deactivateQuillEditor();
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
/* @import url('@/node_modules/quill/dist/quill.snow.css'); */


.ql-editor {
  font-family: 'Lato';
}
.toolbar-container .ql-font span[data-label='Lato']::before {
  font-family: 'Lato';
}
.toolbar-container .ql-font span[data-label='Muli']::before {
  font-family: 'Muli';
}
.toolbar-container .ql-font span[data-label='Montserrat']::before {
  font-family: 'Montserrat';
}
.toolbar-container .ql-font span[data-label='Roboto']::before {
  font-family: 'Roboto';
}

.ql-font-lato {
  font-family: 'Lato';
}
.ql-font-muli {
  font-family: 'Muli';
}

.ql-font-montserrat {
  font-family: 'Montserrat';
}

.ql-font-roboto {
  font-family: 'Roboto';
}

</style>
