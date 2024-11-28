### 이게 얼마만에 시작이냐...

# 남은 할 일

- [ ] 디폴트 이미지 &check;
- [ ] 캘린더 화면 달력에 데이터 있을때 표시

# 프로젝트 구성 해야할 것 (반복 적인 꼭지들)

- [ ] 레이아웃 - Container, Wrap 설정
- [ ] 폰트 설치
- [ ] 스토어 평점주기
- [x] 웹에서 접근 가능한 페이지 구현
- [ ] 리스트 줌 투 리프레쉬
- [x] 앱아이콘 & 스플래시 이미지
- [x] reactQuery + supabase
- [x] 웹 배포 및 셀프 호스팅 - export web & 도커 serve
- [ ] 소셜로그인 - 구글, 카카오
- [ ] GIF 확인

# 잡아야 하는 오류

- [x] expo router = '/' 으로 이동하면 빈 페이지가 보여지는 문제
- [ ] 이미지 초기 로딩 네모난 산 모양
- [x] WEB 일때 다크모드? 혹은 기기 오토로 되어 있어서 강제 설정이 필요할듯
- [ ] Web 일때 헤더가 양 끝에 있어서 가운데로 몰아야함
- [ ] WEB 일때 참여하기 외에 다른 경로 막는 부분 처리 (빈페이지? 접근 불가?)
- [ ] Invaild 토큰 오류, auth 쪽 어딘가에 토큰 검증하는 부분에서 err log가 찍히는 것
      같다.
- [ ] 디테일 페이지 로드시, 비동기로 떠서 그런가, 헤더가 영어로 보였다가 없어진다.
- [ ] View 모드일때도 vaild 체크가 되어서 빨간 글씨가 보인다.

## 개선을 해보자

- [ ] 미팅 투표시, 참석자 정보 핸드폰 입력시 ###-####-#### 유효성검사 및 렌더링 처리 개선

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
