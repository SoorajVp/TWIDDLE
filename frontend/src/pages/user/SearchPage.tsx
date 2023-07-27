/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import Explore from '../../components/user/search/Explore';
import SearchBar from '../../components/user/search/SearchBar';
import { apiCalls } from '../../api/user/apiCalls';

const SearchPage = () => {
    const [ posts, setPosts ] = useState([]);
  useEffect(()=> {
    fetchAllPosts()
  },[])

  const fetchAllPosts = async(): Promise<void> => {
    const response: any = await apiCalls.getAllPosts();
    console.log(response)

    if(response.status == "success") {
      setPosts(response.posts);
      console.log(posts)
    }
  }
  return (
    <div>
        <SearchBar />
        <div className="grid grid-cols-3 gap-1 mt-4 ">
        {
            posts?.map((post) => {
                return  <Explore {...post} key={post._id} />
            }) 
        }
        </div>
       
    </div>
  )
}

export default SearchPage;