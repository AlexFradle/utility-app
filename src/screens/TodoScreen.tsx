import {useEffect, useState} from "react";
import {AnimationType} from "../types";
import ContentBox from "../widgets/ContentBox";
import TodoItem from "../widgets/TodoItem";
import ClickableButton from "../widgets/ClickableButton";
import ExpandButton from "../widgets/ExpandButton";
import Calendar from "../widgets/Calendar";
import "./TodoScreen.css";

const TodoScreen = () => {
    const [todoItems, setTodoItems] = useState<[string, boolean][]>([
        ["do this at some point", false],
        ["do this at some point", true],
    ]);

    const addTodo = () => {
        setTodoItems(prev => [...prev, ["new todo", false]]);
    };

    return (
        <div className="todo-container">
            <ContentBox
                id="todo"
                type={AnimationType.CenterWidthHeight}
            >
                {todoItems.map(([t, c], ind) => {
                    return (
                        <TodoItem
                            text={t}
                            id={`todo-${ind}`}
                            key={`todo-${ind}`}
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
                <ClickableButton
                    id="add-todo"
                    innerContent="Add TODO"
                    backgroundColor="black"
                    onClick={() => {addTodo()}}
                />
            </ContentBox>
            <ContentBox
                id="cal-box"
                type={AnimationType.CenterWidthHeight}
            >
                <Calendar />
            </ContentBox>
            <ClickableButton
                id="test"
                innerContent="test"
                backgroundColor="black"
                onClick={() => {}}
            />
            <input type="range" />
        </div>
    );
};

export default TodoScreen;
