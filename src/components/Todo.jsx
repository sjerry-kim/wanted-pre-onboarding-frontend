import { useState } from "react";
import { useEffect } from "react";

const Todo = () => {
  const localToken = localStorage?.getItem("login-token");
  let id = 0;
  const [todo, setTodo] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const userId = 1;
  const [todoArray, setTodoArray] = useState([]);
  const [modifybox, setModifybox] = useState(false);
  const [modifyId, setModifyId] = useState(1);
  const [modifyTodo, setModifyTodo] = useState("");

  useEffect(() => {
    getTodo();
  });

  const createTodo = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id++,
        todo: todo,
        isCompleted: isCompleted,
        userId: userId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setTodo("");
          return response.json();
        }
      })
  };

  const getTodo = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setTodoArray(data);
      });
  };

  const updateTodo = (id) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: modifyTodo,
        isCompleted: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setModifybox(!modifybox);
          return response.json();
        }
      })
  };

  const deleteTodo = (id) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
      })
  };

  return (
    <div>
      <h1>Todo</h1>
      <form
        action=""
        onSubmit={(e) => {
          if(todo){
            e.preventDefault();
            createTodo();
          }else{
            alert("내용을 작성해주세요")
          }
        }}
      >
        <input
          data-testid="new-todo-input"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      {todoArray.map((t,i) => (
        <li key={i}>
          <label>
            <input type="checkbox" />
            {modifybox && t.id == modifyId ? (
              <input
                data-testid="modify-input"
                defaultValue={t.todo}
                onChange={(e) => {
                  setModifyTodo(e.target.value);
                }}
              />
            ) : (
              <span>{t.todo}</span>
            )}
          </label>
          {modifybox && t.id === modifyId ? (
            <>
              <button
                data-testid="submit-button"
                onClick={() => {
                  updateTodo(t.id);
                }}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={() => {
                  setModifybox(!modifybox);
                }}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                data-testid="modify-button"
                onClick={() => {
                  setModifybox(!modifybox);
                  setModifyId(t.id);
                }}
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                onClick={() => {
                  const id = t.id;
                  deleteTodo(id);
                }}
              >
                삭제
              </button>
            </>
          )}
        </li>
      ))}
    </div>
  );
};

export default Todo;
