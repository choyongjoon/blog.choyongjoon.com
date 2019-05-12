---
title: 'react-hot-loader와 mobx-react-router를 같이 쓸 때 페이지 이동 오류 해결'
date: '2019-04-30'
spoiler: 'hot의 위치를 각 route로 옮겨서 해결하자'
---

이 글은 아래 버전을 기준으로 작성되었다.

```json
"mobx-react-router": "^4.0.7",
"react-hot-loader": "^4.8.0",
"react-router": "^5.0.0",
```

<br />

---

문제 현상은 다음과 같다.

1. 페이지에 속한 코드를 수정하여 HMR이 일어나도록 한다.
2. 다른 페이지로 이동하는 링크를 클릭한다.
3. 페이지 이동이 이루어지지 않고 console에 아래와 같은 warning이 나온다.

> Warning: You cannot change \<Router history\>

해결방법은 react-hot-loader의 `hot`을 각 route로 옮기는 것이다.

원래는 react-router의 `<Router />`와 MobX `<Provider />`를 포함한 최상단 component인 App에 hot을 적용했었다. 이것을 각 route (`<Route />`의 component prop으로 넘겨주는 Component)로 옮겼다. `hot`이 RouterStore가 들어가는 MobX의 `<Provider />`나, `<Router />` 상위에 적용된 것이 문제인 것 같다.

react-hot-loader의 공식 문서에서는 `hot`의 위치를 다음과 같이 추천한다. 여기에 MobX나 react-router 얘기는 없지만, redux store creation와 비슷한 경우로 생각할 수 있겠다.

---

To make RHL more reliable and safe, please place `hot` _below_ (ie somewhere in _imported_ modules):

- react-dom
- redux store creation
- any data, you want to preserve between updates
- big libraries

You may(but it's not required) place `hot` to the every route/page/feature/lazy chunk, thus make updates more scoped.

---

출처: https://github.com/gaearon/react-hot-loader#important
