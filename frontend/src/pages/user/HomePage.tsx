/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import PostCard from "../../components/user/posts/PostCard";
import { apiCalls } from "../../api/user/apiCalls";
import PostShimmer from "../../components/shimmer/postShimmer";

const HomePage = () => {
  const [ posts, setPosts ] = useState([]);
  useEffect(()=> {
    console.log("heyyy")
    fetchAllPosts()
  },[])

  const fetchAllPosts = async() => {
    const response: any = await apiCalls.getAllPosts();
    console.log("Response fetched - - - -")
    console.log(response)

    if(response.status == "success") {
      setPosts(response.posts);
      console.log(posts)
    }
  }
  if(posts.length === 0 ) {
    return <PostShimmer />
  }

  return (
    <>
    <div className="lg:mx-20">
        {
          posts?.map((post) => {
            return <PostCard {...post} key={post._id} />
          })
        }
    </div>
    </>
  );
}

export default HomePage;
