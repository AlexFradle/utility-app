import {useEffect, useState} from "react";
import "./ClickableButton.css";
import {animate, getCssVar} from "../utils";
import {AnimationType} from "../types";
import ExpandButton from "./ExpandButton";

type ClickableButtonProps = {
    id: string;
    innerContent: string;
    onClick: () => void;
    backgroundColor?: string;
    type?: AnimationType;
};

const ClickableButton = (props: ClickableButtonProps) => {
    return (
        <ExpandButton
            id={props.id}
            type={props.type ?? AnimationType.CenterWidth}
            isToggle={false}
            bgFade={false}
            isPersistent={false}
            isExpanded={false}
            expandCallback={_ => {props.onClick()}}
            outerClass="clickable-button"
            innerContent={(
                <div
                    style={{
                        backgroundColor: props.backgroundColor ?? "none",
                        border: "2px solid transparent",
                        clipPath: "padding-box",
                        color: "var(--main-col)",
                        margin: 5,
                    }}
                >
                    {props.innerContent}
                </div>
            )}
        />
    );
};

export default ClickableButton;
