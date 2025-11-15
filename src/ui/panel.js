(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const utils = PAH.utils;

    PAH.ui = PAH.ui || {};

    // Tampermonkey용 CSS 인라인 적용
    function injectCss() {
        if (document.getElementById("pah-style")) return;
        const css = `
#pah-panel{position:fixed;top:80px;right:20px;width:280px;background:#1e1e1e;color:#ffffff;padding:12px 14px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.4);z-index:99999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px;}
#pah-panel h3{margin:0 0 8px;font-size:14px;}
#pah-panel button{margin:2px 4px 4px 0;padding:4px 8px;border-radius:6px;border:none;background:#3a3a3a;color:#fff;cursor:pointer;font-size:12px;}
#pah-panel button:hover{background:#555;}
#pah-output{margin-top:6px;max-height:260px;overflow:auto;white-space:pre-wrap;background:#111;padding:6px;border-radius:6px;}
#pah-status{font-size:11px;opacity:0.8;margin-top:4px;}
`;
        const style = document.createElement("style");
        style.id = "pah-style";
        style.textContent = css;
        document.head.appendChild(style);
    }

    PAH.ui.createPanel = function () {
        injectCss();
        if (document.getElementById("pah-panel")) return;

        const container = utils.createEl("div", { id: "pah-panel" }, [
            utils.createEl("h3", {}, ["Programmers AI Helper"]),
            utils.createEl("div", {}, [
                utils.createEl("button", { id: "pah-btn-summary" }, ["문제 요약"]),
                utils.createEl("button", { id: "pah-btn-hint" }, ["힌트"]),
                utils.createEl("button", { id: "pah-btn-testcase" }, ["테스트케이스"]),
                utils.createEl("button", { id: "pah-btn-template" }, ["템플릿 삽입"])
            ]),
            utils.createEl("div", { id: "pah-status" }, ["대기 중"]),
            utils.createEl("pre", { id: "pah-output" }, ["여기에 결과가 표시됩니다."])
        ]);

        document.body.appendChild(container);
    };

    PAH.ui.setStatus = function (text) {
        const el = document.getElementById("pah-status");
        if (el) el.textContent = text;
    };

    PAH.ui.setOutput = function (text) {
        const el = document.getElementById("pah-output");
        if (el) el.textContent = text;
    };
})(typeof window !== "undefined" ? window : this);
