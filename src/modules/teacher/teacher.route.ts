import express from 'express';
import { TeacherControllers } from './teacher.controller';

const router = express.Router();

router.post('/create-teacher', TeacherControllers.createTeacher);
router.get('/get-all-teachers', TeacherControllers.getAllTeachers);
router.get(
  '/get-single-teacher/:teacherId',
  TeacherControllers.getSingleTeacher
);

export const TeacherRoute = router;
