import validator from 'validator';
import { z } from 'zod';
import { TeacherModel } from './teacher.model';

const nameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First name should be at least 3 characters long' })
    .max(20, {
      message: 'First name should not be more than 20 characters long',
    })
    .refine(
      (value) => {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      {
        message:
          'First name should have the first letter capitalized and the rest in lowercase',
      }
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last name should be at least 3 characters long' })
    .max(20, {
      message: 'Last name should not be more than 20 characters long',
    })
    .refine((value) => validator.isAlpha(value), {
      message: 'Last name cannot contain any numeric value',
    }),
});

const teacherSchema = z.object({
  id: z
    .number()
    .int()
    .min(1, { message: 'Id should be equal or greater than 1' })
    .refine(
      async (value) => {
        const isIdExists = await TeacherModel.findOne({ id: value });
        if (isIdExists) {
          return false;
        } else {
          return true;
        }
      },
      {
        message: 'ei id ta ache, arekta id try koro',
      }
    ),
  name: nameSchema,
  gender: z
    .enum(['male', 'female', 'other'])
    .refine((value) => ['male', 'female', 'other'].includes(value), {
      message: 'Gender is either male, female, or other',
    }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine(
      async (value) => {
        const isEmailExists = await TeacherModel.findOne({ email: value });
        if (isEmailExists) {
          return false;
        } else {
          return true;
        }
      },
      {
        message: 'ei email ta already ache, arekta email diye try koro',
      }
    ),
  contactNumber: z
    .string()
    .min(9, { message: 'Contact number should be at least 9 characters long' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .refine(
      (value) =>
        ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].includes(value),
      {
        message: 'Blood group is either A+, A-, B+, B-, O+, O-, AB+, or AB-',
      }
    )
    .optional(),
  address: z.string().refine(Boolean, { message: 'Address is required' }),
});

export default teacherSchema;
