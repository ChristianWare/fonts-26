// src/components/admin/webhooks/data.ts
import { db } from "@/lib/db";

export async function getWebhookEvents(page = 1, pageSize = 25) {
  const skip = (page - 1) * pageSize;
  const [rows, total] = await Promise.all([
    db.webhookEvent.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        stripeEventId: true,
        type: true,
        status: true,
        createdAt: true,
        errorMessage: true,
      },
    }),
    db.webhookEvent.count(),
  ]);

  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  return { rows, total, lastPage };
}

export async function getWebhookEvent(id: string) {
  return db.webhookEvent.findUnique({ where: { id } });
}
