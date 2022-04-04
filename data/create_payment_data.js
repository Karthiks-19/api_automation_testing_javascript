const PaymentAmount = require("../data/payment_amount.json");
class CreatePaymentData {
  headers(access_token) {
    return {
      "Content-Type": "application/vnd.socash.partnercashpoint.payment-v1+json",
      Accept: "application/vnd.socash.partnercashpoint.payment-v1+json",
      Authorization: "Bearer " + access_token,
    };
  }

  data = {
    amount: PaymentAmount.amount,
    billReference: "",
    partyBillReference: "karthik",
  };
}

module.exports = new CreatePaymentData();
