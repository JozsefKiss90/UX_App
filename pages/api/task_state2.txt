import mongoose from 'mongoose';
import connectToDb from '../../database/database'
import TaskSchema from '../../models/task_state.model'
import ResponseSchema from '../../models/user_data.model'

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
const Response = mongoose.models.Data || mongoose.model('Data', ResponseSchema);

const toggleVariant = async () => {
    const session = await mongoose.startSession()
    
    try {
      let task = await Task.findOne({ entry: "singleton" });
      if (!task) {
        task = await Task.create({ entry: "singleton", variant: 'A' });
      }
      
      const countA = await Response.countDocuments({task: 'A'}).session(session);
      const countB = await Response.countDocuments({task: 'B'}).session(session);

      let newVariant;
      if (countA === countB) {
        newVariant = task.variant === 'A' ? 'B' : 'A';
      } else {
        newVariant = countA < countB ? 'A' : 'B';
      }
  
      task = await Task.findOneAndUpdate(
        { entry: "singleton" },
        { variant: newVariant },
        { new: true }
      ).session(session);
  
      await session.commitTransaction();
  
      return task.variant;
    } catch (err) {

      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  };
  
  

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  await connectToDb();

  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const newVariant = await toggleVariant();
    await session.commitTransaction();
    res.status(200).json({ variant: newVariant });
  } catch (err : any) {
    console.error(err); 
    await session.abortTransaction();
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  } finally {
    session.endSession();
  }
}

import mongoose from 'mongoose';
import connectToDb from '../../database/database'
import TaskSchema from '../../models/task_state.model'

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

const toggleVariant = async () => {
    try {
      let task = await Task.findOne({ entry: "singleton" });
      if (!task) {
        task = await Task.create({ entry: "singleton", variant: 'A' });
      }
  
      const newVariant = task.variant === 'A' ? 'B' : 'A';
      task = await Task.findOneAndUpdate(
        { entry: "singleton" },
        { variant: newVariant },
        { new: true }
      );
      return task.variant;
    } catch (err) {
      throw err;
    }
  };
  
  

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  await connectToDb();

  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const newVariant = await toggleVariant();
    await session.commitTransaction();
    res.status(200).json({ variant: newVariant });
  } catch (err : any) {
    console.error(err); // log detailed error message
    await session.abortTransaction();
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  } finally {
    session.endSession();
  }
}
