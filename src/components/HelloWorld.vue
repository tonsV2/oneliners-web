<template>
  <div class="hello">
    <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="rank" />
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  created () {
    axios.get('http://localhost:8080/api/tagsByRank').then(res => {
      this.tags = res.data
    })
  },
  data () {
    return {
      tags: []
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
