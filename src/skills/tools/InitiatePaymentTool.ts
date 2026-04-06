import { LuaTool } from "lua-cli";
import { z } from "zod";

export class InitiatePaymentTool implements LuaTool {
  name = "initiate_mpesa_payment";
  description = "Initiate an M-Pesa STK push payment to pay a bill. The user will receive a prompt on their phone to confirm.";
  inputSchema = z.object({
    phoneNumber: z.string().describe("M-Pesa registered phone number in format 2547XXXXXXXX"),
    amount: z.number().positive().describe("Amount in KES to pay"),
    service: z.string().describe("The service being paid for"),
    accountNumber: z.string().describe("The account number for the bill"),
  });

  async execute(input: { phoneNumber: string; amount: number; service: string; accountNumber: string }) {
    // In production: POST to your FastAPI backend → Daraja STK Push
    // For now, simulate the response
    const checkoutRequestId = "ws_CO_" + Date.now();

    return {
      success: true,
      checkoutRequestId,
      message: `STK push sent to ${input.phoneNumber} for KES ${input.amount}. Check your phone to enter M-Pesa PIN.`,
      service: input.service,
      accountNumber: input.accountNumber,
    };
  }
}
