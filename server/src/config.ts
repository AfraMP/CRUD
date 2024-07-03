import dotenv from 'dotenv';
dotenv.config();
export const CONFIG = {
    MONGODB_URL: process.env.MONGODB_URL || '',
    PORT: process.env.PORT || 8080
}