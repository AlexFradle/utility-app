import "./NavBar.css";

const NavBar = () => {
    const moveIndicator = (isClick: boolean, ind: number) => {
        const prefix = isClick ? "sel" : "hover";
        const indicator = document.getElementById(`${prefix}-indicator`)!;
        const item = document.getElementsByClassName("nav-item")[ind];
        const dims = item.getBoundingClientRect();
        indicator.style.left = `${dims.x}px`;
        indicator.style.width = `${dims.width}px`;
        indicator.style.top = `${dims.y + dims.height}px`;
        console.log(dims);
    };
    const items = [
        "Dashboard", "TODO List", "Settings",
    ];
    return (
        <>
            <div className="nav-container">
                {items.map((title, ind) => {
                    return (
                        <div 
                            className="nav-item"
                            onClick={() => {moveIndicator(true, ind)}}
                            onMouseOver={() => {moveIndicator(false, ind)}}
                        >
                            {title}
                        </div>
                    );
                })}
            </div>
            <div id="hover-indicator"></div>
            <div id="sel-indicator"></div>
        </>
    );
};
export default NavBar;
