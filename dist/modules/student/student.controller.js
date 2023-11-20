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
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        const result = yield student_service_1.StudentServices.createStudentInTheDB(studentData);
        res.status(200).json({
            status: 'success',
            data: result,
            message: 'Student created successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            status: 'success',
            data: result,
            message: 'Students are retrieved succesfully',
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            status: 'success',
            data: result,
            message: 'Student is retrieved succesfully',
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
