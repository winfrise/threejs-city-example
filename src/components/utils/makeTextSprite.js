import * as THREE from "three";

// 创建文字
const makeTextSprite = (text, color, parameters) => {
  if (parameters === undefined) parameters = {};
  var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
  var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 32;
  var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
  var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = fontsize + "px " + fontface;
  var metrics = context.measureText(text);
  var textWidth = metrics.width;
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
  context.lineWidth = borderThickness;
  context.fillStyle = color ? color : "#ffffff";
  context.fillText(text, borderThickness, fontsize + borderThickness);
  context.font = 48 + "px " + fontface;
  context.width = textWidth;
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  var sprite = new THREE.Sprite(spriteMaterial);
  return sprite;
}

export default makeTextSprite
