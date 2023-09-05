import { paymentServiceType } from "../../frameworks/services/paymentService"

export const paymentServiceInterface = (service: ReturnType<paymentServiceType> ) => {

    const payAmount = ( userId: string) => {
        console.log("Account verification function - - - - - - 3")
        return service.payAmount(userId);
    }

    const checkSubscription = (sessionId: string) => {
        console.log("Account verification function - - - - - - 3")
        return service.checkSubscription(sessionId);
    }

    return { payAmount, checkSubscription };
}


export type paymentInterface = typeof paymentServiceInterface;