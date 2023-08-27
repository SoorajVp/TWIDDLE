import { useSelector } from "react-redux"
import StripeCheckout, { Token } from "react-stripe-checkout"
import { RootState } from "../../../state/interface/userInterface";
import { userRequest } from "../../../api/requests/userRequest";
import { STRIPE_PUBLISHABLE_KEY } from "../../../constants";


interface ApiResponse {
    status: string;
    message: string;
}

const AccountVerification = () => {

    const { user } = useSelector((store: RootState) => store.user);
    const details = {
        name: user.name,
        price: 20
    }

    const makePayment = async (token: Token) => {
        const body = {
            token,
            details
        }
        const response = await userRequest.payment(body) as ApiResponse;
        console.log("payment response", response)
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <img className="w-[40%]" src="../../../../public/verified-image.png" alt="verified" /><br />
                <StripeCheckout stripeKey={STRIPE_PUBLISHABLE_KEY}
                    token={makePayment} name="Get account verfied" amount={details.price * 100} />
            </div>
        </>
    )
}

export default AccountVerification