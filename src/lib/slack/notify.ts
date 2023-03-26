import fetch from "node-fetch";

const WEBHOOK_URI = process.env.SLACK_WEBHOOK_URI;

export const notifySlack = async (text: string): Promise<void> => {
  if (!WEBHOOK_URI) {
    throw new Error("SLACK_WEBHOOK_URI is not defined");
  }

  const method = "POST";
  const body = JSON.stringify({ text });
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(WEBHOOK_URI, { method, body, headers });

  if (res.status !== 200) {
    throw new Error("Slack notification failed");
  }
};
