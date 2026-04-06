# M-Pesa Bill Payment Agent

A Lua AI agent called **Lipa** that helps Kenyan customers check outstanding bills and pay them via M-Pesa STK push — all through a conversational interface.

## What it does

- Check outstanding bill amounts for Safaricom Postpaid, KPLC (prepaid & postpaid), and Nairobi Water
- Initiate M-Pesa STK push payments — the user gets a prompt on their phone to confirm with their PIN
- Handles phone number formatting automatically (e.g. `0712345678` → `254712345678`)
- Responds in a friendly, conversational style with occasional Swahili (Sawa, Poa, Karibu)

## Project structure

```
mpesa-payment-agent/
├── src/
│   ├── index.ts                        # Agent definition (default export)
│   └── skills/
│       ├── payment.skill.ts            # Groups the two payment tools
│       └── tools/
│           ├── CheckBalanceTool.ts     # Looks up outstanding bill amount
│           └── InitiatePaymentTool.ts  # Sends M-Pesa STK push
├── lua.skill.yaml                      # Lua platform manifest (auto-managed)
├── env.example                         # Environment variable reference
├── package.json
└── tsconfig.json
```

## Getting started

```bash
# Install dependencies
npm install

# Chat with the agent in sandbox mode
lua chat

# Test tools individually
lua test

# Deploy to production
lua push all --force --auto-deploy
```

## Tools

### `check_account_balance`

Looks up the outstanding bill for a given account and service.

| Input           | Type   | Description                                                             |
| --------------- | ------ | ----------------------------------------------------------------------- |
| `accountNumber` | string | Customer account or phone number                                        |
| `service`       | enum   | `safaricom_postpaid`, `kplc_prepaid`, `kplc_postpaid`, `nairobi_water`  |

Returns the amount due in KES and whether the account is `outstanding` or `clear`.

### `initiate_mpesa_payment`

Sends an M-Pesa STK push to the customer's phone.

| Input | Type | Description |
|-------|------|-------------|
| `phoneNumber` | `string` | M-Pesa number in format `2547XXXXXXXX` |
| `amount` | `number` | Amount in KES |
| `service` | `string` | Service being paid |
| `accountNumber` | `string` | Account number for the bill |

> **Note:** The payment tool currently simulates the STK push response. To go live, replace the `execute` body in [InitiatePaymentTool.ts](src/skills/tools/InitiatePaymentTool.ts) with a `POST` to your backend which calls the Safaricom Daraja STK Push API.

## Environment variables

Copy `env.example` to `.env` and fill in your keys:

```bash
cp env.example .env
```

The agent itself only requires the Lua platform credentials (managed via `lua env`). The `.env` file is for any backend integration you add (e.g. Daraja API keys).

## Lua CLI commands

| Command | Purpose |
|---------|---------|
| `lua chat` | Interactive chat with the agent |
| `lua test` | Test individual tools interactively |
| `lua compile` | Type-check and compile |
| `lua push` | Upload to the Lua platform |
| `lua deploy` | Deploy to production |
| `lua logs` | View execution logs |
| `lua env` | Manage environment variables |

## Resources

- [Lua documentation](https://docs.heylua.ai)
- [Safaricom Daraja API](https://developer.safaricom.co.ke/)
