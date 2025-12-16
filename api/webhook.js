import fetch from "node-fetch";

const BOT_TOKEN = process.env.BOT_TOKEN;

// 🚫 Bad words list (you can edit later)
const BAD_WORDS = ["fuck", "shit", "bitch", "asshole"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("FH NoBadWords Bot is running");
  }

  const update = req.body;

  if (!update.message || !update.message.text) {
    return res.status(200).end();
  }

  const text = update.message.text.toLowerCase();
  const chatId = update.message.chat.id;
  const messageId = update.message.message_id;

  for (const word of BAD_WORDS) {
    if (text.includes(word)) {
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/deleteMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId
          })
        }
      );
      break;
    }
  }

  res.status(200).end();
    }
