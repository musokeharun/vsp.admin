import scrollbarInit from "./scrollbar";
import detectorInit from "./detector";

export const onInitLoad = () => {

    /*
    SCROLLBAR
     */
    scrollbarInit()

    detectorInit();

};

export const addClass = (el, className) => {
    el.classList.add(className);
};