import { Teacher } from './teacher.interface';
import { TeacherModel } from './teacher.model';

const createTeacherInTheDB = async (teacher: Teacher) => {
  const result = await TeacherModel.create(teacher);
  return result;
};

const getAllTeachersFromDB = async () => {
  const result = await TeacherModel.find();
  return result;
};

const getSingleTeacherFromDB = async (id: string) => {
  const result = await TeacherModel.find({ id: id });
  return result;
};

export const TeacherServices = {
  createTeacherInTheDB,
  getAllTeachersFromDB,
  getSingleTeacherFromDB,
};
