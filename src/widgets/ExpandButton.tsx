import {useEffect, ReactNode, HTMLAttributes, useState} from "react";
import {AnimationType} from "../types";
import {animate, getCssVar} from "../utils";
import "./ExpandButton.css";

type ExpandButtonProps = {
    // only needed with persistent outer
    isExpanded: boolean;

    expandCallback: (newState: boolean) => void;
    id: string;
    type: AnimationType;
    innerContent: ReactNode;
    isPersistent: boolean;

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
        if (props.isToggle && !props.isPersistent) {
            throw new Error("cant be both toggle and not persistent");
        }
        if (props.isPersistent) shrink();
    }, []);

    if (props.isPersistent) {
        useEffect(() => {
            props.isExpanded ? expand() : shrink();
        }, [props.isExpanded]);
    }

    const [outers, setOuters] = useState<JSX.Element[]>([]);

    const shrink = (id?: string) => {
        animate(id ?? getOuterId(), getInnerId(), props.type, false, {
            beforeFunc: (self, inner) => {
                self.classList.remove("sel-expand-button-outer");
                inner.classList.remove("sel-expand-button-inner");
            }
        });
    };

    const expand = (id?: string) => {
        animate(id ?? getOuterId(), getInnerId(), props.type, true, {
            beforeFunc: (self, inner) => {
                self.classList.add("sel-expand-button-outer");
                inner.classList.add("sel-expand-button-inner");
            }
        });
    };

    const getOuterId = () => `expand-button-outer-${props.id}`;
    const getInnerId = () => `expand-button-inner-${props.id}`;

    const makeOuter = (id?: string) => (
        <div
            className={`expand-button-outer ${props.outerClass ?? ""}`}
            id={`${getOuterId()}${id ?? ""}`}
            key={`${getOuterId()}${id ?? ""}`}
            {...props.outerAttributes}
        ></div>
    );

    const addDisposableOuter = () => {
        const newOuter = makeOuter(`${Math.floor(Math.random() * Date.now())}`);
        setOuters(prev => [...prev, newOuter]);
        return newOuter;
    };

    return (
        <>
            {/* needs outer div to not error :( */}
            <div>{props.isPersistent ? makeOuter() : outers}</div>
            <div
                id={getInnerId()}
                onClick={() => {
                    props.expandCallback(
                        props.isToggle ? !props.isExpanded : true
                    );
                    if (!props.isPersistent) {
                        const newOuter = addDisposableOuter();
                        // use setTimeout because of virtual DOM
                        setTimeout(() => {shrink(newOuter.props.id)}, 1);
                        setTimeout(() => {expand(newOuter.props.id)}, 2);
                        setTimeout(
                            () => {
                                const e = document.getElementById(newOuter.props.id)!;
                                e.parentNode!.removeChild(e);
                            },
                            getCssVar("--animation-time").asSeconds() * 1000 * 2
                        );
                    }
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
