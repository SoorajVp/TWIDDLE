/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { PostInterface } from "../../state/interface/postInterface";
import { toast } from "react-toastify";
import RightBar from "../../components/user/layout/Rightbar";
// import PostCard from "../../components/user/posts/PostCard";
import { postRequest } from "../../api/requests/postRequest";
import PostShimmer from "../../components/shimmer/postShimmer";
import PostEmpty from "../../components/user/posts/PostEmpty";

const LazyPostCard = lazy(() => import("../../components/user/posts/PostCard"));

const HomePage = () => {
  const { actions } = useSelector((store: RootState) => store.user);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    console.log("started ")
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await postRequest.getFollowPosts();
        if (response.status === "success") {
          setPosts(response.posts);
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    console.log("end")
  }, [actions]);

  

  return (
    <>
      <div className="lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-4 overflow-auto">
        

        <div className="lg:mx-20">
          {isLoading && <PostShimmer />}
          {posts.length === 0 && !isLoading && <PostEmpty />}
          <Suspense fallback={<PostShimmer />}>
            {posts.map((post) => (
              <LazyPostCard {...post} key={post._id} />
            ))}
          </Suspense>
        </div>

      </div>

      <RightBar />
    </>
  );
};

export default HomePage;
