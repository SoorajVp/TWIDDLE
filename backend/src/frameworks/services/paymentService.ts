import Stripe from 'stripe';
import configKeys from '../../config';
import AppError from '../../utils/appError';
import { HttpStatus } from '../../types/httpStatus';

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});



export const paymentService = () => {

    const payAmount = async( userId: string ) => {
        try {
            const lineItems = [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Verification Process"
                        },
                        unit_amount: 5000 * 100
                    },
                    quantity: 1
                }
            ];
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${configKeys.CLIENT_PORT}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${configKeys.CLIENT_PORT}/payment`,
            });
            
            return session.id;

        } catch (error) {
            throw new AppError("Something went wrong", HttpStatus.OK)
        }
    }

    const checkSubscription = async( sessionId: string) => {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session) {
            return session.payment_status;
        } else {
            throw new AppError("Invalid payment session", HttpStatus.OK)
        }
        
    }

    return { payAmount, checkSubscription }
}

export type paymentServiceType = typeof paymentService;