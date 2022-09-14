import {ReactNode, useEffect} from "react";
import "./Strikethrough.css";

type StrikethroughProps = {
    isStrike: boolean;
    innerContent: ReactNode;
    id: string;
};

const Strikethrough = (props: StrikethroughProps) => {
    useEffect(() => {
        props.isStrike ? strike() : unstrike();
    }, [props.isStrike]);

    const strike = () => {
        const self = document.getElementById(getOuterId())!;
        const inner = document.getElementById(getInnerId())!;
        const dims = inner.getBoundingClientRect();
        dims.x += window.scrollX;
        dims.y += window.scrollY;
        self.style.left = `${dims.x}px`;
        self.style.top = `${dims.y + 1 + dims.height / 2}px`;
        self.style.width = `${dims.width}px`;
        self.style.height = "1px";
    };

    const unstrike = () => {
        const self = document.getElementById(getOuterId())!;
        const inner = document.getElementById(getInnerId())!;
        const dims = inner.getBoundingClientRect();
        dims.x += window.scrollX;
        dims.y += window.scrollY;
        self.style.left = `${dims.x}px`;
        self.style.top = `${dims.y + 1 + dims.height / 2}px`;
        self.style.width = "0px";
        self.style.height = "1px";
    };

    const getOuterId = () => `strikethrough-outer-${props.id}`;
    const getInnerId = () => `strikethrough-inner-${props.id}`;

    return (
        <>
            <div 
                className="strikethrough"
                id={getOuterId()}
            >
            </div>
            <div id={getInnerId()}>{props.innerContent}</div>
        </>
    );
};

export default Strikethrough;
