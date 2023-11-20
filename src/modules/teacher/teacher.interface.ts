export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Teacher = {
  id: string;
  name: Name;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  address: string;
};
