(function (global) {
    const PAH = global.PAH || (global.PAH = {});

    PAH.prompts = {
        buildSummaryPrompt(problemText) {
            return `
다음은 프로그래머스 코딩테스트 문제 설명입니다.

문제를 읽고 아래 형식으로 한국어로 5줄 이내로 요약해줘.

1) 문제 상황 한 줄
2) 입력 형식 핵심
3) 출력 형식 핵심
4) 중요한 제약 조건
5) 엣지 케이스나 주의할 점

문제 설명:
${problemText}
`;
        },

        buildHintPrompt(problemText) {
            return `
다음은 프로그래머스 코딩테스트 문제 설명입니다.
이 문제에 대해 난이도별 힌트를 3단계로 나눠서 한국어로 알려줘.

형식:
[Hint 1] 문제 분류 (예: 정렬, 해시, 구현, BFS 등)만 간단히
[Hint 2] 접근 전략 (어떻게 생각해야 하는지, 자료구조/패턴)
[Hint 3] 사용할 알고리즘/자료구조 키워드 위주로, 하지만 정답 코드는 절대 주지 말 것

문제 설명:
${problemText}
`;
        },

        buildTestcasePrompt(problemText) {
            return `
다음은 프로그래머스 코딩테스트 문제 설명입니다.
이 문제에 대해 유효한 테스트 케이스를 3~5개 만들어줘.

조건:
- 실제 프로그래머스 입출력 형식을 따라야 한다.
- 각 테스트 케이스는 "입력"과 "출력"을 명시해라.
- 작은 값, 큰 값, 엣지 케이스를 섞어서 만들어라.
- 가능한 한 코드에 바로 붙여넣어 사용할 수 있도록 깔끔한 텍스트 형식으로 제공해라.

출력 형식 예시:
[TC1]
입력:
...
출력:
...

문제 설명:
${problemText}
`;
        }
    };
})(typeof window !== "undefined" ? window : this);
