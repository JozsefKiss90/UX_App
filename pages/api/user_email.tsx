import connectToDb from '../../database/database'
import UserEmail from '../../models/user_email'
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDb();
      } catch (err) {
        return res.status(500).json(err);
      }    
    
    if(req.method === 'GET') {
        try { 
            const data = await UserEmail.find();
            res.status(200).json({ data: data }); 
            } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
            }
        }

    else if(req.method === 'POST') { 
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + JSON.stringify(req.body)) 
        const {email,update} = req.body
        const userEmail = new UserEmail({email,update});
        userEmail
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