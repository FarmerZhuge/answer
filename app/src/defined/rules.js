export const required = function(error) {
    return { required: true, message: error };
}

export const phone = function (val) {
    return /1\d{10}/.test(val);
}

export const idcard = function (val) {
    let reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/; // 15位身份证
    let reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; // 18位身份证
    return !!val && ( reg15.test(val) || reg18.test(val));
}