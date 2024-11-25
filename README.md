### 이게 얼마만에 시작이냐...

# 남은 할 일

- [ ] 디폴트 이미지 &check;
- [ ] 달력 선택시 값 제어
- [ ] reactQuery + supabase :: https://supabase.com/blog/react-query-nextjs-app-router-cache-helpers
  - https://www.youtube.com/watch?v=QTZTUrAbjeo&t=49s
- [ ] 헤더 하단 마진
- [ ] Alert 다이얼로그 컴포넌트화, 화면에 너무 많은 코드 차지

# 프로젝트 구성 해야할 것 (반복 적인 꼭지들)

- [ ] 레이아웃 - Container, Wrap 설정
- [ ] 폰트 설치 -
- [ ] 스토어 평점주기
- [ ] 웹에서 접근 가능한 페이지 구현
- [ ] 슈퍼베이스 + react query
- [ ] 리스트 줌 투 리프레쉬
- [ ] 웹 배포 및 셀프 호스팅
- [ ] 앱아이콘 & 스플래시 이미지

# 잡아야 하는 오류

- [ ] expo router = '/' 으로 이동하면 빈 페이지가 보여지는 문제
- [ ] 이미지 초기 로딩 네모난 산 모양
- [x] WEB 일때 다크모드? 혹은 기기 오토로 되어 있어서 강제 설정이 필요할듯
- [ ] Web 일때 헤더가 양 끝에 있어서 가운데로 몰아야함
- [ ] WEB 일때 참여하기 외에 다른 경로 막는 부분 처리 (빈페이지? 접근 불가?)
- [ ] Invaild 토큰 오류, auth 쪽 어딘가에 토큰 검증하는 부분에서 err log가 찍히는 것 같다.

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

# 웹 배포 방법

1. $ npm run export -p web
2. dist 폴더를 시놀로지 docker/serve/ 폴더 안으로 모두 복사 덮어 쓰기
