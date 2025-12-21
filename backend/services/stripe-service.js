import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2023-10-16',
});

class StripeService {
  // 顧客作成
  async createCustomer(email, name, metadata = {}) {
    try {
      return await stripe.customers.create({
        email,
        name,
        metadata
      });
    } catch (error) {
      throw new Error(`Stripe customer creation failed: ${error.message}`);
    }
  }

  // 支払い意図作成
  async createPaymentIntent(amount, currency = 'jpy', customerId) {
    try {
      return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        customer: customerId,
        automatic_payment_methods: { enabled: true },
        metadata: { integration: 'tkgbank' }
      });
    } catch (error) {
      throw new Error(`Payment intent creation failed: ${error.message}`);
    }
  }

  // 送金実行
  async createTransfer(amount, destination, currency = 'jpy') {
    try {
      return await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency,
        destination,
        transfer_group: `TKG_${Date.now()}`
      });
    } catch (error) {
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }

  // Webhook処理
  async handleWebhook(payload, signature) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
      }

      return event;
    } catch (error) {
      throw new Error(`Webhook handling failed: ${error.message}`);
    }
  }

  async handlePaymentSuccess(paymentIntent) {
    // トランザクション完了処理
    console.log('Payment succeeded:', paymentIntent.id);
  }

  async handlePaymentFailure(paymentIntent) {
    // 失敗処理
    console.log('Payment failed:', paymentIntent.id);
  }
}

export default new StripeService();
