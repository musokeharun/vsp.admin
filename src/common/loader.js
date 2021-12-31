import React from 'react';
import $ from "jquery";

const Loader = () => {
    return (
        <div
            id={"loader-div"}
            style={{
                zIndex: 50000
            }}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen  overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"/>
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
    );
};


export const startLoad = () => {
    $("#loader-div").fadeIn();
}

export const stopLoad = () => {
    let $loader = $("#loader-div");
    console.log($loader);
    $loader.slideUp("slow");
}


export default Loader;
