import mongoose, { Document, Model, Schema } from 'mongoose';

interface Response {
  taskId: number;
  cx: number;
  cy: number;
  response_time: number;
  instruction:string;
  button_type: string; 
}

interface User_data extends Document {
  task: string;
  response: { [key: string]: Response };
  email: string;
  feedback : string,
  likert: { [key: number]: number };   
}

export const ResponseSchema: Schema<User_data> =  new Schema<User_data>({
  task: {
    type: String,
    required: true,
  },
  response: {
    type: Schema.Types.Mixed,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false
  },
  likert: { 
    type: Schema.Types.Mixed,
    required: true,
  },
}, { collection: 'response_schema' });


let ResponseModel: Model<User_data>
try {
  ResponseModel = mongoose.model<User_data>('response_schema');
} catch (error) {
  ResponseModel = mongoose.model<User_data>('response_schema', ResponseSchema);
}

export default ResponseModel;

