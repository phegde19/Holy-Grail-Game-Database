import React, { useEffect, useState, useContext} from 'react'
import GlobalApi from '../Services/GlobalApi';
import { VisibilityContext } from '../Context/VisibilityContext'; 
function GenreList(){
    const { visible } = useContext(VisibilityContext)
    const[genreList,setGenreList] = useState([])
    const[activeIndex,setActiveIndex] = useState(0)
    
    useEffect(()=>{
        getGenreList();
    },[])
    const getGenreList=()=>{
        GlobalApi.getGenreList.then((resp)=>{
            console.log(resp.data.results);
            setGenreList(resp.data.results);
        })
    } 
    console.log('GenreList rendered');
  return (
    <div>
        <h2 className='text-[30px] font-bold dark:text-white flex'>Genre</h2>
        {visible && (
            <>
                {genreList.map((item,index)=>(
                    <div
                    onClick={()=>setActiveIndex(index)} 
                    className={`flex gap-2 items-center mb-2 cursor-pointer
                    hover:bg-gray-400 p-3 group rounded-lg hover:dark:bg-gray-700
                    ${activeIndex==index?"bg-gray-400 dark:bg-gray-700":null}`}>
                        <img src={item.image_background } 
                        className={`w-[60px] h-[60px] 
                        object-cover rounded-lg group-hover:scale-115 transition-all
                        ease-out duration-300
                        ${activeIndex==index?"scale-115":null}`}/>   
                        <h3 className={`dark:text-white text-[20px]
                        group-hover:font-bold transition-all ease-out duration-300
                        ${activeIndex==index?"font-bold":null}`}>{item.name}</h3>
                    </div>
                ))}
            </>
    )}
    </div>
  );
};

export default GenreList