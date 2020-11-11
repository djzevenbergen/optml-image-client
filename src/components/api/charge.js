import Stripe from 'stripe';
const stripe = new Stripe(process.env.DB_STRIPE_KEY);

export default async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Monthly Subscription',
      payment_method: id,
      confirm: true
    });
    console.log(payment);

    return res.status(200).json({
      confirm: "Payment received"
    });
  } catch (error) { }
};