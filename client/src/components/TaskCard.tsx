import React from "react";

export type Task = {
  _id?: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string | null;
  tags: string[];
  finishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TaskCardProps = {
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="taskCard">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="taskCardTags">
        <span>Tags:</span>
        {task.tags.map((tag) => (
          <p>{tag}</p>
        ))}
      </div>
      <p className={`status status-${task.status.toLowerCase()}`}>
        {task.status
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase())}
      </p>
    </div>
  );
};
