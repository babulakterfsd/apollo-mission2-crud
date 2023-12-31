import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import config from '../../config';
import {
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
  // TStudentMethods,
  TStudentModel,
} from './student.interface';

const nameSchema = new Schema<TName>({
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

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    minlength: [3, 'Father name should be atleast 3 characters long'],
    maxlength: [20, 'Father name should not be more than 20 characters long'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    minlength: [3, 'Mother name should be atleast 3 characters long'],
    maxlength: [20, 'Mother name should not be more than 20 characters long'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
    minlength: [3, 'Local guardian name should be atleast 3 characters long'],
    maxlength: [
      20,
      'Local guardian name should not be more than 20 characters long',
    ],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
    minlength: [
      3,
      'Local guardian address should be atleast 3 characters long',
    ],
    maxlength: [
      20,
      'Local guardian address should not be more than 20 characters long',
    ],
  },
});

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    name: {
      type: nameSchema,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password should be atleast 8 characters long'],
      maxlength: [20, 'Password should not be more than 20 characters long'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message:
          'Gender is either male or female or other. you provided {VALUE}',
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
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
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message:
          'Blood group is either: A+, A-, B+, B-, O+, O-, AB+, AB- . you provided {VALUE}',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      minlength: [3, 'Present address should be atleast 3 characters long'],
      maxlength: [
        20,
        'Present address should not be more than 20 characters long',
      ],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      minlength: [3, 'Permanent address should be atleast 3 characters long'],
      maxlength: [
        20,
        'Permanent address should not be more than 20 characters long',
      ],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian is required'],
    },
    profileImg: {
      type: String,
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: 'Status is either: active or blocked. you provided {VALUE}',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
});

//pre save middleware / hook (will run before saving / creating the document)
studentSchema.pre<TStudent>('save', async function (next) {
  //hashing the password and saving it
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

//post save middleware / hook (will run after saving / creating the document)
studentSchema.post<TStudent>('save', function (doc, next) {
  //emptying the password field
  doc.password = '';

  next();
});

//query middleware / hook (will run before executing the query)
studentSchema.pre('find', function (next) {
  //we wont send the deleted students. first, this find method will run and then the query will be executed. so, at first we will filter out the deleted students and then the query will be executed on those filtered students. so we wont get the deleted students. but remember, this will only work for find method. if we use findOne method, then this hook wont work. so, we have to use pre findOne hook for that. also, this hook wont work for findById method. so, we have to use pre findById hook for that. again, if someone query single data using aggregate method, then this hook wont work. so, we have to use pre aggregate hook for that.
  this.find({ isDeleted: { $ne: true } });
  next();
});

//aggregate middleware / hook (will run before executing the aggregate)
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await StudentModel.findOne({ id });
  return existingStudent;
};

//custom instance method
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const existingStudent = await StudentModel.findOne({ id });
//   return existingStudent;
// };

export const StudentModel = model<TStudent, TStudentModel>(
  'students',
  studentSchema
);
