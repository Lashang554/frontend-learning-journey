"use client";

type Props = {
  task: string;
  setTask: (value: string) => void;
  addTask: () => void;
};

export default function TodoInput({ task, setTask, addTask }: Props) {
  return (
    <div className="flex gap-2 mb-6 text-gray-900">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
        placeholder="Write a task..."
        className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        onClick={addTask}
        className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        Add
      </button>
    </div>
  );
}