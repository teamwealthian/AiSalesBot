import { Router, Request, Response } from 'express';

const router = Router();

// Book demo endpoint (placeholder — integrate with Calendly, Cal.com, etc.)
router.post('/book-demo', async (req: Request, res: Response) => {
  try {
    const { name, email, preferredDate, conversationId } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // TODO: Integrate with your calendar/booking service
    console.log('Demo booking request:', { name, email, preferredDate, conversationId });

    res.json({
      success: true,
      message: 'Demo request received! Our team will reach out within 24 hours to confirm your booking.',
    });
  } catch (error) {
    console.error('Book demo error:', error);
    res.status(500).json({ error: 'Failed to book demo' });
  }
});

// Checkout session endpoint (placeholder — integrate with Stripe)
router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const { plan, email, conversationId } = req.body;

    // TODO: Create Stripe checkout session
    // const session = await stripe.checkout.sessions.create({ ... });

    console.log('Checkout request:', { plan, email, conversationId });

    res.json({
      success: true,
      // checkoutUrl: session.url,
      message: 'Checkout session created. Redirecting...',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

export default router;
