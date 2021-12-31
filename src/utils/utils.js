import scrollbarInit from "./scrollbar";
import detectorInit from "./detector";
import {tooltipInit} from "./tooltip";
import {DateTime} from "luxon";

export const onInitLoad = () => {

    /*
    SCROLLBAR
     */
    scrollbarInit()

    detectorInit();

    tooltipInit()
};

export const addClass = (el, className) => {
    el.classList.add(className);
};

export const getReadableSizeFromBytes = (bytes) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let l = 0
    let n = parseInt(bytes, 10) || 0
    while (n >= 1024 && ++l) n /= 1024
    // include a decimal point and a tenths-place digit if presenting
    // less than ten of KB or greater units
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

export const getExtensionFromFileName = (filename) => {
    return filename.split('.').pop();
}

export const getDateTimeFromSql = (sql) => {
    return DateTime.fromSQL(sql).setZone("Africa/Kampala");
}
