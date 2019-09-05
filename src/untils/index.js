import dayjs from "dayjs";
import { message } from "antd";
/**
 * @description 格式化数字 K M 等
 * @param num：原始数据
 * @param digits：保留几位
 * @returns {string}
 */
function nFormatter(num, digits = 1) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

/**
 * @description 将数字以，每三位隔开
 * @param num
 * @returns {string}
 */
function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * @return {string}
 */
function GetUrlParam(paraName) {
  const url = document.location.toString();
  let arrObj = url.split("?");

  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split("&");
    let arr;

    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}

// 正则获取url参数
const getURLParams = (url = window.location.href) => {
  let q = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  return q;
};
// 通过原生自带黑科技获取
const getUrlParams = (key, url = window.location.href) =>
  new URL(url).searchParams.get(key);

const formatTime = (time, type = "YYYY-MM-DD HH:mm") => {
  if (!time) {
    return dayjs().format("YYYY-MM-DD");
  }
  return dayjs(time).format(type);
};

// 防抖
function debounce(fn, time = 1000) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, arguments);
    }, time);
  };
}
// 验证文件上传
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 jpg/png 类型的图片");
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error("图片不能大于5M");
  }
  return isJpgOrPng && isLt2M;
}
function wordlimit(classname, wordlength) {
  //参数分别为：类名，要显示的字符串长度
  let cname = document.getElementsByClassName(classname); //需要加省略符号的元素对象
  for (let i = 0; i < cname.length; i++) {
    let nowhtml = cname[i].innerHTML; //元素的内容
    let nowlength = cname[i].innerHTML.length; //元素文本的长度
    if (nowlength > wordlength) {
      cname[i].innerHTML = nowhtml.substr(0, wordlength) + "..."; //截取元素的文本的长度并加上省略号
    }
  }
}
// wordlimit("sldiv",15);
// 禁止浏览器滚动
function toggleBody(isPin) {
  if (isPin) {
    document.body.style.height = "100vh";
    document.body.style["overflow-y"] = "hidden";
  } else {
    document.body.style.height = "";
    document.body.style["overflow-y"] = "";
  }
}


export {
  nFormatter,
  toThousandslsFilter,
  GetUrlParam,
  formatTime,
  getURLParams,
  getUrlParams,
  debounce,
  beforeUpload,
  wordlimit,
  toggleBody
};
