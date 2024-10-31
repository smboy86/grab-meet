### 이게 얼마만에 시작이냐...

# 남은 할 일

- [ ] 디폴트 이미지 &check;
- [ ] 달력 선택시 값 제어
- [ ] reactQuery + supabase :: https://supabase.com/blog/react-query-nextjs-app-router-cache-helpers
  - https://www.youtube.com/watch?v=QTZTUrAbjeo&t=49s
- [ ] 헤더 하단 마진

# 프로젝트 구성 해야할 것

- [ ] 레이아웃 - Container, Wrap 설정
- [ ] 폰트 설치
- [ ] 스토어 평점주기
- [ ] 웹에서 접근 가능한 페이지 구현

# 미팅을 잡자

# 개발 지식

### tailwind theme 잡는 법

1. global 에서 색상 추가 hsl 코드로 추가한다

- vscode 확장자로 색상을 바로 볼 수 있기 때문
- original은 hsl 없이 표되 있다.

2. tailwind.config.js 에서 색상 코드 추가

- extend 구문의 색상을 추가할 수 있다.
- brand: 'var(--brand)', 기존과 다르게 hsl 없이 기입한다 (global.css 에서 이미 넣었기 때문)

3. 그리고 테스트
