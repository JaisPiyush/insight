<template>
  <div
    class="w-full post-box bg-white my-4 overflow-hidden"
    style="border-bottom-right-radius: 1.25rem;border-bottom-left-radius: 1.25rem;"
  >
    <div
      class="header w-full h-16 px-2 flex flex-row flex-no-wrap py-2 border border-gray-300 border-l-0 border-t-0 border-r-0"
    >
      <img :src="avatar" class="w-12 h-12 rounded-lg" />

      <div class="w-auto h-full flex flex-col  ml-4">
        <p
          @click="$router.push(userurl)"
          class="block font-lato font-bold text-black text-base"
        >
          {{ username }}
        </p>
        <p class="font-lato font-light text-gray-700 text-sm">
          {{ hobbyName }}
        </p>
      </div>
      <div class="w-full h-full flex flex-row-reverse px-2">
        <button
          @click="followClickListener()"
          class="font-lato font-semibold text-lg text-blue-500 rounded-md h-10 px-4 bg-blue-100"
        >
          Follow
        </button>
      </div>
    </div>

    <!-- Body -->
    <div v-if="this.intersecting" class="body w-full">
      <AssetSlider :play="play && (cindex === index)" :propAsset="assets" :index="index" />
    </div>

    <!-- Footer -->
    <div class="w-full h-auto flex flex-col footer">
      <!-- truncated Caption -->
      <div
        v-if="this.caption != undefined && !this.fullCaption"
        class="w-full h-auto py-1 px-2 py-2 flex"
      >
        <div class="h-full" style="width:73%;">
          <div
            class="w-full truncate font-muli font-medium text-base"
            v-html="caption"
          ></div>
        </div>
        <button
          @click="showFullCaption()"
          class="px-4 bg-transparent outline-none border-0 text-gray-500 text-sm"
        >
          Read More
        </button>
      </div>

      <!-- Actions -->
      <div class="w-full h-16 flex overflow-hidden">
        <div class="w-full h-auto flex px-2 py-2">
          <button
            @click="bindAction('love')"
            :class="
              `w-auto focus:outline-none h-auto py-0 px-2 ${
                actions.loved ? 'bg-red-200 rounded-md' : ''
              }`
            "
          >
            <i
              :class="
                `fa ${
                  actions.loved ? 'fa-heart' : 'fa-heart-o'
                } stroke-current text-red-600 fa-lg`
              "
            ></i>
            <span
              class="ml-1 font-muli font-medium text-red-600 text-gray-800 text-sm"
              >{{ retroText(loves) }}</span
            >
          </button>
          <button
            :class="
              `w-auto ml-1 focus:outline-none h-auto py-0 px-2 ${
                actions.viewed ? 'bg-purple-100 rounded-md' : ''
              }`
            "
          >
            <i
              class="fa fa-dot-circle-o stroke-current text-purple-700 fa-lg"
            ></i>
            <span
              class="ml-1 font-muli font-medium text-purple-600 text-gray-800 text-sm"
              >{{ retroText(views) }}</span
            >
          </button>

          <button
            v-if="this.shareable"
            @click="bindAction('share')"
            :class="
              `w-auto focus:outline-none ml-1 h-auto py-0 px-2 ${
                actions.shared ? 'bg-blue-100 rounded-md' : ''
              }`
            "
          >
            <i class="fa fa-share stroke-current text-blue-700 fa-lg"></i>
            <span
              class="ml-1 font-muli font-medium text-blue-700 text-gray-800 text-sm"
              >{{ retroText(shares) }}</span
            >
          </button>

          <button class="ml-1 px-4 w-auto focus:outline-none h-auto py-2">
            <i
              v-if="this.actions.saved"
              class="fa fa-bookmark fa-2x"
              aria-hidden="true"
            ></i>
            <i v-else class="fa fa-bookmark-o fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <button
          @click="$emit('enable-comment')"
          class="w-auto focus:outline-none h-12 pt-2 px-2 outline-none bg-black rounded-lg mt-2 mr-2"
        >
          <span class="material-icons text-3xl stroke-current text-white">
            comment
          </span>
        </button>
      </div>

      <!-- Full Caption -->
      <div
        v-if="this.caption != undefined && this.fullCaption"
        class="w-full h-auto py-2 px-4 flex flex-col"
      >
        <div class="w-full h-auto word">
          <p class="word font-muli font-medium text-base" v-html="caption"></p>
        </div>
        <div class="w-full h-auto">
          <button @click="truncateCaption()" class="text-base text-gray-600">
            Show Less
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* TODO: Add Verified Tick */
import AssetSlider from '@/components/post_elements/AssetSlider.vue'
import { mapActions } from 'vuex'
export default {
  props: ['commentActive', 'propsAsset','index','cindex'],
  components: {
    AssetSlider
  },
  beforeDestroy(){
    this.$el.removeEventListener('scroll');
  },
  mounted() {
    this.bindDataWithPropsAsset()
    this.getCaption()
    this.$nextTick().then(() => {
      let height = (window.innerHeight * 10) / 100
      let options = {
        root: document.querySelector('#home'),
        rootMargin: `${height}px`,
        threshold: 0.75
      }
      let self = this;
      let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            self.intersecting = true
            self.$el.addEventListener('scroll', function(e) {
              self.monitorAssets(e)
            });
            self.$el.addEventListener('click', function(){
              self.$emit('current-index', self.index);
            })
            observer.unobserve();
          } else {
            this.intersecting = false
          }
        })
      }, options)
      observer.observe(this.$el)
    })
    if (this.intersecting && this.actions.viewed === false) {
      this.bindAction('view')
    }
  },
  data() {
    return {
      intersecting: false,
      userurl: '',
      shareable: true,
      avatar:
        'https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg',
      username: undefined,
      hobbyName: undefined,
      pid: undefined,
      play:true,
      assets: {
        images: [],
        video: undefined,
        audio: undefined,
        text: {}
      },
      caption:undefined,
      loves: 0,
      shares: 0,
      comments: 0,
      saves: 0,
      views: 0,
      created: undefined,
      actions: {
        loved: false,
        shared: false,
        viewed: false,
        saved: false
      },
      fullCaption: false
    }
  },
  methods: {
    ...mapActions('post/post_actions', ['microActionPost']),
    bindDataWithPropsAsset: function() {
      // this.pid = this.propsAsset.post_id;
      // this.username = this.propsAsset.header.username;
      // this.avatar = this.propsAsset.header.avatar;
      // this.actions = this.propsAsset.meta.actions;
      // this.created = this.propsAsset.meta.created;
      // this.assets = this.propsAsset.body;
      // this.caption = this.propsAsset.caption;
      // this.loves = this.propsAsset.footer.love;
      // this.shares = this.propsAsset.footer.share;
      // this.comments = this.propsAsset.footer.comment;
      // this.saves = this.propsAsset.footer.save;
      // this.view = this.propsAsset.footer.view;
      // this.userurl = `/post/${this.propsAsset.meta.account_id}`;
    },
    retroText: function(text) {
      if (text >= 1000) {
        return `${(text / 1000).toFixed(2)}K`
      } else {
        return text
      }
    },
    inView: function() {
      // Check post in view other wise stop video or song if exist. and if images.length ==0 && audio != undefined, then
      // set active to false in asset Slider
    },
    getCaption: function() {
      let regex = /@[0-9a-z_?]+|#[0-9a-z_?]+/gi
      let matches = this.caption.match(regex) || []
      if (matches.length > 0) {
        for (let index = 0; index < matches.length; index++) {
          if (matches[index].includes('#')) {
            this.caption = this.caption.replace(
              matches[index],
              `<span class="font-montserrat italic text-blue-500">${matches[index]}</span>`
            )
          } else if (matches[index].includes('@')) {
            this.caption = this.caption.replace(
              matches[index],
              `<span class="font-montserrat text-blue-700">${matches[index]}</span>`
            )
          }
        }
      }
    },
    followClickListener: function() {},
    showFullCaption: function() {
      this.fullCaption = true
    },
    truncateCaption: function() {
      this.fullCaption = false
    },

    bindAction: function(type) {
      if (type === 'love') {
        this.actions.loved = !this.actions.loved
        if (this.actions.loved) {
          this.loves += 1
        } else {
          this.loves -= 1
        }
        this.microActionPost({
          action: this.actions.loved ? 'love' : 'un_love',
          pid: this.pid
        })
      } else if (type === 'view') {
        this.actions.viewed = true
        this.views += 1
        this.microActionPost({ action: 'view', pid: this.pid })
      } else if (type === 'share') {
        const shareurl = `https://www.freaquish.com/post/${this.pid}`
        if (navigator.share) {
          navigator
            .share({
              title: `Post on ${this.hobbyName} by ${this.username}`,
              text: this.caption,
              url: shareurl
            })
            .then(() => {
              this.actions.shared = true
              this.shares += 1
              this.microActionPost({ action: 'share', pid: this.pid })
            })
        }
        // this.microActionPost({action:'view',pid:this.pid});
      } else if (type === 'save') {
        if (this.actions.loved) {
          this.microActionPost({
            action: 'un_save',
            pid: this.pid,
            action_complete: () => {
              this.actions.saved = false
            }
          })
        } else {
          this.microActionPost({
            action: 'save',
            pid: this.pid,
            action_complete: () => {
              this.actions.saved = true
            }
          })
        }
      }
    },

    monitorAssets: function(e) {
      let headHeight = window.innerHeight * 10/100;
      let bound = this.$el.getBoundingClientRect()
      if (
        bound.bottom >
        (window.innerHeight || document.documentElement.clientHeight) - headHeight
      ) {
        this.intersecting = false;
      }else if((bound.bottom+(bound.height/2)) >= (window.innerHeight || document.documentElement.clientHeight) - headHeight){
        this.play = false;
      }else{
        this.play = true;
        this.intersecting = true;
      }
    }
  }
}
</script>

<style scoped>
.post-box {
  height: auto;
  display: flex;
  flex-flow: column;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body {
  max-height: 60vh;
  min-height: 35vh;
}

.word {
  word-wrap: break-word;
  overflow: hidden;
}
</style>
