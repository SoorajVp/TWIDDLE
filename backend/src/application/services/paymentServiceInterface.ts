import { paymentServiceType } from "../../frameworks/services/paymentService"

export const paymentServiceInterface = (service: ReturnType<paymentServiceType> ) => {

    const payAmount = ( userId: string) => {
        return service.payAmount(userId);
    }

    const checkSubscription = (sessionId: string) => {
        return service.checkSubscription(sessionId);
    }

    return { payAmount, checkSubscription };
}


export type paymentInterface = typeof paymentServiceInterface;