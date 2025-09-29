import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import { MONGODB_URI } from "./variables";
import { Task } from "../models/models";

const rand = (arr: any) => arr[Math.floor(Math.random() * arr.length)];
const stats = ["TO_DO", "IN_PROGRESS", "BLOCKED"];

async function main() {
  if (!MONGODB_URI) throw new Error("Missing database connection string");

  await mongoose.connect(MONGODB_URI, {
    dbName: "trullo",
  });

  await Promise.all([Task.deleteMany({})]);

  const tasks = Array.from({ length: 20 }).map(() => {
    const stat = rand(stats);
    return {
      title: faker.word.verb(),
      description: faker.word.words({ count: { min: 5, max: 10 } }),
      tags: [faker.word.words(1)],
      status: stat,
    };
  });

  await Task.insertMany(tasks, { ordered: false });

  const total = await Task.countDocuments();
  console.log(`Seed klar. Tasks: ${total}`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
