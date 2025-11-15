(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const ui = PAH.ui;
    const dom = PAH.dom;
    const ai = PAH.ai;
    const template = PAH.template;
    const logger = PAH.logger || console;

    function bindEvents() {
        const btnSummary = document.getElementById("pah-btn-summary");
        const btnHint = document.getElementById("pah-btn-hint");
        const btnTC = document.getElementById("pah-btn-testcase");
        const btnTpl = document.getElementById("pah-btn-template");

        if (!btnSummary || !btnHint || !btnTC || !btnTpl) {
            logger.error("Buttons not found in panel");
            return;
        }

        btnSummary.addEventListener("click", async () => {
            try {
                ui.setStatus("요약 생성 중...");
                const text = dom.getProblemText();
                if (!text) {
                    ui.setOutput("문제 텍스트를 찾을 수 없습니다.");
                    ui.setStatus("대기 중");
                    return;
                }
                const res = await ai.getSummary(text);
                ui.setOutput(res);
                ui.setStatus("완료");
            } catch (e) {
                ui.setOutput("에러 발생: " + e.message);
                ui.setStatus("에러");
            }
        });

        btnHint.addEventListener("click", async () => {
            try {
                ui.setStatus("힌트 생성 중...");
                const text = dom.getProblemText();
                if (!text) {
                    ui.setOutput("문제 텍스트를 찾을 수 없습니다.");
                    ui.setStatus("대기 중");
                    return;
                }
                const res = await ai.getHint(text);
                ui.setOutput(res);
                ui.setStatus("완료");
            } catch (e) {
                ui.setOutput("에러 발생: " + e.message);
                ui.setStatus("에러");
            }
        });

        btnTC.addEventListener("click", async () => {
            try {
                ui.setStatus("테스트케이스 생성 중...");
                const text = dom.getProblemText();
                if (!text) {
                    ui.setOutput("문제 텍스트를 찾을 수 없습니다.");
                    ui.setStatus("대기 중");
                    return;
                }
                const res = await ai.getTestcases(text);
                ui.setOutput(res);
                ui.setStatus("완료");
            } catch (e) {
                ui.setOutput("에러 발생: " + e.message);
                ui.setStatus("에러");
            }
        });

        btnTpl.addEventListener("click", () => {
            ui.setStatus("템플릿 삽입 중...");
            template.insertTemplate();
            ui.setStatus("완료");
        });
    }

    function init() {
        // 프로그래머스 문제 페이지에만 붙이고 싶으면 URL 체크 추가 가능
        ui.createPanel();
        bindEvents();
        logger.log("Programmers AI Helper initialized");
    }

    // Tampermonkey 환경에서는 DOM 로드 후 실행
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    PAH.main = { init };
})(typeof window !== "undefined" ? window : this);
