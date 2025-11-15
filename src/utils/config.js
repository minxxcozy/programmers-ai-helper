(function (global) {
    const PAH = global.PAH || (global.PAH = {});

    PAH.config = {
        PROJECT_NAME: "Programmers AI Helper",
        MODEL: "gpt-4o-mini",
        API_ENDPOINT: "https://api.openai.com/v1/chat/completions",
        // API 키 입력
        OPENAI_API_KEY: "YOUR_OPENAI_API_KEY",
        TIMEOUT_MS: 20000
    };
})(typeof window !== "undefined" ? window : this);
