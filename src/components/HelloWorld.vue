<template>
  <div id="container">
    <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="rank"
      :rotate="{from: 0, to: 0, numOfOrientation: 0}"
      :wordClick="selectTag" />
    <ul>
      <li v-for="tag in selectedTags" v-bind:key="tag.name" @click="unselectTag(tag)" class="selectedTag">{{tag.name}}</li>
    </ul>
    <ul id="oneLiners">
      <li v-for="oneLiner in oneLiners" v-bind:key="oneLiner.id" class="oneLiner">
        <h3>{{oneLiner.name}}</h3>
        <code>{{oneLiner.line}}</code>
        <div>{{oneLiner.description}}</div>
        <div>
          <sub v-for="tag in oneLiner.tags" v-bind:key="tag.id" @click="selectTag(tag.name)">#{{tag.name}} </sub>
        </div>
        <a v-bind:href="'http://localhost:8080/api/oneliners/' + oneLiner.id">api</a>
      </li>
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
      selectedTags: [],
      oneLiners: []
    }
  },
  created () {
    this.fetchTags()
    this.fetchOneLiners()
  },
  methods: {
    fetchTags: function () {
      axios.get(this.$backend + '/tagsByRank').then(res => {
        this.tags = res.data
      })
    },
    fetchOneLiners: function () {
      axios.get(this.$backend + '/oneliners').then(res => {
        this.oneLiners = res.data
      })
    },
    unselectTag: function (tag) {
      this.selectedTags = this.selectedTags.filter(t => t.name !== tag.name)
    },
    selectTag: function (tagName) {
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
      let tagNames = this.selectedTags.map(tag => tag.name)
      axios.post('http://localhost:8080/api/findByAllTags', tagNames).then(res => { this.oneLiners = res.data })
    }
  },
  components: {
    wordcloud
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 80%;
  margin: auto;
  text-align: center;
}
#oneLiners {
  text-align: left;
}
h1, h2 {
  font-weight: normal;
}
h3 {
  margin-bottom: 3px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li.selectedTag {
  display: inline-block;
  margin: 0 5px;
}
li.selectedTag:before {
  content: "#";
  padding-right: 0px;
}
a {
  color: #000;
}
</style>
