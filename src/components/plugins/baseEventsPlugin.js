import * as THREE from 'three'
import Animations from '../utils/animations'
import makeCycleTextSprite from '../utils/makeCycleTextSprite'
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

export default function baseEventsPlugin(ctx) {
  ctx.on('loaded', () => {
    const interactableMeshes = []
    const { camera, renderer, controls} = ctx
    const interactablePoints = [
      { key: '1', value: '摩天大楼', location: { x: -2, y: 5, z: 0 } }
    ];
  

    // 添加交互点
    interactablePoints.map(item => {
      let point = makeCycleTextSprite(item.key); // 创建标记点
      point.name = item.value;
      point.scale.set(1, 1, 1);
      point.position.set(item.location.x, item.location.y, item.location.z);
      ctx.cityGroup.add(point);
      interactableMeshes.push(point);
    })

    let billboardLabel = null
    // 增加点击事件，声明raycaster和mouse变量
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onClick(event) {
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, camera);

      // 获取raycaster直线和所有模型相交的数组集合
      const intersects = raycaster.intersectObjects(interactableMeshes);
      if (intersects.length > 0) {
        let mesh = intersects[0].object
        Animations.animateCamera(
          camera, 
          controls, 
          { x: mesh.position.x, y: mesh.position.y + 4, z: mesh.position.z + 12 }, 
          { x: 0, y: 0, z: 0 }, 
          1200, 
          () => {
            let billboardDiv = document.createElement('div');
            billboardDiv.className = 'billboard';
            billboardDiv.textContent = mesh.name;
            billboardDiv.style.marginTop = '1em';
            billboardDiv.style.backgroundColor = 'red'
            billboardLabel = new CSS2DObject(billboardDiv);
            billboardLabel.position.set(0, 0, 0);
            mesh.add(billboardLabel);
          }
        );
      } else {
        interactableMeshes.map(item => {
          item.remove(billboardLabel);
        })
      }
    }
    function onPointmove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(interactableMeshes, true);
      if (intersects.length > 0) {
        let mesh = intersects[0].object
        mesh.material.color = new THREE.Color(0x03c03c)
      } else {
        interactableMeshes.map(item => {
          item.material.color = new THREE.Color(0xffffff);
        })
      }
    }
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('click', onClick, false);
    renderer.domElement.addEventListener('pointermove', onPointmove, false);
  })

  // TODO:需要添加清除事件监听
}
