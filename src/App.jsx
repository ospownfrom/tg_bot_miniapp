import { useEffect, useState } from "react";

export default function App() {
  const [telegramId, setTelegramId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) {
      setTelegramId(tg.initDataUnsafe.user.id);
    }
  }, []);

  const handleClick = async (day) => {
    if (!telegramId) return;

    try {
      const res = await fetch("http://localhost:3001/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegram_id: telegramId,
          day: day
        }),
      });

      if (res.ok) {
        setStatus(`✅ Урок за день ${day + 1} отправлен!`);
      } else {
        setStatus("❌ Ошибка при отправке");
      }
    } catch (err) {
      setStatus("⚠️ Сервер не отвечает");
    }
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Контент-Фабрика</h1>
      <p>Ваш Telegram ID: <b>{telegramId || "..."}</b></p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{ padding: '10px', background: '#6D28D9', color: '#fff', border: 'none', borderRadius: '8px' }}
          >
            День {i + 1}
          </button>
        ))}
      </div>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}
