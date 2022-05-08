"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteFromRepository = exports.saveDtoToRepository = exports.getFromDto = void 0;
function getFromDto(dto, data, fields) {
    let properties = [];
    if (fields && fields.length) {
        properties = fields;
    }
    else {
        properties = Object.keys(dto);
    }
    properties.forEach((property) => {
        data[property] = dto[property];
    });
    return data;
}
exports.getFromDto = getFromDto;
function saveDtoToRepository(dto, data, repository, fields) {
    const obj = getFromDto(dto, data, fields);
    return repository.save(obj);
}
exports.saveDtoToRepository = saveDtoToRepository;
function softDeleteFromRepository(payload, repository) {
    return repository.save(Object.assign(Object.assign({}, payload), { isDeleted: true, deletedAt: new Date().toISOString() }));
}
exports.softDeleteFromRepository = softDeleteFromRepository;
//# sourceMappingURL=repository.util.js.map