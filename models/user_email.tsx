import mongoose, { Document, Model, Schema } from 'mongoose';


interface User_email extends Document {
    email: string;
    update: boolean;
}
  
let ResponseSchema: Model<User_email>;
try {
  ResponseSchema = mongoose.model<User_email>('user_email');
} catch (error) {
  ResponseSchema = mongoose.model<User_email>(
    'user_email',
    new Schema<User_email>({ 
        email: {
            type: String,
            required: true,
          },
        update: {
          type: Boolean,
          required: false,
        }
    }, { collection: 'user_email' })
  );
}

export default ResponseSchema;
