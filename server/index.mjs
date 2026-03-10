import "dotenv/config";
import cors from "cors";
import express from "express";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Missing OPENAI_API_KEY. Create server/.env with your key.");
  process.exit(1);
}

const client = new OpenAI({ apiKey });
const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const SYSTEM_PROMPT =
  "Эмэгтэйчүүдийн эрүүл мэндийн зөвлөгч. Зөвхөн эмэгтэйчүүдийн эрүүл мэндтэй холбоотой асуултад хариул. " +
  "Хэрэв өөр сэдэв асуувал: “Уучлаарай, би зөвхөн эмэгтэйчүүдийн эрүүл мэндийн талаар туслах зориулалттай.” гэж хариул. " +
  "Эелдэг, ойлгомжтой хариул.";

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body ?? {};
    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "message required" });
    }

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message.trim() },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return res.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "chat_failed" });
  }
});

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`Chat API running at http://localhost:${port}`);
});
