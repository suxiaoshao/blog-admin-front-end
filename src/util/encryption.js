import md5 from 'blueimp-md5'
function string_to_md5_3(str) {
    str = md5(str).slice(0, 16)
    str = md5(str).slice(16, 32)
    str = md5(str)
    return str
}
export {
    string_to_md5_3
}