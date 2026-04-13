"use client";

type Task = {
  text: string;
  completed: boolean;
};

type Props = {
  task: Task;
  index: number;
  toggleComplete: (index: number) => void;
  deleteTask: (index: number) => void;
};

export default function TodoItem({
  task,
  index,
  toggleComplete,
  deleteTask,
}: Props) {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition">
      <span
        onClick={() => toggleComplete(index)}
        className={`cursor-pointer ${
          task.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(index)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        ✖
      </button>
    </li>
  );
}