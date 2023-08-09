/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Suspense, lazy, useEffect, useState } from "react";
import { apiCalls } from "../../api/user/apiCalls";
import PostShimmer from "../../components/shimmer/postShimmer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { PostInterface } from "../../state/interface/postInterface";
import { toast } from "react-toastify";
import RightBar from "../../components/user/layout/Rightbar";

const PostCard = lazy(() => import("../../components/user/posts/PostCard"));

const HomePage = () => {
  const { actions } = useSelector((store: RootState) => store.user);

  const [posts, setPosts] = useState<PostInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    fetchAllPosts();
  }, [actions]);

  const fetchAllPosts = async () => {
    const response: any = await apiCalls.getAllPosts();
    console.log("home reponse -----", response);
    if (response.status == "success") {
      setPosts(response.posts);
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      <div className="lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-4 overflow-auto ">
        <div className="lg:mx-20">
          { posts.length === 0 && <PostShimmer /> }
          <Suspense fallback={<h1>Loaadinggg-----</h1>}>
            { posts?.map((post) => {
              return <PostCard {...post} key={post._id} />;
            })}
          </Suspense>
        </div>
      </div>

      <RightBar />
      
    </>
  );
};

export default HomePage;
