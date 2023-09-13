
import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { loadStripe } from '@stripe/stripe-js';
import { userRequest } from "../../../api/requests/userRequest";
import { STRIPE_PUBLISHABLE_KEY } from "../../../config";
import { useState } from "react";
import { PageLoading } from "../../shimmer/Loading";
import { toast } from "react-toastify";


interface ApiResponse {
    status: string;
    message: string;
    sesssionId?: any
}

const AccountVerification = () => {
    const { darkMode } = useSelector((store: RootState) => store.user);
    const [loading, setLoading] = useState<boolean>(false)

    const makePayment = async () => {
        const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

        try {
            setLoading(true)
            const response = await userRequest.payment() as ApiResponse;
            if (response.status == "success") {
                const session = response.sesssionId;
                const result: any = stripe.redirectToCheckout({
                    sessionId: session
                })
                if (result.error) {
                    toast.error("Something went wrong", {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true,
                    });
                    setLoading(false)
                }
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
            });
            setLoading(false)
        }

    }

    return (

        <>
            {loading ? <PageLoading /> :
                <div className="flex justify-center w-full mt-10">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <img className="w-[45%]  -m-8" src="../../../../public/verified-image.png" alt="Loading" />
                        </div><br />

                        <h2 className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-base`}>Discover new friends <br /> Connections in our vibrant community.</h2>
                        <button onClick={makePayment} className="py-1 px-8 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-700 mt-3 rounded transition duration-300 ease-in">Make Payment</button>
                    </div>
                </div>
            }
        </>
    )
}

export default AccountVerification