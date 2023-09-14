import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { PostInterface } from "../../state/interface/postInterface";
import { toast } from "react-toastify";
import { postRequest } from "../../api/requests/postRequest";
import PostShimmer from "../../components/shimmer/postShimmer";
import PostEmpty from "../../components/user/posts/PostEmpty";

const LazyPostCard = lazy(() => import("../../components/user/posts/PostCard"));

const HomePage = () => {

  const { actions } = useSelector((store: RootState) => store.user);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const navigate = useNavigate();

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
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return
    }
    fetchPosts();
  }, [actions]);


  // const handelInfiniteScroll = async () => {
  //   console.log("scrollHeight" + document.documentElement.scrollHeight);
  //   console.log("innerHeight" + window.innerHeight);
  //   console.log("scrollTop" + document.documentElement.scrollTop);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handelInfiniteScroll);
  //   return () => window.removeEventListener("scroll", handelInfiniteScroll);
  // }, []);


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
