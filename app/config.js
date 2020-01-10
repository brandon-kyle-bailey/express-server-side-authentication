import dotenv from 'dotenv';
dotenv.config();

const USER = process.env.USER || 'user';
const PASSWD = process.env.PASSWD || '12345';
const DBURL = process.env.DATABASE || `mongodb+srv://${USER}:${PASSWD}@sandbox-mongodb-one-cluster-eioz4.mongodb.net/test?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

const SILENTWARNINGS = { useNewUrlParser: true, useUnifiedTopology: true };

export { USER, PASSWD, DBURL, PORT, SILENTWARNINGS };