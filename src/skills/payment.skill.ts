import { LuaSkill } from "lua-cli";
import { CheckBalanceTool } from "./tools/CheckBalanceTool";
import { InitiatePaymentTool } from "./tools/InitiatePaymentTool";

export const paymentSkill = new LuaSkill({
  name: "mpesa-bill-payment",
  description: "Check account balances and pay bills via M-Pesa STK push for Kenyan utility services",
  context:
    "You have two tools available:\n\n" +
    "1. check_account_balance — Use this to look up a customer's outstanding bill for a specific service " +
    "(safaricom_postpaid, kplc_prepaid, kplc_postpaid, or nairobi_water). Always check the balance before " +
    "initiating a payment so the customer knows the exact amount due.\n\n" +
    "2. initiate_mpesa_payment — Use this to send an M-Pesa STK push to the customer's phone. " +
    "Always confirm the phone number (format: 2547XXXXXXXX) and the amount with the customer before calling this tool. " +
    "If the customer provides a number starting with 0, convert it to the 254 format first.",
  tools: [new CheckBalanceTool(), new InitiatePaymentTool()],
});
