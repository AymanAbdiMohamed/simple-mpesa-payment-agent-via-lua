import { LuaTool } from "lua-cli";
import { z } from "zod";

export class CheckBalanceTool implements LuaTool {
  name = "check_account_balance";
  description = "Check a customer account balance or bill amount for a given service";
  inputSchema = z.object({
    accountNumber: z.string().describe("The customer account or phone number"),
    service: z.enum(["safaricom_postpaid", "kplc_prepaid", "kplc_postpaid", "nairobi_water"]).describe("The service provider"),
  });

  async execute(input: { accountNumber: string; service: "safaricom_postpaid" | "kplc_prepaid" | "kplc_postpaid" | "nairobi_water" }) {
    const balances: Record<string, number> = {
      safaricom_postpaid: 1250,
      kplc_prepaid: 0,
      kplc_postpaid: 3400,
      nairobi_water: 2100,
    };
    const amount = balances[input.service] ?? 500;
    return {
      accountNumber: input.accountNumber,
      service: input.service,
      amountDue: amount,
      currency: "KES",
      status: amount > 0 ? "outstanding" : "clear",
    };
  }
}
