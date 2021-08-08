import scrollbarInit from "./scrollbar";
import detectorInit from "./detector";
import {tooltipInit} from "./tooltip";

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

export const getSizeUnits = (value = 0) => {
    if (value === 0 || isNaN(parseInt(value))) {
        return `0 B`;
    } else if (value <= 1024) {
        return `${Math.round(value / 1024)} KB`;
    } else if (value <= (1024 * 1024)) {
        return `${Math.round(value / (1024 * 1024))} MB`;
    } else if (value <= (1024 * 1024 * 1024)) {
        return `${Math.round(value / (1024 * 1024 * 1024))} GB`;
    } else if (value <= (1024 * 1024 * 1024 * 1024)) {
        return `${Math.round(value / (1024 * 1024 * 1024 * 1024))} TB`;
    } else if (value <= (1024 * 1024 * 1024 * 1024 * 1024)) {
        return `${Math.round(value / (1024 * 1024 * 1024 * 1024 * 1024))} PB`;
    } else {
        return "N/A";
    }
}

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