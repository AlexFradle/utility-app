import {useEffect} from "react";
import {AnimationType} from "../types";
import "./ExpandButton.css";

type ExpandButtonProps = {
    isExpanded: boolean;
    expandCallback: (newState: boolean) => void;
    id: number;
    type: AnimationType;
};

const ExpandButton = (props: ExpandButtonProps) => {
    useEffect(() => {
        shrink();
    }, []);

    const shrink = () => {
        const self = document.getElementById(getOuterId())!;
        const inner = document.getElementById(getInnerId())!;
        const dims = inner.getBoundingClientRect();
        self.classList.remove("sel-expand-button-outer");
        inner.classList.remove("sel-expand-button-inner");
        switch (props.type) {
            case AnimationType.CenterExpand:
                self.style.top = `${dims.y + dims.height / 2}px`;
                self.style.left = `${dims.x + dims.width / 2}px`;
                self.style.width = "0px";
                self.style.height = "0px";
                break;
            case AnimationType.CenterLeftRight:
                self.style.top = `${dims.y}px`;
                self.style.left = `${dims.x + dims.width / 2}px`;
                self.style.width = "0px";
                self.style.height = `${dims.height}px`;
                break;
            case AnimationType.LeftRight:
                self.style.top = `${dims.y}px`;
                self.style.left = `${dims.x}px`;
                self.style.width = "0px";
                self.style.height = `${dims.height}px`;
                break;
            case AnimationType.RightLeft:
                self.style.top = `${dims.y}px`;
                self.style.left = `${dims.x + dims.width}px`;
                self.style.width = "0px";
                self.style.height = `${dims.height}px`;
                break;
            case AnimationType.TopBottom:
                self.style.top = `${dims.y}px`;
                self.style.left = `${dims.x}px`;
                self.style.width = `${dims.width}px`;
                self.style.height = "0px";
                break;
            case AnimationType.BottomTop:
                self.style.top = `${dims.y + dims.height}px`;
                self.style.left = `${dims.x}px`;
                self.style.width = `${dims.width}px`;
                self.style.height = "0px";
                break;
        }
    };

    const expand = () => {
        const self = document.getElementById(getOuterId())!;
        const inner = document.getElementById(getInnerId())!;
        const dims = inner.getBoundingClientRect();
        self.classList.add("sel-expand-button-outer");
        inner.classList.add("sel-expand-button-inner");
        switch (props.type) {
            case AnimationType.CenterExpand:
            case AnimationType.CenterLeftRight:
            case AnimationType.LeftRight:
            case AnimationType.RightLeft:
            case AnimationType.TopBottom:
            case AnimationType.BottomTop:
                self.style.top = `${dims.y}px`;
                self.style.left = `${dims.x}px`;
                self.style.width = `${dims.width}px`;
                self.style.height = `${dims.height}px`;
                break;
        }
    };

    const getOuterId = () => `expand-button-outer-${props.id}`;
    const getInnerId = () => `expand-button-inner-${props.id}`;

    return (
        <>
            <div
                className="expand-button-outer" 
                id={getOuterId()}
            ></div>
            <div
                id={getInnerId()}
                onClick={() => {
                    const ns = !props.isExpanded;
                    props.expandCallback(ns);
                    ns ? expand() : shrink();
                }}
                className="expand-button-inner"
            >
                Text
            </div>
        </>
    );
};

export default ExpandButton;
