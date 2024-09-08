"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateTask = {
    title: zod_1.z.string({
        required_error: "Title is required to create a task",
        invalid_type_error: "Title must be a string"
    }),
    description: zod_1.z.string(),
    userId: zod_1.z.number(),
    status: zod_1.z.string()
};
const CreateTaskPartialResponse = {
    id: zod_1.z.number(),
};
const CreateTaskResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, CreateTaskPartialResponse), CreateTask));
const CreateTaskSchema = zod_1.z.object(Object.assign({}, CreateTask));
