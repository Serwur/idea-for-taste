import React, { useEffect } from "react";
import $ from "jquery";
import { getImgId, getTitleId } from "../../../utility/singleViewIds";

export default function TitleView({ viewId, title }) {
    const titleId = getTitleId(viewId);
    const imgId = getImgId(viewId);

    useEffect(() => {
        $(window).on("load resize",
            {
                title: $(`#${titleId}`),
                img: $(`#${imgId}`)
            },
            (event) => {
                const { title, img } = event.data;
                title.width(img.width());
                console.log(`Setting width: ${img.width()}`);
            });
    });

    return (
        <div className="row">
            <div className="col mt-2 mb-0 ml-sm-1 mr-sm-1 ml-0 mr-0 pl-0 pr-0 pl-sm-0 pr-sm-0">
                <div id={titleId} className="mx-auto">
                    <h3 id={titleId} className="title text-justify">{title}</h3>
                </div>
            </div>
        </div>
    );
}