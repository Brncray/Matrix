import express, { Express } from 'express';
import { config } from 'dotenv';
import routes from './routes';
import { createApp } from './utils/createApp';
import './database'; 

config(); 

const app = express();
const PORT = process.env.PORT || 3000;



async function main() {
    try {
        const app = createApp();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Running in ${process.env.ENVIROMENT} mode.`); 
            console.log(`http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error(error);
    }
}

main(); 