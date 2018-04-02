<template>
  <div class="hello">
    <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="rank"
      :wordClick="tagClick" />
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  methods: {
    tagClick: function (tagName) {
      let exists = this.selectedTags.find(tag => {
        return tag.name === name
      })
      if (!exists) {
        let tag = this.tags.find(tag => {
          return tag.name === name
        })
        this.selectedTags.unshift(tag)
      }
    }
  },
  created () {
    axios.get('http://localhost:8080/api/tagsByRank').then(res => {
      this.tags = res.data
    })
  },
  data () {
    return {
      tags: [],
      selectedTags: []
    }
  },
  watch: {
    selectedTags: function () {
      console.log(this.selectedTags)
    }
  },
  components: {
    wordcloud
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
