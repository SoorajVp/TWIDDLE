import RightBar from "../../components/user/layout/Rightbar"
import AccountVerification from "../../components/user/verifyTic/AccountVerification"

const PaymentPage = () => {

    return (
        <>
            <div className="lg:px-10 px-2 col-span-7 sm:col-span-4 overflow-auto">
                <AccountVerification />
            </div>
            <RightBar />

        </>
    )
}

export default PaymentPage