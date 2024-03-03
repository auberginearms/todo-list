export function Todo({ item }) {
  return (
    <li>
      <div
        style={{ textDecorationLine: item.completed ? "line-through" : "none" }}
      >
        <input
          type="checkbox"
          checked={item.completed}
          className="mx-2"
        ></input>
        {item.todo} {item.urgency ? "(urgent)" : ""}
      </div>
    </li>
  );
}
