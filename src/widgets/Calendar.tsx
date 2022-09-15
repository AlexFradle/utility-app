import {useEffect} from "react";
import "./Calendar.css";

const Calendar = () => {
    const makeCal = () => {
        const dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const date = new Date();
        const year = date.getFullYear();
        const monthInd = date.getMonth();
        const days = new Date(year, monthInd + 1, 0).getDate();
        const startDay = new Date(year, monthInd, 1).getDay();
        const endDay = new Date(year, monthInd, days).getDay();
        const curDay = date.getDate();
        return {
            cur: curDay,
            pad: startDay - 1,
            arr: [
                ...dayArr,
                ...Array(startDay - 1).fill("-"),
                ...Array.from({length: days}, (_, i) => {
                    i += 1;
                    return `${i===curDay?"[":""}${i}${i===curDay?"]":""}`;
                }),
                ...Array(7 - endDay).fill("-"),
            ]
        };
    };

    const cal = makeCal();

    return (
        <div className="cal-container">
            <div className="cal-title">September</div>
            <div className="cal-area">
                {cal.arr.map((v, ind) => {
                    return (
                        <div
                            className={`${ind < 7 ? "cal-day" : "cal-cell"} ${ind === cal.cur ? "" : ""}`}
                            style={
                                ind === cal.cur + cal.pad + 6
                                    ? {
                                        color: "var(--background-col)",
                                        backgroundColor: "var(--main-col)"
                                    }
                                    : undefined
                            }
                        >
                            {v}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
