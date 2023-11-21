export type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Teacher = {
  id: number;
  name: Name;
  gender: 'male' | 'female' | 'other';
  email: string;
  dateOfBirth?: string;
  contactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  address: string;
};
