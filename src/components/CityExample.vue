<template>
  <div id="container">

  </div>
</template>

<script>
import ThreejsClass from './ThreejsClass'
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
