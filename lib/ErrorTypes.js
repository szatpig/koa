// Created by szatpig at 2018/9/17.
const errorTypes = {};

errorTypes.UNKNOW_ERROR = "unknowError";
errorTypes.USER_NOT_EXIST = "userNotExist";

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();

error_map.set(errorTypes.UNKNOW_ERROR, { code: -1, message: '未知错误' });
error_map.set(errorTypes.USER_NOT_EXIST, { code: 101, message: '用户不存在' });

//根据错误名称获取错误信息
errorTypes.getError = (type) => {

    let error_info;

    if (type) {
        error_info = error_map.get(type);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!error_info) {
        type = 'UNKNOW_ERROR';
        error_info = error_map.get(type);
    }

    return error_info;
}

module.exports = errorTypes;
