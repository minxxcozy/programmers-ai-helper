(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    const dom = PAH.dom;
    const utils = PAH.utils;
    const logger = PAH.logger || console;

    function getTemplate(lang) {
        switch (lang) {
            case "python":
                return `def solution():
    # TODO: 여기에 코드를 작성하세요.
    pass
`;
            case "cpp":
                return `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // TODO: 입력을 읽고 문제를 해결하세요.

    return 0;
}
`;
            case "java":
                return `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        // TODO: 입력을 읽고 문제를 해결하세요.
    }
}
`;
            case "javascript":
                return `function solution() {
    // TODO: 여기에 코드를 작성하세요.
}

`;
            default:
                return "// TODO: 언어 템플릿을 지원하지 않습니다.\n";
        }
    }

    function insertTemplate() {
        const editor = dom.getEditorElement();
        if (!editor) {
            utils.showToast("에디터를 찾을 수 없습니다.");
            return;
        }

        const lang = dom.getLanguage();
        logger.log("Inserting template for language:", lang);
        const template = getTemplate(lang);

        // textarea 기준
        editor.value = template;
        utils.showToast(`템플릿 삽입 완료 (${lang})`);
    }

    PAH.template = { insertTemplate };
})(typeof window !== "undefined" ? window : this);
