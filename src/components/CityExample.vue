<template>
  <div id="container">

  </div>
</template>

<script>
import ThreejsClass from './ThreejsClass'
import baseEventsPlugin from './plugins/baseEventsPlugin'
import winResizePlugin from './plugins/winResizePlugin'
ThreejsClass.use(baseEventsPlugin)
ThreejsClass.use(winResizePlugin)
export default {
  name: 'CityExample',
  data () {
    return {
      cityModel:'/models/city.fbx',
      ins: null
    }
  },
  mounted() {
    this.ins = new ThreejsClass({cityModel: this.cityModel})
  }
}
</script>
