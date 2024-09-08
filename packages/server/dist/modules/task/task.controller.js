"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskHandler = void 0;
const task_service_1 = require("./task.service");
const createTaskHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const taskService = new task_service_1.TaskService();
    try {
        const newTask = yield taskService.createTask(request.body);
        return reply.status(201).send(newTask);
    }
    catch (error) {
        console.log("An error occured while creating the a task: ", error);
        return reply.status(500).send(error);
    }
});
exports.createTaskHandler = createTaskHandler;
