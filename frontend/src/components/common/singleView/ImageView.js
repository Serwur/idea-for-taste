import React from "react";
import classnames from "classnames";

import { combineAllBootstrapSizes } from "../../../utility/classNames-helpers";
import { getImgId } from "../../../utility/singleViewIds";

export default function ImageView({ viewId, imgSrc, alt, imgSizeClass, className, title }) {
    const mainElementClass = classnames("col", "text-center", "img-view", className);
    const imgClass = classnames("rounded", combineAllBootstrapSizes(imgSizeClass));
    const imgId = getImgId(viewId);

    return (
        <div className="row mb-2 mt-2">
            <div className={mainElementClass}>
                <img id={imgId} src={imgSrc} alt={alt} className={imgClass} title={title} />
            </div>
        </div>
    );
}