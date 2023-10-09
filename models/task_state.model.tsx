import mongoose, { Document, Model, Schema } from 'mongoose';

interface TaskState extends Document {
  entry: string;
  variant: string;
  createdAt: Date;
}

const TaskSchema: Schema<TaskState> = new Schema({
  entry: {
    type: String,
    required: true, 
  },
  variant: {
    type: String,
    required: true,
    enum: ['A', 'B']
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  __v: { type: Number, default: 0 }
}, { collection: 'task_state', optimisticConcurrency: true, versionKey: '__v'  });


let taskModel: Model<TaskState>;
try { 
  taskModel = mongoose.model<TaskState>('task_state');
} catch (error) {
  taskModel = mongoose.model<TaskState>('task_state', TaskSchema);
}

export default TaskSchema;