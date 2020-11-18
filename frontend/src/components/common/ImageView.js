import React, { useEffect } from "react";
import classnames from "classnames";
import $ from "jquery";

import { combineAllBootstrapSizes } from "../../utility/classNames-helpers";

export default function ImageView({ imgSrc, alt, imgSizeClass, className }) {
    const mainElementClass = classnames("col", "text-center", "img-view", className);
    const imgClass = classnames("rounded mr-2", combineAllBootstrapSizes(imgSizeClass));

    return (
        <div className={mainElementClass}>
            <img src={imgSrc} alt={alt} className={imgClass} />
        </div>
    );
}