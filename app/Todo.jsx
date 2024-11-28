import { revalidateTag } from "next/cache";
import React from "react";

async function TodoList(props) {
    const data = await fetch("http://localhost:3000/api/todos", {
        next: { tags: ["todos"] },
        cache: "no-store",
    });
    const todos = await data.json();

    async function newTodo(formData) {
        "use server"
        const text = formData.get("text");
        console.log(text);
        await fetch("http://localhost:3000/api/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
          });
        revalidateTag("todos");
    }

  return (
    <div className="container mx-auto flex items-center justify-center h-full">
      <div>
        <form action={newTodo} className="mb-8 flex flex-col items-start gap-2">
          <label htmlFor="text" className="flex flex-col">
            <span>Todo: </span>
            <input type="text" name="text" id="text" className="px-1 rounded-md border-black border" />
          </label>

          <button type="submit" className="bg-orange-400 text-orange-900 px-2 py-1 rounded">Ajouter</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="text-2xl text-black">
              • {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;