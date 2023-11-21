import { Schema, model } from 'mongoose';
import validator from 'validator';
import { Name, Teacher } from './teacher.interface';

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [3, 'First name should be atleast 3 characters long'],
    maxlength: [20, 'First name should not be more than 20 characters long'],
    trim: true,
    // validate: function (value: string) {
    //   //whatever user inputs, it will be converted to first letter capital and rest small
    //   this.firstName =
    //     value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    // },
    //custom validator
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
        return firstNameStr === value;
      },
      message:
        '{VALUE} is not valid. Please capitalize the first letter and rest small',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [3, 'Last name should be atleast 3 characters long'],
    maxlength: [20, 'Last name should not be more than 20 characters long'],
    trim: true,
    //validate using validator package
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid. Lastname cant contain any numeric value',
    },
  },
});

const teacherSchema = new Schema<Teacher>({
  id: {
    type: Number,
    required: [true, 'Id is required'],
    // unique: true,
  },
  name: {
    type: nameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Gender is either male or female or other. you provided {VALUE}',
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    // unique: true,
    //validate using regex
    // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    //validate using validator package
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message:
        'Blood group is either: A+, A-, B+, B-, O+, O-, AB+, AB- . you provided {VALUE}',
    },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [3, 'Address should be atleast 3 characters long'],
    maxlength: [20, 'Address should not be more than 20 characters long'],
  },
});

export const TeacherModel = model<Teacher>('teachers', teacherSchema);
