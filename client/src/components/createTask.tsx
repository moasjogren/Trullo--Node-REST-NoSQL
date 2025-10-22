import axios from "axios";
import { useForm } from "react-hook-form";

const DB_URL = import.meta.env.VITE_DB_URL;

type Status = "TO_DO" | "IN_PROGRESS" | "BLOCKED" | "DONE";

type Inputs = {
  title: string;
  description: string;
  status: Status;
  tags: string;
};

export default function CreateTaskContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const formattedData = {
      ...data,
      tags:
        typeof data.tags === "string"
          ? data.tags.split(",").map((tag) => tag.trim())
          : data.tags,
    };
    axios.post(`${DB_URL}/tasks`, formattedData);
  };

  return (
    <div className="createTaskContainer">
      <p>Create new task</p>
      <form className="createTaskForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <span>{errors.title.message}</span>}
        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <span>{errors.description.message}</span>}

        <select {...register("status")}>
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="BLOCKED">Blocked</option>
          <option value="DONE">Done</option>
        </select>
        {errors.status && <span>{errors.status.message}</span>}

        <input placeholder="Tags, separate with comma" {...register("tags")} />
        {errors.tags && <span>{errors.tags.message}</span>}

        <input type="submit" />
      </form>
    </div>
  );
}
