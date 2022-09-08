import {ReactNode, useEffect} from "react";

type StrikethroughProps = {
    isStrike: boolean;
    innerContent: ReactNode;
    id: number;
};

const Strikethrough = (props: StrikethroughProps) => {
    useEffect(() => {
        props.isStrike ? strike() : unstrike();
    }, [props.isStrike]);

    const strike = () => {
        const self = document.getElementById(getOuterId())!;
        const inner = document.getElementById(getInnerId())!;
        const dims = inner.getBoundingClientRect();
        self.style.left = `${dims.x}px`;
        self.style.top = `${dims.y + dims.height / 2}px`;
        self.style.width = `${dims.width}px`;
        self.style.height = "2px";
    };

    const unstrike = () => {
        const self = document.getElementById(getOuterId())!;
        const inner = document.getElementById(getInnerId())!;
        const dims = inner.getBoundingClientRect();
        self.style.left = `${dims.x}px`;
        self.style.top = `${dims.y + dims.height / 2}px`;
        self.style.width = "0px";
        self.style.height = "0px";
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
