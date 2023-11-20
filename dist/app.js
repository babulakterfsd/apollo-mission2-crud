"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const student_route_1 = require("./modules/student/student.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routes
app.use('/api/v1/students', student_route_1.StudentRoute);
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to curd project of apollo b2 with Babul Akter',
    });
});
app.all('*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});
exports.default = app;
