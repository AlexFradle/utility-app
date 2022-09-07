import "./TodoItem.css";

type TodoItemProps = {
    isChecked: boolean;
    text: string;
    checkCallback: (newCheck: boolean) => void;
};

const TodoItem = (props: TodoItemProps) => {
    return (
        <div className="todo-item-container">
            <div 
                className={`todo-checkbox ${props.isChecked ? "box-checked" : ""}`}
                onClick={() => {props.checkCallback(!props.isChecked)}}
            ></div>
            <div className={`todo-text ${props.isChecked ? "text-checked" : ""}`}>{props.text}</div>
        </div>
    );
};

export default TodoItem;
