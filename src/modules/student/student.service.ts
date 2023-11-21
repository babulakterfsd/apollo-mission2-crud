import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentInTheDB = async (student: TStudent) => {
  //plain
  // const result = await StudentModel.create(student);
  // return result;

  //built-in static method
  const isStudentExists = await StudentModel.isStudentExists(student.id);
  if (isStudentExists) {
    throw new Error('Student already exists');
  } else {
    const result = await StudentModel.create(student);
    return result;
  }

  // * built-in instance method *
  // const studentToBeCreated = new StudentModel(student);
  // const isThisStudentAlreadyInTheDB = await studentToBeCreated.isStudentExists(
  //   student.id
  // );
  // if (isThisStudentAlreadyInTheDB) {
  //   throw new Error('Student already exists');
  // } else {
  //   const result = await studentToBeCreated.save();
  //   return result;
  // }
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.find({ id: id });
  return result;
};

export const StudentServices = {
  createStudentInTheDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
