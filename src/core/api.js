(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const config = PAH.config;
    const logger = PAH.logger || console;

    async function askAI(prompt) {
        // TODO: 여기서 실제 GPT API 붙이면 됨.
        // API 키를 스크립트에 직접 넣으면 유출 위험 있으니, 해커톤/개인용 정도로만 쓰는 걸 추천.
        if (!config.OPENAI_API_KEY || config.OPENAI_API_KEY === "YOUR_OPENAI_API_KEY") {
            logger.error("OPENAI_API_KEY가 설정되지 않았습니다.");
            throw new Error("API key not set");
        }

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), config.TIMEOUT_MS);

        try {
            const res = await fetch(config.API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: config.MODEL,
                    messages: [{ role: "user", content: prompt }]
                }),
                signal: controller.signal
            });

            clearTimeout(id);

            if (!res.ok) {
                const text = await res.text();
                logger.error("API Error:", res.status, text);
                throw new Error("API error " + res.status);
            }

            const data = await res.json();
            const content = data.choices?.[0]?.message?.content || "";
            return content.trim();
        } catch (err) {
            logger.error("askAI failed", err);
            throw err;
        }
    }

    PAH.api = { askAI };
})(typeof window !== "undefined" ? window : this);
