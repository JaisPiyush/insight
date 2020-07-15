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
        <div class="toolbar-container bg-white">
          <!-- Font Face -->
          <select class="ql-font">
            <option selected>Lato</option>
            <option value="muli">Muli</option>
            <option value="montserrat">Montserrat</option>
            <option value="roboto">Roboto</option>
          </select>
          <select class="ql-color"></select>
          <button class="ql-italic font-muli font-semibold italic">I</button>
          <button class="ql-bold font-muli font-semibold italic">B</button>

          <select class="ql-size"></select>
        </div>

        <!--  editor-box -->
        <div class="ql-editor bg-white shadow-lg" style="height:80vh;">{{text}}</div>
        <!-- <quill-editor ref="editor" v-model="content" /> -->
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
        // Importing Quill
        var Quill = require('@/node_modules/quill/dist/quill.js')
        // Importin font formats
        let Font = Quill.import('formats/font')
        Font.whitelist = ['lato', 'muli']

        // Quill Registrations
        Quill.register(Font, true)

        // Setting Quill
        this.quill = new Quill('.ql-editor', {
          modules: {
            toolbar: '.toolbar-container'
          },
          theme:'snow'
        })

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
      let delta = {'html':html,'text':text};
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
