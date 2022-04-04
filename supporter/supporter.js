import supertest from "supertest";
const Config = require("../config/config.json");
const request = supertest(Config.UAT01_URL);
const Tokendata = require("../data/token_data");
const CreatePaymentData = require("../data/create_payment_data");
const CompletePaymentData = require("../data/complete_payment")
const Paymentstatus = require("../data/payment_status")

let access_token;
let bill_reference;
let payment_Id;
class Payments {
  create_token = async () => {
    const res = await request
      .post(Config.TOKEN_URL)
      .set(Tokendata.headers)
      .send(Tokendata.token_data);
    access_token = res.body.accessToken;
    return res    
  };

  create_payment = async () => {
    const res = await request
      .post(Config.CREATE_PAYMENT_URL)
      .set(CreatePaymentData.headers(access_token))
      .send(CreatePaymentData.data);
    bill_reference = res.body.billReference;
    payment_Id = res.body.paymentId;
    console.log(payment_Id)
    return res
  };

  payment_status = async () => {
    const res = await request
      // .get(`Config.CREATE_PAYMENT_URL${payment_Id}/status`)
      .get(`api/partner/cashpoint/payments/${payment_Id}/status`)
      .set(CreatePaymentData.headers(access_token))
      console.log(payment_Id)
      return res.body
  }

  complete_payment = async () => {
    const res = await request
      .post(Config.COMPLETE_PAYMENT_URL)
      .set(CompletePaymentData.headers)
      .send(CompletePaymentData.requestBody(bill_reference));
      console.log(bill_reference)
    return res;
  };
}

module.exports = new Payments();
