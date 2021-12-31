import $ from "jquery";

export function filePreview(elem, file, bg = false, attr = false) {
    const reader = new FileReader();
    reader.onload = function (e) {
        if (attr) {
            $(elem).attr("src", e.target.result);
            return;
        }
        if (bg) {
            $(elem).css('background-image', `url(${e.target.result})`)
            return;
        }
        $(elem).attr("src", e.target.result);
        // console.log(e);
    }
    reader.readAsDataURL(file);
}