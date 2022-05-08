"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericRangeTransformer = exports.ColumnNumericTransformer = void 0;
class ColumnNumericTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return parseFloat(data);
    }
}
exports.ColumnNumericTransformer = ColumnNumericTransformer;
class NumericRangeTransformer {
    to(data) {
        return JSON.stringify(data);
    }
    from(data) {
        if (!data) {
            return [0, 0];
        }
        return JSON.parse(`${data.substr(0, data.length - 1)}]`);
    }
}
exports.NumericRangeTransformer = NumericRangeTransformer;
//# sourceMappingURL=typeorm.util.js.map