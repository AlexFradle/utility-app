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
            isPersistent={false}
            isExpanded={false}
            expandCallback={_ => {props.onClick()}}
            outerClass="clickable-button"
            outerAttributes={{ style: {backgroundColor: "var(--main-col)"} }}
            innerContent={(
                <div
                    style={{
                        backgroundColor: props.backgroundColor ?? "none",
                        border: "2px solid transparent",
                        clipPath: "inset(2px 2px 2px 2px)",
                        color: "var(--main-col)",
                    }}
                >
                    {props.innerContent}
                </div>
            )}
        />
    );
};

export default ClickableButton;
