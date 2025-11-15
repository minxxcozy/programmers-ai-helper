(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const utils = PAH.utils || {};
    const logger = PAH.logger || console;

    PAH.dom = {
        getProblemTitle() {
            // 프로그래머스 제목 영역 추정 선택자
            const el = document.querySelector("h4.challenge-title, h2, .challenge-title");
            return utils.safeText(el);
        },

        getProblemText() {
            // 문제 본문: 프로그래머스는 보통 .guide-section 이나 .challenge-markdown
            const main = document.querySelector(".guide-section, .challenge-markdown, .challenge-section");
            return utils.safeText(main);
        },

        getLanguage() {
            // 언어 탭에서 현재 선택된 텍스트 찾기 (사이트 구조에 맞춰 나중에 튜닝 가능)
            const activeTab =
                document.querySelector('[role="tab"][aria-selected="true"]') ||
                document.querySelector(".language_name.selected") ||
                document.querySelector(".language-tab.is_active");
            const langText = utils.safeText(activeTab).toLowerCase();

            if (langText.includes("python")) return "python";
            if (langText.includes("c++")) return "cpp";
            if (langText.includes("java")) return "java";
            if (langText.includes("javascript") || langText.includes("node")) return "javascript";
            return "python"; // default
        },

        getEditorElement() {
            // 단순 textarea 기준. 만약 CodeMirror/Monaco면 나중에 확장
            const textarea = document.querySelector("textarea");
            if (textarea) return textarea;

            // 예: Monaco Editor 대응 (inner textarea)
            const monaco = document.querySelector(".monaco-editor textarea, .code-area textarea");
            if (monaco) return monaco;

            logger.log("Editor element not found, returning null");
            return null;
        }
    };
})(typeof window !== "undefined" ? window : this);
