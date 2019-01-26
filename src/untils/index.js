/**
 * @description 格式化数字 K M 等
 * @param num：原始数据
 * @param digits：保留几位
 * @returns {string}
 */
function nFormatter(num, digits = 1) {
    const si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "K" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
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
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

export {
    nFormatter,
    toThousandslsFilter
}
