import React from "react";
import classnames from "classnames";

import { combineAllBootstrapSizes } from "../../../utility/classNames-helpers";

export default function ImageView({ imgSrc, alt, imgSizeClass, className, title }) {
    const mainElementClass = classnames("text-center-sm", "img-view", className);
    const imgClass = classnames("rounded", combineAllBootstrapSizes(imgSizeClass));

    return (
        <div className={mainElementClass}>
            <img src={imgSrc} alt={alt} className={imgClass} title={title} />
        </div>
    );
}