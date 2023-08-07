import mongoose, { Document, Model, Schema } from 'mongoose';

interface Coordinates {
  cx: number;
  cy: number;
  response_time: number;
}

interface User_data extends Document {
  task: string;
  coordinates: { [key: string]: Coordinates };
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
        type: String,
        required: true,
      },
      coordinates: {
        type: Schema.Types.Mixed,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    }, { collection: 'response_schema' })
  );
}

export default ResponseSchema;
