/**
 * Service to dispatch automated webhook events to n8n workflows.
 * Used for automated personalized AI emails, Slack/Teams internal alerts, and CRM integrations.
 */

export interface WebhookEventPayload {
  event_type: "consultation.created" | "contact.created" | "enrollment.created" | "newsletter.created";
  record_id?: string;
  data: Record<string, any>;
  timestamp: string;
}

export async function triggerN8nWebhook(payload: WebhookEventPayload): Promise<boolean> {
  const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (!n8nWebhookUrl) {
    console.info(
      `[n8n Automation] Webhook event '${payload.event_type}' logged locally. ` +
      `Configure VITE_N8N_WEBHOOK_URL in .env to enable automated AI email workflows.`
    );
    return false;
  }

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SAFAL-Event": payload.event_type,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[n8n Webhook Error] Failed with status ${response.status}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[n8n Webhook Error] Exception while triggering automation:", err);
    return false;
  }
}
