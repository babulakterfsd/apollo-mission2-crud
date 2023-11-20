/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TeacherServices } from './teacher.service';

const createTeacher = async (req: Request, res: Response) => {
  try {
    const { teacher: teacherData } = req.body;
    const result = await TeacherServices.createTeacherInTheDB(teacherData);

    res.status(200).json({
      status: 'success',
      data: result,
      message: 'Teacher created successfully',
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const result = await TeacherServices.getAllTeachersFromDB();

    res.status(200).json({
      status: 'success',
      data: result,
      message: 'Teachers are retrieved succesfully',
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const getSingleTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const result = await TeacherServices.getSingleTeacherFromDB(teacherId);

    res.status(200).json({
      status: 'success',
      data: result,
      message: 'Teacher is retrieved succesfully',
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const TeacherControllers = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
};
