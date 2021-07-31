import {Tooltip} from "bootstrap";

export const tooltipInit = () => {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        })
    );
};