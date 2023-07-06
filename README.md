# TheJulge

<div>
  <a href="https://www.npmjs.com/package/npm"><img alt="npm Version" src="https://img.shields.io/badge/npm@latest-v9.6.6-CB3837?&logo=npm&logoColor=CB3837"></a>
  <a href="https://www.npmjs.com/package/react"><img alt="React npm Version" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=React&logoColor=61DAFB"></a>
  <a href="https://www.npmjs.com/package/next"><img alt="Next.js npm Version" src="https://img.shields.io/badge/Next.js-v13.4.7-000000?logo=Next.js&logoColor=000000"></a>
  <a href="https://www.npmjs.com/package/sass"><img alt="Sass npm Version" src="https://img.shields.io/badge/Sass-v1.63.6-CC6699?logo=sass&logoColor=#CC6699"></a>
</div>

더줄게(The Julge)는 긴급 구인구직을 간편하게 할 수 있는 플랫폼 서비스입니다.

## 배포 주소

이 어플리케이션은 [https://www.thejulge.com](https://www.thejulge.com)에서 접속할 수 있습니다.

## 프로젝트 구조
```
thejulge
├─ .eslintignore
├─ .eslintrc.json
├─ LICENSE
├─ README.md
├─ app
│  ├─ api
│  │  └─ route.ts
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ SpoqaHanSansNeo-Bold.woff
│  │  └─ SpoqaHanSansNeo-Regular.woff
│  ├─ layout.tsx
│  ├─ page.module.scss
│  └─ page.tsx
├─ components
├─ constants
├─ hooks
├─ next-sitemap.config.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ public
├─ styles
│  ├─ globals.scss
│  └─ local.font.ts
├─ tsconfig.json
├─ types
└─ utils

```

- app/: Next 앱 라우터 파일을 저장하는 디렉토리
- components/: React 컴포넌트를 저장하는 디렉토리
- constants/: 상수를 저장하는 디렉토리
- hooks/: 커스텀 훅 함수를 저장하는 디렉토리
- public/: 정적 파일(이미지 파일, robots, sitemap 등)을 저장하는 디렉토리
- styles/: 글로벌 스타일 관련 파일을 저장하는 디렉토리 
- types/: 타입과 관련된 파일을 저장하는 디렉토리
- utils/: 함수를 저장하는 디렉토리

## 라이센스

이 프로젝트는 MIT Licence에 따라 라이센스가 부여됩니다. 자세한 내용은 LICENSE.md 파일을 참조하십시오.

## 진행 상황

[x] 보일러 플레이트
[x] 린트 설정
[ ] 라이브러리 설치
[ ] 랜딩 페이지 작성
