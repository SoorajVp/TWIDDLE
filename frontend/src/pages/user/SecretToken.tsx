import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/shimmer/Loading";
import { toast } from "react-toastify";

type Params = {
  id: string | undefined;
  userId: string | undefined
};

const SecretToken = () => {

  const navigate = useNavigate();
  const { id } = useParams<Params>();

  useEffect(() => {
   
    id && localStorage.setItem("token", id);
    
    navigate("/");
    toast.success( "Loggedin successfully ", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
    });

  },[]);


  return (
    <div>
      <Loading />
    </div>
  );
};



export default SecretToken;
