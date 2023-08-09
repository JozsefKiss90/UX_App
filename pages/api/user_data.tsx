import connectToDb from '../../database/database'
import UserData from '../../models/user_data.model'
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDb();
      } catch (err) {
        return res.status(500).json(err);
      }    
    
    if(req.method === 'GET') {
        try { 
            const data = await UserData.find();
            res.status(200).json({ data: data }); 
            } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
            }
        }

    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + JSON.stringify(req.body))
        const { task, coordinates, email, feedback, likert} = req.body
 
        const userData = new UserData({task, coordinates, email, feedback, likert});
        userData
        .save()
        .then((data) => {
            res.status(201).json({ status: true, user: data });
        })
        .catch((err) => {
            return res.status(404).json({ err });
        });
        } else {
            res.status(500).json({ message: 'HTTP method not valid' });
        }
}