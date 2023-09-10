import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { PostInterface } from "../../state/interface/postInterface";
import { toast } from "react-toastify";
import RightBar from "../../components/user/layout/rightBar/Rightbar";
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
      return
    }
    console.log("started ")
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await postRequest.getFollowPosts();
        if (response.status === "success") {
          console.log("this is posts data -", response.posts)
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
        <div className="lg:mx-20">
          {isLoading && <PostShimmer />}
          {posts.length === 0 && !isLoading && <PostEmpty />}

          <Suspense fallback={<PostShimmer />}>
            {posts.map((post) => (
              <LazyPostCard {...post} key={post._id} />
            ))}
          </Suspense>

        </div>

    </>
  );
};

export default HomePage;
