import OverlayScrollbars from "overlayscrollbars/js/OverlayScrollbars";

const scrollbarInit = () => {
    Array.prototype.forEach.call(
        document.querySelectorAll(".scrollbar-overlay"),
        (el) => new OverlayScrollbars(el, {
            scrollbars: {
                autoHide: "leave",
                autoHideDelay: 200
            },
        })
    );
};
export default scrollbarInit;
