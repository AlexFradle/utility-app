import {useEffect, useState} from "react";
import ExpandButton from "./ExpandButton";
import {AnimationType} from "../types";
import "./NavBar.css";

type NavBarProps = {
    selectedIndex: number;
    titles: string[];
    indCallback: (newInd: number) => void;
};

const NavBar = (props: NavBarProps) => {
    useEffect(() => {
        const moveSel = () => {
            moveIndicator(-1);
        };
        moveSel();
        window.addEventListener('resize', moveSel);
        return () => window.removeEventListener('resize', moveSel);
    }, []);

    const moveIndicator = (ind: number) => {
        const indicator = document.getElementById("hover-indicator")!;
        const items = document.getElementsByClassName("nav-item");

        ind = ind === -1 ? props.selectedIndex : ind;

        const dims = items[ind].getBoundingClientRect();
        indicator.style.left = `${dims.x + (!!ind ? 0 : 2)}px`;
        indicator.style.width = `${dims.width - (!!ind ? 2 : 4)}px`;
        indicator.style.top = `${dims.y + dims.height}px`;
    };

    return (
        <>
            <div className="nav-container" onMouseLeave={() => {moveIndicator(-1)}}>
                {props.titles.map((title, ind) => {
                    return (
                        <ExpandButton 
                            innerContent={title}
                            containerClass="nav-item"
                            containerAttributes={{ onMouseOver: () => {moveIndicator(ind)} }}
                            id={`nav-${ind}`}
                            key={`nav-${ind}`}
                            type={AnimationType.CenterWidth}
                            isExpanded={ind === props.selectedIndex}
                            expandCallback={_ => {props.indCallback(ind)}}
                            isToggle={false}
                            bgFade={true}
                        />
                    );
                })}
            </div>
            <div id="hover-indicator"></div>
        </>
    );
};
export default NavBar;
