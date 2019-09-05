import html2canvas from "html2canvas";
/**
 * 根据window.devicePixelRatio获取像素比
 * @return {number}
 */
function DPR() {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
}
/**
 *  将传入值转为整数
 */
function parseValue(value) {
  return parseInt(value, 10);
}
/**
 * 绘制canvas
 */
async function drawCanvas(selector) {
  // 获取想要转换的 DOM 节点
  const dom = document.querySelector(selector);
  const box = window.getComputedStyle(dom);
  // DOM 节点计算后宽高
  const width = parseValue(box.width);
  const height = parseValue(box.height);
  // 获取像素比
  const scaleBy = DPR();
  // 创建自定义 canvas 元素
  const canvas = document.createElement('canvas');

  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  canvas.width = width * scaleBy;
  canvas.height = height * scaleBy;
  // 设定 canvas css宽高为 DOM 节点宽高
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  // 获取画笔
  const context = canvas.getContext('2d');

  // 将所有绘制内容放大像素比倍
  context.scale(scaleBy, scaleBy);

  // 将自定义 canvas 作为配置项传入，开始绘制
  return await html2canvas(dom, {
    canvas,
    allowTaint: true,
    imageTimeout: 0,
    async: true,
    scale: scaleBy
  });
}
export {
  drawCanvas
}
