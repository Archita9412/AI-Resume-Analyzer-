import Chat from "../models/chat.model.js";

export const chat = async (req, res) => {
  const { message, resumeText } = req.body;

  const reply = await askAI(message, resumeText);

  const chat = await Chat.findOneAndUpdate(
    { userId: req.user.id },
    {
      $push: {
        messages: [
          { role: "user", content: message },
          { role: "ai", content: reply },
        ],
      },
    },
    { upsert: true, new: true }
  );

  res.json({ reply });
};