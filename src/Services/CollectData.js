import axios from 'axios';
import fs from 'fs';

const API_KEY = "d077aaadd5b44092ae033b141e2f09c7";

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