import {AnimationType} from "./types";

export const getCssVar = (name: string) => {
    return {
        value: getComputedStyle(document.documentElement).getPropertyValue(name),
        asSeconds: function(backup = 0.2) {
            try {
                const res = +this.value.slice(0, -1);
                return res;
            } catch(e) {
                return backup;
            }
        },
    };
}

export const animate = (
    animObjId: string, 
    innerObjId: string, 
    type: AnimationType,
    isExpand: boolean,
    optionals?: {
        beforeFunc?: (animObj: HTMLElement, innerObj: HTMLElement) => void;
        afterFunc?: (animObj: HTMLElement, innerObj: HTMLElement) => void;
        offsetX?: number;
        offsetY?: number;
    },
) => {
    const beforeFunc = optionals?.beforeFunc;
    const afterFunc = optionals?.afterFunc;
    const offsetX = optionals?.offsetX || 0;
    const offsetY = optionals?.offsetY || 0;

    const self = document.getElementById(animObjId);
    const inner = document.getElementById(innerObjId);
    if (self === null || inner === null) return;
    const dims = inner.getBoundingClientRect();
    if (beforeFunc !== undefined) beforeFunc(self, inner);
    if (isExpand) {
        switch (type) {
            case AnimationType.CenterWidthHeight:
            case AnimationType.LeftRightDown:
                inner.style.opacity = "1";
            case AnimationType.CenterExpand:
            case AnimationType.CenterWidth:
            case AnimationType.LeftRight:
            case AnimationType.RightLeft:
            case AnimationType.TopBottom:
            case AnimationType.BottomTop:
                self.style.top = `${dims.y + offsetY}px`;
                self.style.left = `${dims.x + offsetX}px`;
                self.style.width = `${dims.width}px`;
                self.style.height = `${dims.height}px`;
                break;
        }
    } else {
        switch (type) {
            case AnimationType.CenterExpand:
                self.style.top = `${dims.y + dims.height / 2}px`;
                self.style.left = `${dims.x + dims.width / 2}px`;
                self.style.width = "0px";
                self.style.height = "0px";
                break;
            case AnimationType.CenterWidth:
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
            case AnimationType.LeftRightDown:
                self.style.transition = "all var(--animation-time), height var(--animation-time) var(--animation-time)";
                self.style.top = `${dims.y}px`;
                self.style.left = `${dims.x}px`;
                self.style.width = "0px";
                self.style.height = "0px";
                break;
            case AnimationType.CenterWidthHeight:
                self.style.transition = "all var(--animation-time), height var(--animation-time) var(--animation-time), top var(--animation-time) var(--animation-time)";
                self.style.top = `${dims.y + dims.height / 2}px`;
                self.style.left = `${dims.x + dims.width / 2}px`;
                self.style.width = "0px";
                self.style.height = "0px";
                break;
        }
    }
    if (afterFunc !== undefined) afterFunc(self, inner);
};
