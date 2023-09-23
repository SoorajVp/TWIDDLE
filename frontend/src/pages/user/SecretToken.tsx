import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/shimmer/Loading";
import { toast } from "react-toastify";
import { userRequest } from "../../api/requests/userRequest";
import { userInterface } from "../../state/interface/userInterface";
import { setLogin } from "../../state/slices/userSlice";
import { useDispatch } from "react-redux";

type ApiReponse = {
  user?: userInterface;
  message?: string;
  status: string;
};

type Params = {
  id: string | undefined;
  userId: string | undefined
};

const SecretToken = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id, userId } = useParams<Params>();

  const fetchUserData = async() => {
    try {
      console.log(userId)
      const { user } = (await userRequest.getUserById(userId)) as ApiReponse;
      console.log(user)
      dispatch(setLogin({ user: user, token: id }));
      navigate("/");
      toast.success("Loggedin successfully ", {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("rendering secret page - - - -")

    id && localStorage.setItem("token", id);
    fetchUserData()
  },[]);


  return (
    <div>
      <Loading />
    </div>
  );
};



export default SecretToken;
