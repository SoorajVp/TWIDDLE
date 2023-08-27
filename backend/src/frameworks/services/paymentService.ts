import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe('sk_test_51NjHLbSBJxcGv2xCqp0BOY4RcMlHSFTGj8rbXHr1TqEt8e7Kem7QCF7zy6ucyPNu0DnDxbBtZVmulK4BmmOWeioW00vpGmmyN0', {
    apiVersion: '2023-08-16',
});



export const paymentService = () => {

    const payAmount = (data: any) => {
        console.log("Account verification function - - - - - -4")

        const { details, token } = data
        console.log("this is data - - - - ", token)
        const idempotencyKey = uuidv4()
        stripe.customers.create({
            email: token.email,
            source: token.id
        })
            .then(customer => {
                console.log(customer);
                stripe.charges.create({
                    amount: details.price,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `Verification of user ${details.name}`
                }, { idempotencyKey })
            })
            .then((result) => {
                console.log("this is payment result - ", result);
                return { status: true }
            })
            .catch((error) => {
                console.log("payment service error -- - -", error )
                return { status: false }
            });
    }

    return { payAmount }
}

export type paymentServiceType = typeof paymentService;