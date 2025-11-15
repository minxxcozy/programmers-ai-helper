(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const prompts = PAH.prompts;
    const api = PAH.api;

    PAH.ai = PAH.ai || {};

    PAH.ai.getHint = async function (problemText) {
        const prompt = prompts.buildHintPrompt(problemText);
        return api.askAI(prompt);
    };
})(typeof window !== "undefined" ? window : this);
