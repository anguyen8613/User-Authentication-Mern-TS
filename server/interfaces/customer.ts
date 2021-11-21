import { Document } from 'mongoose';

export default interface ICustomer extends Document {
  name: string;
  createdBy: string;
}
