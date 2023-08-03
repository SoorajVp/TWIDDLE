/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from "react";
import SearchBar from "../../components/user/search/SearchBar";
import { apiCalls } from "../../api/user/apiCalls";
import { PageLoading } from "../../components/shimmer/Loading";
import { PostInterface } from "../../state/interface/postInterface";
import PostSingleView from "../../components/modal/PostSingleView";

const SearchPage = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async (): Promise<void> => {
    const response: any = await apiCalls.getAllPosts();
    if (response.status == "success") {
      setPosts(response.posts);
    }
  };

  if(posts.length === 0 ) {
    return <PageLoading />
  }

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-3 gap-1 mt-4 ">
        {posts?.map((post) => {
          // return <Explore {...post} key={post._id} />;
          return <PostSingleView {...post} key={post._id} />;

        })}
      </div>
    </div>
  );
};

export default SearchPage;
