import {useEffect} from "react";
import {AnimationType} from "../types";
import ExpandButton from "./ExpandButton";
import Strikethrough from "./Strikethrough";
import "./TodoItem.css";

type TodoItemProps = {
    isChecked: boolean;
    text: string;
    checkCallback: (newCheck: boolean) => void;
    id: string;
};

const TodoItem = (props: TodoItemProps) => {
    useEffect(() => {
        const self = document.getElementById(props.id)!;
        self.style.opacity = "1";
    }, []);
    
    return (
        <div className="todo-item" id={props.id}>
            <ExpandButton
                isExpanded={props.isChecked}
                expandCallback={_ => {props.checkCallback(!props.isChecked)}}
                id={props.id}
                type={AnimationType.CenterExpand}
                innerContent=""
                isToggle={true}
                bgFade={true}
                containerClass="todo-checkbox"
            />
            <Strikethrough
                innerContent={props.text}
                isStrike={props.isChecked}
                id={props.id}
            />
        </div>
    );
};

export default TodoItem;
