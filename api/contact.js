// redeploy bump

export default async function handler(req, res) {
  // Solo permitimos POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Reenviamos los datos a Zapier (server-side, sin CORS)
    const zapierResponse = await fetch(
      "https://hooks.zapier.com/hooks/catch/25300476/usph5ce/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    if (!zapierResponse.ok) {
      throw new Error("Zapier request failed");
    }

    return res.status(200).json({
      success: true,
      message: "Form sent successfully",
    });
  } catch (error) {
    console.error("API /contact error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}
