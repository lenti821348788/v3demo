<template>
  <GlobalText/>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import GlobalText from './components/GlobalText.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    GlobalText
  }
}
</script>
