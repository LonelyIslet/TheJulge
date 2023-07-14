# TheJulge

<div>
  <a href="https://www.npmjs.com/package/npm"><img alt="npm Version" src="https://img.shields.io/badge/npm@latest-v9.6.6-CB3837?&logo=npm&logoColor=CB3837"></a>
  <a href="https://www.npmjs.com/package/react"><img alt="React npm Version" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=React&logoColor=61DAFB"></a>
  <a href="https://www.npmjs.com/package/next"><img alt="Next.js npm Version" src="https://img.shields.io/badge/Next.js-v13.4.7-000000?logo=Next.js&logoColor=000000"></a>
  <a href="https://www.npmjs.com/package/sass"><img alt="Sass npm Version" src="https://img.shields.io/badge/Sass-v1.63.6-CC6699?logo=sass&logoColor=CC6699"></a>
  <a href="https://www.npmjs.com/package/react-redux"><img alt="react-redux npm Version" src="https://img.shields.io/badge/react_redux-v8.1.1-764ABC?logo=redux&logoColor=764ABC"></a>
</div>

더줄게(The Julge)는 긴급 구인구직을 간편하게 할 수 있는 플랫폼 서비스입니다.

## 배포 주소

이 어플리케이션은 [https://www.thejulge.com](https://www.thejulge.com)에서 접속할 수 있습니다.

## 프로젝트 구조

```
thejulge
├─ .eslintignore
├─ .eslintrc.json
├─ LICENSE.md
├─ README.md
├─ app
│  ├─ api
│  │  └─ sample
│  │     └─ route.ts
│  ├─ auth
│  │  ├─ page.module.scss
│  │  ├─ page.scss
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ SpoqaHanSansNeo-Bold.woff
│  │  └─ SpoqaHanSansNeo-Regular.woff
│  ├─ layout.tsx
│  ├─ my-profile
│  │  ├─ edit
│  │  │  ├─ page.module.scss
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.module.scss
│  │  └─ page.tsx
│  ├─ page.module.scss
│  └─ page.tsx
├─ components
│  ├─ auth
│  │  ├─ AuthForm
│  │  │  ├─ AuthForm.module.scss
│  │  │  ├─ AuthForm.tsx
│  │  │  ├─ SigninForm.tsx
│  │  │  ├─ SignupForm.tsx
│  │  │  ├─ UserTypeSelect.module.scss
│  │  │  └─ UserTypeSelect.tsx
│  │  └─ index.ts
│  ├─ common
│  │  ├─ CommonBtn
│  │  │  ├─ CommonBtn.module.scss
│  │  │  └─ CommonBtn.tsx
│  │  ├─ CommonDetail
│  │  │  ├─ CommonDetail.module.scss
│  │  │  └─ CommonDetail.tsx
│  │  ├─ CommonLayout
│  │  │  ├─ CommonLayout.module.scss
│  │  │  └─ CommonLayout.tsx
│  │  ├─ CustomInput
│  │  │  ├─ CustomInput.module.scss
│  │  │  ├─ CustomInput.tsx
│  │  │  └─ UserInput.tsx
│  │  ├─ Dropdown
│  │  │  ├─ Dropdown.module.scss
│  │  │  └─ Dropdown.tsx
│  │  ├─ Filter
│  │  │  ├─ Filter.module.scss
│  │  │  └─ Filter.tsx
│  │  ├─ GlobalFooter
│  │  │  ├─ GlobalFooter.module.scss
│  │  │  └─ GlobalFooter.tsx
│  │  ├─ GlobalNav
│  │  │  ├─ GlobalNav.module.scss
│  │  │  └─ GlobalNav.tsx
│  │  ├─ Modal
│  │  │  ├─ Modal.module.scss
│  │  │  ├─ Modal.tsx
│  │  │  └─ ModalPortal.tsx
│  │  ├─ NoticeCard
│  │  │  ├─ NoticeCard.module.scss
│  │  │  └─ NoticeCard.tsx
│  │  ├─ NotificationBoard
│  │  │  ├─ NotificationBoard.module.scss
│  │  │  └─ NotificationBoard.tsx
│  │  ├─ Pagination
│  │  │  ├─ Pagination.module.scss
│  │  │  └─ Pagination.tsx
│  │  ├─ Popover
│  │  │  └─ Popover.tsx
│  │  ├─ PostCard
│  │  │  ├─ CustomArrow
│  │  │  │  └─ CustomArrow.tsx
│  │  │  ├─ PostCard.module.scss
│  │  │  └─ PostCard.tsx
│  │  ├─ SearchBar
│  │  │  ├─ SearchBar.module.scss
│  │  │  └─ SearchBar.tsx
│  │  ├─ ShopCard
│  │  │  ├─ ShopCard.module.scss
│  │  │  └─ ShopCard.tsx
│  │  ├─ StatusChip
│  │  │  ├─ StatusChip.module.scss
│  │  │  └─ StatusChip.tsx
│  │  ├─ Table
│  │  │  ├─ Table.module.scss
│  │  │  └─ Table.tsx
│  │  ├─ Toast
│  │  │  ├─ Toast.module.scss
│  │  │  ├─ Toast.tsx
│  │  │  ├─ ToastPortal.tsx
│  │  │  └─ ToastRoot.tsx
│  │  └─ index.ts
│  ├─ employee
│  │  ├─ EditProfile
│  │  │  ├─ EditProfile.module.scss
│  │  │  └─ EditProfile.tsx
│  │  └─ index.ts
│  ├─ employer
│  │  └─ index.ts
│  ├─ index.ts
│  └─ notice
│     ├─ EmployeeTable
│     │  └─ EmployeeTable.tsx
│     ├─ EmployerTable
│     │  └─ EmployerTable.tsx
│     └─ index.ts
├─ constants
│  ├─ mock
│  │  ├─ alerts.json
│  │  └─ notice.json
│  ├─ notice
│  │  └─ table.ts
│  └─ sample.ts
├─ hooks
│  ├─ useClickOutside.ts
│  ├─ useDropdown.ts
│  ├─ useInputValidation.ts
│  ├─ useResponsiveNavbar.ts
│  └─ useToast.ts
├─ next-sitemap.config.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ data
│  │  ├─ dropdownAddress.json
│  │  └─ dropdownShopCategory.json
│  ├─ images /
│  ├─ robots.txt
│  ├─ sitemap-0.xml
│  └─ sitemap.xml
├─ redux
│  ├─ StoreProvider.tsx
│  ├─ hooks
│  │  ├─ useAppDispatch.ts
│  │  └─ useAppSelector.ts
│  ├─ slices
│  │  └─ toastSlice.ts
│  └─ store.ts
├─ styles
│  ├─ globals.scss
│  ├─ local.font.ts
│  ├─ mixins.scss
│  └─ variables.scss
├─ tsconfig.json
├─ types
│  ├─ dto.ts
│  ├─ enums
│  │  ├─ apply.enum.ts
│  │  ├─ button.enum.ts
│  │  ├─ detailPage.enum.ts
│  │  ├─ inputValidation.enum.ts
│  │  ├─ modal.enum.ts
│  │  └─ user.enum.ts
│  ├─ global.d.ts
│  ├─ notice
│  │  └─ table.d.ts
└─ utils
   ├─ calculatePercentage.ts
   ├─ formatTimeRange.ts
   ├─ getBgColorClass.ts
   ├─ inputValidation.ts
   └─ showElapsedTime.ts

```

- app/: Next 앱 라우터 파일을 저장하는 디렉토리
- app/api/: Next api　라우터 파일을 저장하는 디렉토리
- components/: React 컴포넌트를 저장하는 디렉토리
- constants/: 상수를 저장하는 디렉토리
- hooks/: 커스텀 훅 함수를 저장하는 디렉토리
- public/: 정적 파일(이미지 파일, robots, sitemap 등)을 저장하는 디렉토리
- redux/: 리덕스 관련 파일을 저장하는 디렉토리
- styles/: 글로벌 스타일 관련 파일을 저장하는 디렉토리 
- types/: 타입과 관련된 파일을 저장하는 디렉토리
- utils/: 함수를 저장하는 디렉토리

## 라이센스

이 프로젝트는 MIT Licence에 따라 라이센스가 부여됩니다. 자세한 내용은 LICENSE.md 파일을 참조하십시오.

## 진행 상황

- [x] 보일러 플레이트
- [x] 린트 설정
- [x] 라이브러리 설치
- [x] public assets 추출
- [x] 랜딩 페이지 작성
- [ ] 리소스 완성
- [ ] 공고 페이지 완성
- [ ] 가게 정보 상세 페이지 완성
- [ ] 가게 정보 등록/수정 페이지 완성
- [ ] 공고 등록/수정 페이지 완성
- [ ] 사장/공고 상세 페이지 완성
- [ ] 알바/공고 상세 페이지 완성
- [ ] 내 프로필 상세 페이지 완성
- [ ] 내 프로필 등록/수정 페이지 완성
- [ ] 퍼포먼스 확인 및 리팩토링
