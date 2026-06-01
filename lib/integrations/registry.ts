export const integrationRegistry = [
  {
    id: "slack",
    displayName: "Slack",
    authType: "oauth2",

    triggers: [
      "created",
      "updated",
      "status_changed",
    ],

    actions: [
      "send_message",
      "send_dm",
      "post_block",
    ],
  },

  {
    id: "whatsapp",
    displayName: "WhatsApp",

    authType: "api_key",

    triggers: [
      "created",
      "updated",
      "status_changed",
    ],

    actions: [
      "send_template_message",
      "send_notification",
    ],
  },

  {
    id: "gmail",
    displayName: "Gmail",

    authType: "oauth2",

    triggers: [
      "created",
      "updated",
    ],

    actions: [
      "send_email",
      "create_calendar_event",
    ],
  },

  {
    id: "stripe",
    displayName: "Stripe",

    authType: "api_key",

    triggers: [
      "payment_created",
      "subscription_created",
    ],

    actions: [
      "create_customer",
      "charge_customer",
      "refund",
    ],
  },

  {
    id: "webhook",
    displayName: "Webhook",

    authType: "webhook_secret",

    triggers: [
      "created",
      "updated",
      "deleted",
    ],

    actions: [
      "post_payload",
    ],
  },
];