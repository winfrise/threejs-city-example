import * as THREE from "three";

/**
 * 创建圆形文字
 * @param {String} text - 显示的文字
 * @param {String} color - 圆的填充颜色
 * @param {String} borderColor - 圆的边框颜色
 * @param {String} textColor - 文字颜色
 * @param {*} W - 画布的宽
 * @param {*} H - 画布的高
 * @param {*} borderWidth - 边框的宽
 * @returns Object
 */

const makeCycleTextSprite = (text, color = 'black', borderColor = 'white',  textColor = 'white', W = 100, H = 100, borderWidth = 6) => {
  var canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  var ctx = canvas.getContext('2d');

  // 绘制圆的路径
  ctx.beginPath();
  ctx.arc((W + borderWidth) / 2, (H + borderWidth) / 2, 40, 0, Math.PI * 2, true);
  ctx.closePath();

  // 填充背景颜色
  ctx.fillStyle = color;
  ctx.fill();

  // 填充边框颜色
  ctx.lineWidth = borderWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  // 填充文字颜色
  ctx.font = "64px Arial";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  var metrics = ctx.measureText(text);
  ctx.fillText(text, (W + borderWidth) / 2, (H + borderWidth * 2) / 2 + metrics.fontBoundingBoxDescent + metrics.actualBoundingBoxDescent * 4);

  // 创建 Threejs 文字材质
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: .8,
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  return sprite;
}

export default makeCycleTextSprite
