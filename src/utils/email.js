// src/utils/email.js
import emailjs from "emailjs-com";


const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


export async function sendFulfilledEmail({ to, topic, words, note }) {
if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
try {
await emailjs.send(
SERVICE_ID,
TEMPLATE_ID,
{
to_email: to,
topic,
words: String(words ?? ""),
message: note ?? "Your essay has been reviewed and fulfilled."
},
PUBLIC_KEY
);
return { ok: true };
} catch (e) {
console.error("EmailJS failed, falling back to mailto:", e);
}
}
// Fallback: open a prefilled mailto (user confirms in their client)
const subj = encodeURIComponent(`Your Essay Has Been Fulfilled – ${topic}`);
const body = encodeURIComponent(
(note ?? "Your essay has been reviewed and fulfilled.") +
`\n\nTopic: ${topic}\nWord count: ${words ?? ""}`
);
const url = `mailto:${encodeURIComponent(to)}?subject=${subj}&body=${body}`;
window.open(url, "_blank");
return { ok: true, fallback: true };
}