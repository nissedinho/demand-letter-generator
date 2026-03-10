import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      disputeType,
      amount,
      description,
      deadline,
    } = body;

    if (!senderName || !recipientName || !disputeType || !amount || !description) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const prompt = `Write a professional demand letter with the following details:

Date: ${today}
Sender: ${senderName}${senderAddress ? `, ${senderAddress}` : ""}
Recipient: ${recipientName}${recipientAddress ? `, ${recipientAddress}` : ""}
Dispute Type: ${disputeType}
Amount Demanded: $${parseFloat(amount).toFixed(2)}
Response Deadline: ${deadline} days from the date of this letter
Description of Dispute: ${description}

Requirements:
- Use a formal, professional tone
- Include the date, sender info, and recipient info at the top
- Clearly state the demand and the amount owed
- Reference the specific facts described above
- Include a clear deadline for response
- Mention that failure to respond may result in further legal action including small claims court
- End with a professional closing
- Do NOT include any placeholder brackets like [Your Name] — use the actual names provided
- Output only the letter text, no extra commentary`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const letter = message.content[0].text;

    return Response.json({ letter });
  } catch (err) {
    console.error("Generation error:", err);
    return Response.json(
      { error: "Failed to generate letter. Please try again." },
      { status: 500 }
    );
  }
}
