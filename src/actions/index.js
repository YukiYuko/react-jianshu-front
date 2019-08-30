import {message, Modal} from "antd";
import Swal from "sweetalert2";
const confirm = Modal.confirm;
// 通用提示
const tips = (msg, type = "info") => {
  message[type](msg)
};
// 通用确认框
const public_confirm = (content = "删除之后无法恢复哦~", title = "提示", ) => new Promise((resolve, reject) => {
  confirm({
    title: title,
    centered: true,
    content,
    cancelText: "取消",
    okText: "确定",
    onOk() {
      resolve();
    },
    onCancel() {
      reject();
    },
  });
});
// 成功弹窗
const successModal = (resultText = "成功") => {
  Swal.fire(
    '',
    resultText,
    'success'
  );
};
// sweet
class Sweet_confirm {
  constructor(options = {}) {
    let def = {
      title: "提示",
      text: "文字",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      resultText: "成功了哟"
    };
    options = {...def, ...options};
    this.title = options.title;
    this.text = options.text;
    this.type = options.type;
    this.showCancelButton = options.showCancelButton;
    this.confirmButtonColor = options.confirmButtonColor;
    this.cancelButtonColor = options.cancelButtonColor;
    this.confirmButtonText = options.confirmButtonText;
    this.cancelButtonText = options.cancelButtonText;
    this.resultText = options.resultText;
  }
  fire() {
    return new Promise((resolve) => {
      Swal.fire({
        title: this.title,
        text: this.text,
        type: this.type,
        showCancelButton: this.showCancelButton,
        confirmButtonColor: this.confirmButtonColor,
        cancelButtonColor: this.cancelButtonColor,
        confirmButtonText: this.confirmButtonText
      }).then((result) => {
        if (result.value) {
          resolve();
        }
      })
    });
  }
}

/*
Swal.fire({
    title: '标题',
    text: "文字",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
* */

export {
  tips,
  public_confirm,
  Sweet_confirm,
  successModal
}
