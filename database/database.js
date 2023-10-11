const mongoose = require('mongoose')

const {mongoURI} = process.env;

const connectToDb = (dbURI) => {
    mongoose.connect(dbURI)
        .catch(error => console.error(error))
        .then(r => console.log(`Connected to DB: ${r.connection.name}`))
}

async function main() { 
    connectToDb(mongoURI); 
} 
 
export default main