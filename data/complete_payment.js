const PaymentAmount = require("../data/payment_amount.json");

class CompletePaymentData {
  requestBody(bill_reference) {
    return {
      RequestBody: {
        NotificationID: "294240878826854783353599693132",
        BankReferenceNo: `98273${bill_reference}`,
        Amount: PaymentAmount.amount,
        Currency: "SGD",
        DebtorName: "karthik",
        EndToEndIdentification: `${bill_reference}`,
      },
    };
  }
  headers = {
    "content-type": "application/json",
  };
}
module.exports = new CompletePaymentData();
