import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/shimmer/Loading";

type Params = {
  id: string | undefined;
};

const SecretToken = () => {
  const navigate = useNavigate()
    const { id } = useParams<Params>();

    useEffect(() => {
        console.log(id)
        id && localStorage.setItem("token", id );
        navigate('/')
        
    })
  return (
    <div>
        <Loading />
    </div>
  )
}

export default SecretToken