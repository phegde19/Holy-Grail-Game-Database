import axios from 'axios';
import fs from 'fs';
import { API_KEY } from './GameAPI.js'; // Import the API_KEY from GameAPI.js

async function fetchData() {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const data = response.data;
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        console.log('Data collected and saved to data.json');
    }
    catch (error) {
        console.error("Error collecting data: ", error.message);
    }
}

fetchData(); // Call the function to collect data