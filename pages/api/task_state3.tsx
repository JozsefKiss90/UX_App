import mongoose from 'mongoose';
import connectToDb from '../../database/database'
import TaskSchema from '../../models/task_state.model'
import ResponseSchema from '../../models/user_data.model'

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
const Response = mongoose.models.Data || mongoose.model('Data', ResponseSchema);

const toggleVariant = async () => {
  let newVariant; 
  const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        let task = await Task.findOne({ entry: "singleton" }).session(session);
        if (!task) {
          task = await Task.create([{ entry: "singleton", variant: 'A' }], { session });
        }

        const countA = await Response.countDocuments({task: 'A'}).session(session);
        const countB = await Response.countDocuments({task: 'B'}).session(session);
    
        if (countA === countB) {
          newVariant = task.variant === 'A' ? 'B' : 'A';
        } else {
          newVariant = countA < countB ? 'A' : 'B';
        }
      
        task = await Task.findOneAndUpdate(
          { entry: "singleton", __v: task.__v },
          { variant: newVariant, $inc: { __v: 1 } },
          { new: true, session }
        );
        
      });
      
      if (newVariant) {
        return newVariant; 
      }

    } catch (err) {
      console.error(`Attempt failed: ${err.message}`);
      
    } finally {
      session.endSession(); 
    }

  throw new Error("Unable to toggle variant"); 
};


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  await connectToDb();

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newVariant = await toggleVariant();

    await session.commitTransaction();
    console.log("VARIANT IS:", newVariant);

    res.status(200).json({ variant: newVariant }); 
    return; 
  } catch (err) {
    console.error(err); 
    await session.abortTransaction();
    
    if (err.errorLabels && err.errorLabels.indexOf('TransientTransactionError') >= 0) {
      console.log('Transaction conflicted.');
    } 

    res.status(500).json({ error: 'Internal Server Error', message: err.message });
    return;
  } finally {
    session.endSession();
  }
  
}
