export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id?: string; // Optional for now (Client-side flow)
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
}

export const PaymentService = {
    // Replace with your actual Test Key ID from Razorpay Dashboard
    RAZORPAY_KEY_ID: 'rzp_test_YourKeyHere',

    payWithRazorpay: (
        amount: number,
        customerDetails: { name: string; phone: string; email?: string },
        onSuccess: (paymentId: string) => void,
        onFailure: (error: any) => void
    ) => {
        const options: RazorpayOptions = {
            key: PaymentService.RAZORPAY_KEY_ID,
            amount: amount * 100, // Amount is in paise
            currency: 'INR',
            name: 'Babaji Achar',
            description: 'Authentic Homemade Pickles',
            image: 'https://babajiachar.com/images/logo.jpg',
            handler: function (response: any) {
                if (response.razorpay_payment_id) {
                    onSuccess(response.razorpay_payment_id);
                } else {
                    onFailure(response);
                }
            },
            prefill: {
                name: customerDetails.name,
                email: customerDetails.email || '',
                contact: customerDetails.phone,
            },
            theme: {
                color: '#F97316', // Orange-500 matches brand
            },
        };

        try {
            // @ts-ignore
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                onFailure(response.error);
            });
            rzp1.open();
        } catch (error) {
            console.error("Razorpay SDK not loaded", error);
            alert("Payment Gateway failed to load. Please check internet connection.");
        }
    },
};
