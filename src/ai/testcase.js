(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const prompts = PAH.prompts;
    const api = PAH.api;

    PAH.ai = PAH.ai || {};

    PAH.ai.getTestcases = async function (problemText) {
        const prompt = prompts.buildTestcasePrompt(problemText);
        return api.askAI(prompt);
    };
})(typeof window !== "undefined" ? window : this);
