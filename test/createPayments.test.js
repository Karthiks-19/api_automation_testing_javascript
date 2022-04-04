import { expect } from "chai";
import { before } from "mocha";
const Payments = require("../supporter/supporter");
const PaymentAmount = require("../data/payment_amount.json");

describe("create token, user", async () => {
  let access_token_response;

  before(async () => {
    access_token_response = await Payments.create_token();
    // console.log(access_token_response)
  });

  it("response body should not be empty", () => {
    expect(access_token_response.body).to.not.be.empty;
  });

  it("should have accessToken in the response", () => {
    expect(access_token_response.body).has.property("accessToken");
  });

  it("should have refreshToken in the response", () => {
    expect(access_token_response.body).has.property("refreshToken");
  });

  it("should have status 201", () => {
    expect(access_token_response.status).to.eq(201);
  });
});

describe("create payments, user", async () => {
  let payment_creation_response;

  before(async () => {
    payment_creation_response = await Payments.create_payment();
    // console.log(payment_creation_response)
  });

  it("response body should not be empty", () => {
    expect(payment_creation_response.body).to.not.be.empty;
  });

  it("should have paymentId in the response", () => {
    expect(payment_creation_response.body).has.property("paymentId");
  });

  it("should have billReference in the response", () => {
    expect(payment_creation_response.body).has.property("billReference");
  });

   it("should have status 201", () => {
    expect(payment_creation_response.status).to.eq(201);
  });

  // it("should should status message as created", () => {
  //   expect(payment_creation_response.statusMessage).to.eq('Created');
  // });

  it("should have currency 'SGD' ", () => {
    expect(payment_creation_response.body.amount.currency).to.eq("SGD");
  });

  it("should have correct payment amount", () => {
    expect(payment_creation_response.body.amount.value).to.eq(PaymentAmount.amount);
  });

});

describe('get payment status', async () => {
  let payment_status_response;

  before(async () => {
    payment_status_response = await Payments.payment_status();
    console.log(payment_status_response)
  });

  it('get status of payment', async () => {
    // await payment_details();
  });

});

describe("complete payments, user", async () => {
  let payment_complete_response;

  before(async () => {
    payment_complete_response = await Payments.complete_payment();
    // console.log(payment_complete_response)
  });

  it("should get 'Success' message", () => {
    expect(payment_complete_response.body.ResponseBody).has.property("Success");
  });

  it("should get 'true' on completing payment", () => {
    expect(payment_complete_response.body.ResponseBody.Success).to.eq(true);
  });

});
