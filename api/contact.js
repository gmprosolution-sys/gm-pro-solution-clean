export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/25300476/usph5ce/";

    const zap = await fetch(ZAPIER_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    if (!zap.ok) {
      const text = await zap.text().catch(() => "");
      return res
        .status(502)
        .json({ ok: false, error: `Zapier error: ${zap.status} ${text}` });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}
