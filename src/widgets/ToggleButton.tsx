import {ReactNode, useState} from "react";
import {AnimationType} from "../types";
import ExpandButton from "./ExpandButton";

type ToggleButtonProps = {
    id: string;
    innerContent: ReactNode;
    onClick: (ns: boolean) => void;
    isToggled: boolean;
    type?: AnimationType;
};

const ToggleButton = (props: ToggleButtonProps) => {
    return (
        <ExpandButton
            id={`toggle-${props.id}`}
            isExpanded={props.isToggled}
            type={props.type ?? AnimationType.CenterWidth}
            isToggle={true}
            isPersistent={true}
            innerContent={props.innerContent}
            expandCallback={ns => {props.onClick(ns)}}
        />
    );
};

export default ToggleButton;
