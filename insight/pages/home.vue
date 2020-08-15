<template>
  <div class="w-full h-full" id="home">
  <loading-container :loading="loading">
    <div
      class="w-full h-full py-2 flex flex-col overflow-x-hidden overflow-y-scroll"
    >
      <div v-if="this.registered" class="header py-2 flex px-4">
        <img :src="avatar" class="w-12 h-12 rounded-full" />
        <div class="w-auto ml-4 h-full flex flex-col justify-center">
          <p class="font-lato font-semibold text-2xl">{{ firstName }}</p>
        </div>
      </div>
      <div class="body flex flex-col">
        <div v-for="post in posts" :key="post.post_id">
            <post-box :propsAsset="post" :index="posts.indexOf(post)" :cindex="cindex" :commentActive="true" @current-index="updateIndex" />
        </div>
      </div>
    </div>
  </loading-container>
  </div>
</template>

<script>
import PostBox from '@/components/post_elements/PostBox.vue'
import LoadingContainer from '@/components/LoadingContainer.vue'
import FrozenStorage from '@/static/js/local_storage'
export default {
  components: {
    PostBox,
    LoadingContainer
  },
  mounted() {
    this.fetchPosts()
  },
  data() {
    return {
      firstName: 'Piyush',
      avatar:
        'https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg',
      registered: true,
      cindex:0,
      posts: [],
      loading: false,
      error: false,
      observer: undefined
    }
  },
  methods: {
    fetchPosts: async function() {
      this.loading = true
      let storage = new FrozenStorage()
      const url = `${process.env.SERVER_API}feed`
      let token = storage.get('token')
      if (token != null) {
        this.$axios.setHeader('Authorization', token)
      }
      this.$axios
        .get(url)
        .then(res => {
          let { data, status } = res
          if (status === 200) {
            this.posts = data.posts
            this.loading = false
          }
        })
        .catch(err => {
          this.loading = false
          this.error = true
        })
    },
    updateIndex: function(index){
        this.cindex = index;
    }
  }
}
</script>

<style scoped></style>
