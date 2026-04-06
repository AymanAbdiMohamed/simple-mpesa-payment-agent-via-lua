import { LuaSkill } from "lua-cli";
import { CheckBalanceTool } from "./tools/CheckBalanceTool";
import { InitiatePaymentTool } from "./tools/InitiatePaymentTool";

export const paymentSkill = new LuaSkill({
  name: "mpesa-bill-payment",
  description: "Check account balances and pay bills via M-Pesa STK push for Kenyan utility services",
  tools: [new CheckBalanceTool(), new InitiatePaymentTool()],
});
