<template>
  <div class="mesh-tree">
    <div>
      value: {{value}}
    </div>

    <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
      :field-names="{
        children: 'children',
        label: 'name',
        value: 'uuid',
      }"
    ></a-tree-select>
    <div>
      <a-button @click="getObject"  type="primary">获取对象</a-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { defineComponent, ref, watch, inject } from 'vue';
export default defineComponent({
  setup() {
    const ins = inject('ins')
    const value = ref();
    let treeData = ref()

    watch(ins, () => {
      treeData.value = [ins.value.nodeTree]
      console.log(treeData.value)
    }, true);

    const selectObject = ref()
    const getObject = () => {
      console.log(ins.value.scene)
      selectObject.value = ins.value.scene.getObjectByProperty('uuid', value.value)
      selectObject.value.material.emissive = new THREE.Color('red')
      selectObject.value.material.color = new THREE.Color(0x696969)
    }
    return {
      value,
      treeData,
      ins: ins,
      getObject
    };
  },
});
</script>

<style  scoped>
  .mesh-tree {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 250px;
    min-height: 300px;
    background: rgba(255, 255, 255, 0.8);
  }
</style>

