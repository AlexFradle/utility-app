import {useEffect, ReactNode, HTMLAttributes} from "react";
import {AnimationType} from "../types";
import {animate} from "../utils";
import "./ExpandButton.css";

type ExpandButtonProps = {
    isExpanded: boolean;
    expandCallback: (newState: boolean) => void;
    id: string;
    type: AnimationType;
    innerContent: ReactNode;
    isPersistent: boolean;
    bgFade: boolean;

    // true:  pressing will toggle on and off
    // false: press will only expand (NavBar)
    isToggle: boolean;

    innerClass?: string;
    innerAttributes?: HTMLAttributes<HTMLDivElement>;
    outerClass?: string;
    outerAttributes?: HTMLAttributes<HTMLDivElement>;
};

const ExpandButton = (props: ExpandButtonProps) => {
    useEffect(() => {
        shrink();
    }, []);

    useEffect(() => {
        props.isExpanded ? expand() : shrink();
    }, [props.isExpanded]);

    const shrink = () => {
        animate(getOuterId(), getInnerId(), props.type, false, {
            beforeFunc: (self, inner) => {
                self.classList.remove("sel-expand-button-outer");
                inner.classList.remove("sel-expand-button-inner");
            }
        });
    };

    const expand = () => {
        animate(getOuterId(), getInnerId(), props.type, true, {
            beforeFunc: (self, inner) => {
                self.classList.add("sel-expand-button-outer");
                inner.classList.add("sel-expand-button-inner");
            }
        });
    };

    const getOuterId = () => `expand-button-outer-${props.id}`;
    const getInnerId = () => `expand-button-inner-${props.id}`;

    const makePersistentOuter = () => (
        <div
            className={`expand-button-outer ${props.outerClass ?? ""}`}
            style={!props.bgFade ? { backgroundColor: "var(--main-col)" } : undefined}
            id={getOuterId()}
            {...props.outerAttributes}
        ></div>
    );

    return (
        <>
            {makePersistentOuter()}
            <div
                id={getInnerId()}
                onClick={() => {
                    props.expandCallback(
                        props.isToggle ? !props.isExpanded : true
                    );
                }}
                className={`expand-button-inner ${props.innerClass ?? ""}`}
                {...props.innerAttributes}
            >
                {props.innerContent}
            </div>
        </>
    );
};

export default ExpandButton;
