import {useState} from "react";
import TodoItem from "../widgets/TodoItem";
import ExpandButton from "../widgets/ExpandButton";
import {AnimationType} from "../types";

const TodoScreen = () => {
    const [todoItems, setTodoItems] = useState<[string, boolean][]>([
        ["do this at some point", false],
        ["do this at some point", true],
    ]);
    return (
        <div className="todo-container">
            {todoItems.map(([t, c], ind) => {
                return (
                    <TodoItem
                        text={t}
                        isChecked={c}
                        checkCallback={(newState) => {setTodoItems(prev => {
                            return [
                                ...prev.slice(0, ind),
                                [prev[ind][0], newState],
                                ...prev.slice(ind + 1)
                            ];
                        })}}
                    />
                );
            })}
            <ExpandButton 
                isExpanded={todoItems[0][1]}
                expandCallback={ns => {setTodoItems(prev => [[prev[0][0], ns], ...prev.slice(1)])}}
                id={0}
                type={AnimationType.CenterLeftRight}
            />
        </div>
    );
};

export default TodoScreen;
