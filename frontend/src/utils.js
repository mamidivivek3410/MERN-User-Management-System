export const Captlize = (str) => {
    return str.split(' ').map((s) => s[0].toUpperCase() + s.slice(1)).join(' ');
}

export const Avatar = (str) => {
    return String(str).split(' ').map((n)=>n[0].toUpperCase()).join('')
}