// ==UserScript==
// @name         Programmers AI Helper
// @namespace    http://tampermonkey.net/
// @version      1.1
// @match        https://school.programmers.co.kr/*
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {

    function renderMarkdown(md) {
        if (!md) return "";
        var h = md;
        h = h.replace(/^### (.*)$/gim, "<h3>$1</h3>");
        h = h.replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>");
        h = h.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
        h = h.replace(/\n/g, "<br>");
        return h;
    }

    function injectPanel() {
        if (document.getElementById("pah-panel")) return;

        const style = document.createElement("style");
        style.textContent = `
#pah-panel {
    position: fixed;
    top: 80px;
    right: 20px;
    width: 380px;
    background: #111;
    color: #fff;
    padding: 12px;
    font-size: 13px;
    border-radius: 10px;
    z-index: 999999;
}
#pah-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#pah-body {
    margin-top: 10px;
    display: block;
}
.pah-btn {
    padding: 6px 10px;
    background: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.pah-btn:hover { background:#666; }

#pah-collapsed-body {
    display: none;
}
`;
        document.head.appendChild(style);

        const html = `
            <div id="pah-header">
                <span style="font-size:16px;font-weight:bold;">Programmers AI Helper</span>
                <button id="pah-toggle" class="pah-btn">접기</button>
            </div>

            <div id="pah-body">
                <div style="display:flex; gap:6px; margin-bottom:8px;">
                    <button id="pah-summary" class="pah-btn">요약</button>
                    <button id="pah-hint" class="pah-btn">힌트</button>
                    <button id="pah-testcase" class="pah-btn">테스트</button>
                    <button id="pah-template" class="pah-btn">템플릿</button>
                    <button id="pah-resetkey" class="pah-btn" style="background:#700;">키초기화</button>
                </div>

                <div id="pah-output" style="
                    height:260px;
                    overflow-y:auto;
                    background:#000;
                    padding:10px;
                    border-radius:8px;
                    border:1px solid #333;
                ">AI 응답이 표시됩니다.</div>
            </div>
        `;

        const panel = document.createElement("div");
        panel.id = "pah-panel";
        panel.innerHTML = html;
        document.body.appendChild(panel);

        document.getElementById("pah-toggle").onclick = function() {
            const body = document.getElementById("pah-body");
            const collapsed = body.style.display === "none";

            if (collapsed) {
                body.style.display = "block";
                this.textContent = "접기";
            } else {
                body.style.display = "none";
                this.textContent = "펼치기";
            }
        };
    }

    function getProblemText() {
        const e1 = document.querySelector(".guide-section");
        const e2 = document.querySelector(".challenge-markdown");
        const e3 = document.querySelector(".challenge-section");
        const el = e1 || e2 || e3;
        if (!el) return "";
        return String(el.innerText).trim();
    }

    async function askGPT(promptText) {
        var key = localStorage.getItem("pah_api_key");
        if (!key) {
            key = prompt("OpenAI API Key 입력:");
            if (!key) return "";
            localStorage.setItem("pah_api_key", key);
        }

        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + key
            },
            body: JSON.stringify({
                model:"gpt-4o-mini",
                messages:[{role:"user", content: promptText}]
            })
        });

        const j = await r.json();
        if (!j.choices) return "";
        return j.choices[0].message.content;
    }

    function bindEvents() {
        const out = document.getElementById("pah-output");

        document.getElementById("pah-summary").onclick = async function() {
            const t = getProblemText();
            out.innerHTML = "요약 생성 중...";
            const res = await askGPT("문제를 요약해줘:\n\n" + t);
            out.innerHTML = renderMarkdown(res);
        };

        document.getElementById("pah-hint").onclick = async function() {
            const t = getProblemText();
            out.innerHTML = "힌트 생성 중...";
            const res = await askGPT("힌트를 줘:\n\n" + t);
            out.innerHTML = renderMarkdown(res);
        };

        document.getElementById("pah-testcase").onclick = async function() {
            const t = getProblemText();
            out.innerHTML = "테스트케이스 생성 중...";
            const res = await askGPT("테스트케이스를 만들어줘:\n\n" + t);
            out.innerHTML = renderMarkdown(res);
        };

        document.getElementById("pah-template").onclick = function() {
            const m = unsafeWindow.monaco;
            if (!m || !m.editor) {
                out.innerHTML = "에디터 접근 불가.";
                return;
            }
            const model = m.editor.getModels()[0];
            if (!model) return;

            model.setValue("def solution():\n    pass");
            out.innerHTML = "템플릿 삽입 완료!";
        };

        document.getElementById("pah-resetkey").onclick = function() {
            localStorage.removeItem("pah_api_key");
            alert("API Key 초기화 완료.");
        };
    }

    injectPanel();
    setTimeout(bindEvents, 1200);

})();