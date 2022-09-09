import {useEffect, ReactNode, useLayoutEffect} from "react";
import {AnimationType} from "../types";
import {animate, expandAnimation, shrinkAnimation} from "../utils";
import "./ContentBox.css";

type ContentBoxProps = {
    children: ReactNode;
    type: AnimationType;
    id: string;
};

const ContentBox = (props: ContentBoxProps) => {
    useEffect(() => {
        shrink();
        setTimeout(() => {
            expand();
        }, 200);
    }, []);

    useEffect(() => {
        expand();
    }, [props.children]);

    const shrink = () => {
        animate(getOuterId(), getInnerId(), props.type, false);
    };

    const expand = () => {
        animate(getOuterId(), getInnerId(), props.type, true);
    };

    const getOuterId = () => `content-box-outer-${props.id}`;
    const getInnerId = () => `content-box-inner-${props.id}`;
    return (
        <>
            <div className="content-box" id={getOuterId()}></div>
            <div className="content" id={getInnerId()} >{props.children}</div>
        </>
    );
};

export default ContentBox;
