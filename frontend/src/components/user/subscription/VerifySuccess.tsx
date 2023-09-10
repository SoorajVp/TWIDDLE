import { useEffect } from "react"
import Loading from "../../shimmer/Loading"
import { userRequest } from "../../../api/requests/userRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { toast } from "react-toastify";
import { setVerified } from "../../../state/slices/userSlice";

type ApiResponse = {
    status: string,
    message: string
}


const VerifySuccess = () => {
    const { user } = useSelector((store: RootState) => store.user )
    const dispatch = useDispatch()
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
            dispatch(setVerified())
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