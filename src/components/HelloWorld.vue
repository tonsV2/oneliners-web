<template>
  <div class="hello">
    <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="rank"
      :rotate="{from: 0, to: 0, numOfOrientation: 0}"
      :wordClick="tagClick" />
    <ul>
      <li v-for="tag in selectedTags" v-bind:key="tag.name" @click="unselectTag(tag)">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      tags: [],
      selectedTags: []
    }
  },
  created () {
    axios.get('http://localhost:8080/api/tagsByRank').then(res => {
      this.tags = res.data
    })
  },
  methods: {
    unselectTag: function (tag) {
      this.selectedTags = this.selectedTags.filter(t => t.name !== tag.name)
    },
    tagClick: function (tagName) {
      let exists = this.selectedTags.find(tag => {
        return tag.name === tagName
      })
      if (!exists) {
        let tag = this.tags.find(tag => {
          return tag.name === tagName
        })
        this.selectedTags.unshift(tag)
      }
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
  margin: 0 5px;
}
li:before {
  content: "#";
  padding-right: 0px;
}
a {
  color: #42b983;
}
</style>
