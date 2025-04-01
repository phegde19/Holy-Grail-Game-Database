import axios from "axios";

const key = "d077aaadd5b44092ae033b141e2f09c7";
const axiosCreate = axios.create({
    baseURL:'https://api.rawg.io/api'
})

const getGenreList=axiosCreate.get('/genres?key='+key);
const getAllGames=axiosCreate.get('/games?key='+key);
const getGameListByGenre=(id)=>axiosCreate.get('/games?key='+key+'&genres='+id);
const searchGame=(name)=>axiosCreate.get('/games?key='+key+'&page_size=10&search='+name);

export default {
    getGenreList
    ,getAllGames
    ,getGameListByGenre
    ,searchGame
}