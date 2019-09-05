const highlight = (value, data) => {
  let re = new RegExp(value, "g"); //定义正则
  data = data.replace(
    re,
    `<span class="highlight">${value}</span>`
  );
  return data;
};

export {
  highlight
}
