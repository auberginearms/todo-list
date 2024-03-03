import { Todo } from "./Todo";
import { useState } from "react";

export function TodoList() {
  const [todoList, setTodoList] = useState([
    { todo: "walk dog", urgency: true, completed: true },
    { todo: "buy groceries", urgency: false, completed: false },
    { todo: "take out bins", urgency: true, completed: true },
    { todo: "pat a cat", urgency: true, completed: false },
    { todo: "vacuum", urgency: false, completed: false },
  ]);
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
          className="w-1/2 p-2 mx-2 b-1 border-gray-400 border-2 rounded-xl"
          placeholder="🔍Search for tasks"
          value={searchInput}
          onChange={(e) => {
            const newInput = e.target.value;
            setSearchInput(newInput);
          }}
        />
      </div>
      <div className="flex-col m-2">
        <input
          className="show-urgent-check m-1"
          type="checkbox"
          value={showUrgentChecked}
          checked={showUrgentChecked}
          onChange={() => {
            setShowUrgentChecked(!showUrgentChecked);
          }}
        />
        <label for="show-urgent-check">Show urgent todos only</label>

        <input
          className="sort-urgency-check m-1"
          type="checkbox"
          value={sortUrgencyDescending}
          checked={sortUrgencyDescending}
          onChange={(e) => {
            setSortUrgencyDescending(!sortUrgencyDescending);
          }}
        />
        <label for="sort-urgency-check">Sort urgent tasks first</label>
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
          <label for="urgent-check" className="m-1">
            Urgent?
          </label>
          <input
            className="urgent-check"
            type="checkbox"
            value={urgentChecked}
            checked={urgentChecked}
            onChange={(e) => {
              setUrgentChecked(!urgentChecked);
            }}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
            onClick={() => {
              const newTodoList = [...todoList];
              newTodoList.push({
                todo: todoInput,
                urgency: urgentChecked,
                completed: false,
              });
              setTodoList(newTodoList);
              setUrgentChecked(false);
              setTodoInput("");
            }}
          >
            Add New Todo
          </button>
        </div>
        <div className="m-2">
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
            onClick={() => {
              setTodoList([]);
            }}
          >
            Clear all todos
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer m-2 hover:bg-blue-800"
            onClick={() => {
              const newTodoList = [...todoList];
              newTodoList.splice(0, 1);
              setTodoList(newTodoList);
            }}
          >
            Remove first todo
          </button>
        </div>
        <ul>{todosToDisplay}</ul>
      </div>
    </div>
  );
}

function getTodosToDisplay(todoList, showUrgentChecked, sort, searchInput) {
  const todoListFilteredByUrgency = showUrgentChecked
    ? todoList.filter((todo) => {
        return todo.urgency;
      })
    : todoList;

  const todosFilteredBySearchInput = todoListFilteredByUrgency.filter(
    (todo) => {
      return todo.todo.toLowerCase().includes(searchInput);
    }
  );

  const todoListByDescendingUrgency = sort
    ? todosFilteredBySearchInput.toSorted((a, b) => {
        return b.urgency - a.urgency;
      })
    : todosFilteredBySearchInput;

  return todoListByDescendingUrgency.map((todo) => {
    return <Todo item={todo} />;
  });
}
