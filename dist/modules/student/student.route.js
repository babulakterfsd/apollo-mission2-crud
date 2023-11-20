"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
router.post('/create-student', student_controller_1.StudentControllers.createStudent);
router.get('/get-all-students', student_controller_1.StudentControllers.getAllStudents);
router.get('/get-single-student/:studentId', student_controller_1.StudentControllers.getSingleStudent);
exports.StudentRoute = router;
