import { AddTodo } from "./AddTodo";
import { Todo } from "./Todo";
import { useState } from "react";

const initialTodoList = [
  { todo: "walk dog", urgency: true, completed: true },
  { todo: "buy groceries", urgency: false, completed: false },
  { todo: "take out bins", urgency: true, completed: true },
  { todo: "pat a cat", urgency: true, completed: false },
  { todo: "vacuum", urgency: false, completed: false },
];

export function TodoList() {
  const [todoList, setTodoList] = useState(
    initialTodoList.map((todo, index) => {
      return { ...todo, id: index };
    })
  );
  function setTodoListWithIncrementingIds(todos) {
    const newTodoListWithIds = todos.map((todo, index) => {
      return { ...todo, id: index };
    });
    setTodoList(newTodoListWithIds);
  }
  const [todoInput, setTodoInput] = useState("");
  const [urgentChecked, setUrgentChecked] = useState(false);
  const [showUrgentChecked, setShowUrgentChecked] = useState(false);
  const [sortUrgencyDescending, setSortUrgencyDescending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const todosToDisplay = getTodosToDisplay(
    todoList,
    showUrgentChecked,
    sortUrgencyDescending,
    searchInput
  );
  return (
    <div>
      <div className="m-2 flex flex-col">
        <input
          type="text"
          className="w-3/5 p-2 mx-2 b-1 border-gray-400 border-2 rounded-xl"
          placeholder="🔍Search for tasks"
          value={searchInput}
          onChange={(e) => {
            const newInput = e.target.value;
            setSearchInput(newInput);
          }}
        />
      </div>
      <div className="flex flex-row m-2 px-3 w-3/5">
        <div className="mr-7">
          <input
            className="show-urgent-check m-1"
            type="checkbox"
            value={showUrgentChecked}
            checked={showUrgentChecked}
            onChange={() => {
              setShowUrgentChecked(!showUrgentChecked);
            }}
          />
          <label htmlFor="show-urgent-check">Show urgent only</label>
        </div>
        <div className="mr-7">
          <input
            className="sort-urgency-check m-1"
            type="checkbox"
            value={sortUrgencyDescending}
            checked={sortUrgencyDescending}
            onChange={() => {
              setSortUrgencyDescending(!sortUrgencyDescending);
            }}
          />
          <label htmlFor="sort-urgency-check">Sort urgent first</label>
        </div>
      </div>
      <div className="bg-slate-50 m-3 p-2 rounded-xl shadow-md">
        <h1 className="text-xl  m-3">Task List</h1>
        <div className="m-2">
          <input
            className="w-1/2 p-2 mx-2 b-1 border-gray-400 border-2 rounded-xl"
            value={todoInput}
            type="text"
            placeholder="eg. find car keys"
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
          />
          <label htmlFor="urgent-check" className="m-1">
            Urgent?
          </label>
          <input
            className="urgent-check"
            type="checkbox"
            value={urgentChecked}
            checked={urgentChecked}
            onChange={() => {
              setUrgentChecked(!urgentChecked);
            }}
          />
          <AddTodo
            todoList={todoList}
            todoInput={todoInput}
            urgentChecked={urgentChecked}
            onClick={(newTodoList) => {
              setTodoListWithIncrementingIds(newTodoList);
              setUrgentChecked(false);
              setTodoInput("");
            }}
          />
        </div>
        <div className="m-2">
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
            onClick={() => {
              setTodoListWithIncrementingIds(
                todoList.filter((todo) => {
                  return !todosToDisplay.some((todoToDisplay) => {
                    return todoToDisplay.id === todo.id;
                  });
                })
              );
            }}
          >
            Clear all todos
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
            onClick={() => {
              if (todosToDisplay.length === 0) {
                console.log("no more items");
                return;
              }
              setTodoListWithIncrementingIds(
                todoList.filter((todo) => {
                  return todosToDisplay[0].id !== todo.id;
                })
              );
            }}
          >
            Remove first todo
          </button>
        </div>
        <ul>
          {todosToDisplay.map((todo) => {
            return (
              <Todo
                item={todo}
                key={todo.id}
                checked={todo.completed}
                onChange={(newCheckedStatus) => {
                  const newTodoList = [...todoList];
                  newTodoList.splice(todo.id, 1, {
                    ...todo,
                    completed: newCheckedStatus,
                  });
                  setTodoListWithIncrementingIds(newTodoList);
                }}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );

  function getTodosToDisplay(todoList, showUrgentChecked, sort, searchInput) {
    const todoListFilteredByUrgency = showUrgentChecked
      ? todoList.filter((todo) => {
          return todo.urgency;
        })
      : todoList;

    const todosFilteredBySearchInput = todoListFilteredByUrgency.filter(
      (todo) => {
        if (todo.todo === undefined) {
          return;
        }
        return todo.todo.toLowerCase().includes(searchInput);
      }
    );

    const todoListByDescendingUrgency = sort
      ? todosFilteredBySearchInput.toSorted((a, b) => {
          return b.urgency - a.urgency;
        })
      : todosFilteredBySearchInput;

    return todoListByDescendingUrgency;
  }
}
