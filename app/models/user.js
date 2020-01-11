import mongoose from 'mongoose';
mongoose.set('debug', true);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
}, { collection: "user" })

const User = mongoose.model('user', userSchema);

export default User;