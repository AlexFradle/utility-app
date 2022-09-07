import {useEffect, useState} from "react";
import "./NavBar.css";

type NavBarProps = {
    selectedIndex: number;
    titles: string[];
    indCallback: (newInd: number) => void;
};

const NavBar = (props: NavBarProps) => {
    useEffect(() => {
        resetIndicators();
        const moveSel = () => {
            moveIndicator(true, -1);
        };
        moveSel();
        window.addEventListener('resize', moveSel);
        return () => window.removeEventListener('resize', moveSel);
    }, []);

    const resetIndicators = () => {
        const indicators = document.getElementsByClassName("sel-indicator");
        const items = document.getElementsByClassName("nav-item");
        for (let i = 0; i < indicators.length; i++) {
            const dims = items[i].getBoundingClientRect();
            items[i].classList.remove("sel-nav-item");
            indicators[i].style.top = `${dims.y + dims.height / 2}px`;
            indicators[i].style.left = `${dims.x + dims.width / 2}px`;
            indicators[i].style.width = `0px`;
            indicators[i].style.height = `0px`;
        }
    };

    const moveIndicator = (isClick: boolean, ind: number) => {
        const indicator = document.getElementById("hover-indicator")!;
        const items = document.getElementsByClassName("nav-item");
        const indicators = document.getElementsByClassName("sel-indicator");

        ind = ind === -1 ? props.selectedIndex : ind;
        if (isClick) {
            props.indCallback(ind);
            for (let i = 0; i < items.length; i++) {
                if (i === ind) {
                    indicators[i].classList.add("selected");
                    items[i].classList.add("text-black");
                } else {
                    indicators[i].classList.remove("selected");
                    items[i].classList.remove("text-black");
                }
            }
        }

        const dims = items[ind].getBoundingClientRect();
        indicator.style.left = `${dims.x}px`;
        indicator.style.width = `${dims.width}px`;
        indicator.style.top = `${dims.y + dims.height}px`;

        if (isClick) {
            resetIndicators();
            items[ind].classList.add("sel-nav-item");
            indicators[ind].style.top = `${dims.y}px`;
            indicators[ind].style.left = `${dims.x}px`;
            indicators[ind].style.width = `${dims.width}px`;
            indicators[ind].style.height = `${dims.height}px`;
        }
    };

    return (
        <>
            <div className="nav-container" onMouseLeave={() => {moveIndicator(false, -1)}}>
                {props.titles.map((title, ind) => {
                    return (
                        <>
                            <div 
                                className="nav-item"
                                onClick={() => {moveIndicator(true, ind)}}
                                onMouseOver={() => {moveIndicator(false, ind)}}
                            >
                                {title}
                            </div>
                            <div className="sel-indicator"></div>
                        </>
                    );
                })}
            </div>
            <div id="hover-indicator"></div>
        </>
    );
};
export default NavBar;
