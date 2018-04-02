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

export default {
  name: 'HelloWorld',
  data () {
    return {
      tags: [
        {'name': 'tag0', 'rank': 1},
        {'name': 'tag1', 'rank': 2},
        {'name': 'tag2', 'rank': 3},
        {'name': 'tag3', 'rank': 4}
      ]
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
