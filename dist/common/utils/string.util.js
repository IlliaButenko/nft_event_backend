"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
function getFileExtension(filename) {
    const lastIndex = filename.lastIndexOf('.');
    return lastIndex < 1 ? '' : filename.substr(lastIndex);
}
exports.getFileExtension = getFileExtension;
//# sourceMappingURL=string.util.js.map