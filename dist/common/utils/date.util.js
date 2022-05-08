"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const pad = (num, size = 2) => {
    const s = '000000000' + num;
    return s.substr(s.length - size);
};
const formatDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
exports.formatDate = formatDate;
//# sourceMappingURL=date.util.js.map