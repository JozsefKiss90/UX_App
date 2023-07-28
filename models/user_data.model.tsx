import mongoose, { Document, Model, Schema } from 'mongoose';

interface User_data extends Document {
  task : string,
  coordinate_x : number,
  coordinate_y : number, 
  response_time: number;
  email: string;
}

let ResponseSchema: Model<User_data>;
try {
  ResponseSchema = mongoose.model<User_data>('response_schema');
} catch (error) {
  ResponseSchema = mongoose.model<User_data>(
    'response_schema',
    new Schema<User_data>({
      task: {
        type : String,
        required: true,
      },  
      coordinate_x: {
        type : Number,
        required: true,
      },
      coordinate_y: {
        type : Number,
        required: true,
      },
      response_time: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      }
    }, { collection: 'response_schema' })
  );
}

export default ResponseSchema;
