import dotenv from 'dotenv';
import { db } from './data-source';

dotenv.config();
db.config();

export default db.get();
