import mongoose from "mongoose";

async function connectDB() {
    try {
        let result = await mongoose.connect(`mongodb+srv://<product>:<ashu1996>@cluster0.p2vw4.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log('dhang se kr');
    }
}

export default connectDB;