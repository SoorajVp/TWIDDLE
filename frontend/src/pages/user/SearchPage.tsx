import { useEffect, useState } from "react";
import SearchBar from "../../components/user/search/SearchBar";
import { PageLoading } from "../../components/shimmer/Loading";
import { PostInterface } from "../../state/interface/postInterface";
import PostSingleView from "../../components/modal/PostSingleView";
import RightBar from "../../components/user/layout/rightBar/Rightbar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { postRequest } from "../../api/requests/postRequest";

const SearchPage = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const { actions } = useSelector((store: RootState) => store.user);
  useEffect(() => {
    fetchAllPosts();
  }, [actions]);

  const fetchAllPosts = async (): Promise<void> => {
    const response: any = await postRequest.getAllPosts();
    if (response.status == "success") {
      setPosts(response.posts);
    }
  };

  return (
    <>
        {posts.length === 0 ? (
          <PageLoading />
        ) : (
          <div>
            <SearchBar />
            <div className="grid grid-cols-3 gap-1 mt-4 ">
              {posts?.map((post) => {
                return <PostSingleView {...post} key={post._id} />;
              })}
            </div>
          </div>
        )}
      
    </>
  );
};

export default SearchPage;
