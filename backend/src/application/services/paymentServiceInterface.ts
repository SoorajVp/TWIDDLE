import { paymentServiceType } from "../../frameworks/services/paymentService"

export const paymentServiceInterface = (service: ReturnType<paymentServiceType> ) => {

    const payAmount = ( data: any) => {
        console.log("Account verification function - - - - - - 3")

        service.payAmount(data);
        return true
    }

    return { payAmount };
}


export type paymentInterface = typeof paymentServiceInterface;