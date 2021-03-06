---
title: 'Facebook.com의 새 테크 스택 살펴보기 1'
date: '2020-05-17'
spoiler: '‘기술적인 목표’와 ‘CSS’'
---

페이스북은 최근 엔지니어링 블로그의 글 ([Rebuilding our tech stack for a new Facebook.com - Facebook Engineering](https://engineering.fb.com/web/facebook-redesign/))을 통해 새로운 기술 스택을 소개했습니다. 앱과 같은 느낌과 성능을 위해 완전히 재작성하면서 고민한 것을 4가지 부분 (CSS, JavaScript (Code Splitting), data, navigation)으로 나누어서 설명하고 있습니다.

이 글에서는 ‘기술적인 목표’와 ‘CSS’ 부분을 요약해보고, 제 의견을 얘기해보려고 합니다.

## 기술적인 목표 (Technical Mantra)

- 가능한 한 작게, 가능한 한 빨리
- 사용자 경험을 위한 엔지니어링 경험

첫 번째 목표는 네트워크를 항상 고려해야 하는 웹 환경에서 꼭 신경 써야 하는 부분이죠. 두 번째 목표는 개발 도구, 라이브러리 등을 통해 엔지니어를 돕겠다는 의미로 해석했습니다.

## CSS

### Atomic CSS 도입으로 CSS 80% 줄이기

- 기존에 400KB 이상의 (압축된) CSS를 사용. CSS 크기는 계속 증가하고 거의 줄어들지 않았음.
- 빌드 시점에 Atomic CSS를 생성. 새로운 스타일 추가해도 기존과 겹치는 선언이 많기 때문에 CSS 크기가 로그 함수 형태로 완만하게 증가.
- 결과적으로 기존 크기의 20% 밖에 안되는 CSS를 다운로드함.

Atomic CSS는 Uber의 Base Web이 사용하는 Styletron을 사용해보았는데, 페이스북에서도 공개하지 않은 CSS-in-JS 라이브러리 사용하는 것으로 보입니다. CSS 용량을 줄이기에는 가장 좋은 방법이라고 생각됩니다. 다만 스타일이 조각조각 나서 브라우저에서 스타일 확인하는게 힘들었습니다. 또 Styletron의 경우 빌드 시점에 react-snap으로 생성한 클래스 이름과 런타임에 생성된 클래스 이름이 달라서 고생했던 경험이 있습니다. styled-components처럼 클래스명에 hash 값을 사용하는 것이 아니라서 발생하는 문제로 보입니다.

### 스타일을 컴포넌트 옆에 둬서 안 쓰이는 CSS 줄이기

- 스타일이 컴포넌트와 따로 떨어져 있으면 안 쓰이는 CSS가 제때 삭제되지 않음
- CSS 우선순위가 순서에 따라 달라지기 때문에 변경사항을 자동으로 패키징하기 어려움.
- 스타일 순서가 항상 안정되도록 보장함. 하위 선택자 (descendant selector) 지원하지 않음.

CSS-in-JS를 사용하기 전에도 컴포넌트 파일 옆에 scss 파일을 만들어서 관리했습니다. 이렇게 관리하지 않으면 안 쓰이는 CSS를 주기적으로 찾아주는 도구를 사용해야 합니다. 스타일 순서가 항상 안정되도록 어떻게 했는지 Facebook의 CSS-in-JS 내부 구현이 궁금해지네요.

### 더 나은 접근성을 위해 폰트 사이즈 바꾸기

- 웹 브라우저의 줌 기능을 이용해서 글씨 크기를 키울 때 원치 않는 레이아웃 문제 발생할 수 있음.
- CSS에서 rem 사용. 하지만 디자인할 때는 px이 편하므로 px을 rem으로 변환하는 도구 만들어서 사용.

개인 프로젝트에서 rem을 사용해보려고 해도 잘 적응이 안 되었는데, 역시 도구로 풀어야 하는 문제였군요. CSS-in-JS에서는 간단한 변환 함수를 만들어서 바로 적용해 볼 수 있겠네요.

### 빌드 타임 예제

- 소스 코드 예시와 그 결과로 나온 CSS, JavaScript 코드를 공개
- Facebook의 CSS-in-JS 라이브러리 이름은 ’stylex’
- `stylex.create()`로 기본 스타일과 특정 상태에 대한 스타일 그룹들을 정의함
- React 컴포넌트의 `className`에서 넣어서 사용함.
  - 이때 스타일 그룹의 순서와 적용여부를 정해줄 수 있음. 예를 들어 강조 상태의 스타일 그룹은 특정 prop이 있을 때만 적용되도록 할 수 있음.
- 생성된 CSS에서 클래스 이름은 ‘c0’, ‘c1, ’c2’와 같이 짧은 이름을 가지고 클래스 하나당 하나의 스타일 프로퍼티를 가짐 (Atomic CSS)
- 생성된 JS에는 prop에 따라 CSS 클래스가 선택되는 코드가 들어감

생성된 JS 코드를 보니 예전에 scss 파일에 다양한 클래스들을 정의하고 prop에 따라 다른 className이 들어가도록 조건문 써주던 것이 생각나네요. 원본 JS에서 stylex를 사용하는 방식은 덜 번거로워져서 좋습니다.

### 테마 (다크모드)에 CSS variables 사용

- 테마를 하나의 stylesheet로 표현 가능
- 컴포넌트 라이브러리의 크기나 복잡도가 증가해도 성능이 나빠지지 않는다.

설명을 읽어보니 CSS Variables를 사용하는 것이 styled-components 내의 테마 기능을 이용하는 것보다 더 가볍고, 스타일시트 하나만 변경해서 테마 변경을 할 수 있다는 점이 좋 아보입니다. 하지만 [IE에서 CSS Variables를 지원하지 않아](https://caniuse.com/#feat=css-variables) 일부 프로젝트에서만 사용 가능할 것 같습니다

### 자바스크립트 안에 SVG 넣어서 빠르고 한 번만 렌더링

- SVG를 `<img>` 태그를 통해서 넘기면 아이콘의 깜빡임이 발생할 수 있음
- JS에서 묶으면 깜빡임 없이 한 번에 그려짐
- 또 런타임에 추가 다운로드 없이 색상을 부드럽게 바꿀 수 있음

이건 기존에도 잘 쓰고 있던 방법이라 새롭지 않았습니다. SVG는 jsx형태로 코드에 포함하는 것이 관리하기도 편했습니다.
