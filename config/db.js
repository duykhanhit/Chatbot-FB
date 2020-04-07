const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            'link connect mongodb',
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
        
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}
module.exports = connectDB;