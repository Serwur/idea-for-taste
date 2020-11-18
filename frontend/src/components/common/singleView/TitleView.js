import React, { useEffect } from "react";
import $ from "jquery";
import { getImgId, getTitleId } from "../../../utility/singleViewIds";

export default function TitleView({ title }) {
    return (
        <div className="row">
            <div className="col pl-1 pt-3 pr-2">
                <div className="mx-auto">
                    <h3 className="title">{title}</h3>
                </div>
            </div>
        </div>
    );
}