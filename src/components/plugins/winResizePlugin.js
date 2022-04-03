export default function winResizePlugin() {
  this.on('loaded', () => {
    const { camera, labelRenderer, renderer } = this
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);
  })

  // TODO:需要添加清除事件监听
}
