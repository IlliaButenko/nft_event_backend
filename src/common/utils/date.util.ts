const pad = (num, size = 2) => {
    const s = '000000000' + num;
    return s.substr(s.length - size);
}
  
export const formatDate = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;