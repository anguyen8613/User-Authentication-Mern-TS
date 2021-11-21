import mongoose, { Schema } from 'mongoose';
import ICustomer from '../interfaces/customer';

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export default mongoose.model<ICustomer>('customer', CustomerSchema);
