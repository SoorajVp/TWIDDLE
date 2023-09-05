import { useEffect } from "react"
import Loading from "../../shimmer/Loading"
import { userRequest } from "../../../api/requests/userRequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { toast } from "react-toastify";

type ApiResponse = {
    status: string,
    message: string
}


const VerifySuccess = () => {
    const { user } = useSelector((store: RootState) => store.user )
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const sessionId = searchParams.get('session_id');
        console.log("sessionId result - - - ", sessionId)
        checkValidSession(sessionId)
    }, [])

    const checkValidSession = async (sessionId: string ) => {
        const response = await userRequest.checkSessionStatus(sessionId) as ApiResponse;
        if (response.status == "success") {
            toast.success(response.message, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
            });
            navigate(`/${user.name}`)
        } else {
            toast.error(response.message, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
            });
            navigate(`/payment`)
        }
    }

  return (
    <>
        <Loading />
    </>
  )
}

export default VerifySuccess