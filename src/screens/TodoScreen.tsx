import {useState} from "react";
import TodoItem from "../widgets/TodoItem";
import ExpandButton from "../widgets/ExpandButton";
import {AnimationType} from "../types";
import Strikethrough from "../widgets/Strikethrough";

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
                id={1020023}
                type={AnimationType.CenterExpand}
                buttonContent="Name"
                isToggle={true}
                bgFade={false}
            />
            <Strikethrough
                isStrike={todoItems[0][1]}
                innerContent={"text here to strike"}
                id={0}
            />
        </div>
    );
};

export default TodoScreen;
