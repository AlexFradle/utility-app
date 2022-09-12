import {useEffect, useState} from "react";
import "./ClickableButton.css";
import {animate, getCssVar} from "../utils";
import {AnimationType} from "../types";
import ExpandButton from "./ExpandButton";

type ClickableButtonProps = {
    id: string;
    innerContent: string;
};

const ClickableButton = (props: ClickableButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <ExpandButton
            id={props.id}
            type={AnimationType.CenterWidth}
            isToggle={false}
            bgFade={false}
            isPersistent={false}
            isExpanded={isPressed}
            expandCallback={ns => {
                const cur = isPressed;
                if (ns !== cur) {
                    setTimeout(
                        () => {setIsPressed(false)},
                        getCssVar("--animation-time").asSeconds() * 1000 * 2
                    );
                }
                setIsPressed(true);
            }}
            innerContent={(
                <div
                    style={{ backgroundColor: "black", border: "2px solid transparent", clipPath: "padding-box", color: "var(--main-col)" }}
                >
                    {props.innerContent}
                </div>
            )}
            outerClass="clickable-button"
        />
    );
};

export default ClickableButton;
