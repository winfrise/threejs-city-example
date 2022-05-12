<template>
  <div id="container">

  </div>
  <MeshTree  />
</template>

<script>
import ThreejsClass from './ThreejsClass'
import baseEventsPlugin from './plugins/baseEventsPlugin'
import winResizePlugin from './plugins/winResizePlugin'
import traverseMOdelPlugin from './plugins/traverseModelPlugin'
ThreejsClass.use(baseEventsPlugin)
ThreejsClass.use(winResizePlugin)
ThreejsClass.use(traverseMOdelPlugin)
import MeshTree from './MeshTree.vue'
import { defineComponent, onMounted, provide, ref} from 'vue';

export default defineComponent({
  name: 'CityExample',
  components: {
    MeshTree
  },
  setup() {
    const ins = ref()
    provide('ins', ins)
    onMounted(() => {
      const cityIns = new ThreejsClass({cityModel: '/models/city.json'})
      cityIns.on('traverseComplete', () => {
        ins.value = cityIns
      })
    })

    return {

    }
  }
})
</script>

<style scoped>

</style>
