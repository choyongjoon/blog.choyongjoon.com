---
title: 'Git 노하우'
date: '2019-07-01'
spoiler: '효율적이면서도 실수를 줄이고 공동 작업자와 원활히 소통을 하는 노하우'
---

Git을 잘 사용하기 위해 중요한 것들을 정리했다. 효율적이면서도 실수를 줄이고 공동 작업자와 원활히 소통을 하는 것을 목표로 했다.

## 잔일 줄이기

### Alias를 사용하자.

자주 사용하는 명령어들을 alias를 이용해서 빠르게 입력할 수 있다. 아래의 예시는 내가 사용하는 것인데, 참고해서 자신에게 맞는 alias를 만들어두자. 그리고 Gist 같은 곳에 저장해서 Alias가 설정되지 않는 곳에서 개발할 때 쉽게 설정할 수 있도록 하자.

```
[alias]
        b = branch
        f = fetch
        l = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit
        s = status -s
        a = add
        c = commit
        ch = checkout
        rb = rebase
        p = pull
        sh = show
```

### 에디터의 Git 기능을 최대한 활용하자.

기본 CLI 보다 에디터의 GUI를 통해 더 정보를 쉽게 파악할 수 있을 때가 많다. 최근에는 많은 에디터가 훌륭한 Git 기능을 제공한다. 더 나아가 GitKraken과 같은 Git 전용 도구를 활용하는 것도 고려해보자.

VS Code에는 ‘Source Control’ 사이드 바를 기본적으로 제공한다. 현재 작업중인 현황을 diff로 보고, commit할 파일을 add하는 용도로 활용할 수 있다. Git Lens와 같은 확장 기능은 더 강력한 기능을 제공하는데, 이에 대해서는 뒤에서 설명할 것이다.

### 반복적인 작업은 스크립트를 만들자.

예를 들어 버전을 올릴 때, commit, push, tag 등 여러 Git 명령을 사용해야 한다면 스크립트로 만들어서 매번 하나씩 입력하지 않도록 하자. 이 때 Shell Script를 사용하기 보다는 자신과 팀이 가장 익숙한 언어로 작성해야 만들기도 쉽고 관리하기도 편하다. JavaScript가 주 언어라면 [ShellJS](http://adilapapaya.com/docs/shelljs/)를 추천한다.

## git-branch, git-checkout

### branch 이름을 규칙에 맞게 작성하자.

branch 이름에 대한 규칙은 다양한 것이 많아서 여기서 소개하지는 않으려고 한다. 다만 팀에 규칙이 없다면 만들어야 하고, 규칙이 있다면 지켜야 한다. 그래야 프로젝트의 branch들을 체계적으로 관리할 수 있다.

### 사용하지 않는 branch를 정리하자.

오래 방치된 branch는 지워도 되는 것인지 아닌지 기억해내기 어렵다. 그렇게 되기 전에 미리 지우자. master에 merge된 것은 `git branch -d`로 지울 수 있고, 그렇지 않은 것은 `git branch -D`로 지울 수 있다.

### `git checkout -`

바로 전에 있던 branch로 돌아가는 명령이다. branch를 왔다갔다 해야할 때 사용하면 편리하다.

## git-add

### `git add` 하기 전에 한번 살펴보자.

commit될 내용을 한번 되돌아보면 코딩할 때 발견하지 못했던 문제를 발견하고 수정할 수 있다. VS Code의 ‘Source Control’ 사이드 바에서는 staged-changes, changes 에 속한 파일들의 목록을 볼 수 있고, 파일을 선택하면 어떤 변경 사항이 있는지 좌우 비교해서 보여줘서 편리하다. 버튼 클릭으로 이 중에서 원하는 파일만 add하고, 다시 되돌릴 수도 있다.

CLI에서는 `git add -p`를 사용할 수 있다. 이 명령의 장점은 한 파일 내에서도 일부 변경 사항만 add할 수 있다는 것이다. 예를 들어 한 파일 내에서 새로운 기능도 추가하고 오타도 수정했다면, 두 부분을 다른 commit으로 분리하여 더욱 깔끔하게 정리할 수 있다.

리뷰를 생략한 채 한번에 `git add`를 하는 방법들( `git add .` `git commit -a`)이 있다. 간편하지만 안 좋은 습관이므로 사용하지 않는 것이 좋다.

## git-commit

### commit을 자주 하자.

Git에서 한번 commit된 내용은 프로젝트 내 .git 디렉토리가 삭제되지 않는다면 어떻게든 다시 되돌릴 수 있다. 따라서 작업이 다 끝나지 않았더라도 commit을 하는 것이 좋다.

예를 들어 기능 개발을 하다가 갑자기 급한 버그 수정을 해야할 때에는 변경 사항을 commit하고, 새 브랜치로 이동해서 버그 수정을 하면 된다. 이 때 commit명 앞에 ‘WIP: ’와 같이 아직 진행중이라는 표시를 해두면, 나중에 돌아와서 쉽게 알아볼 수 있다. `git stash`를 사용할 수도 있지만 안 쓰는 것이 좋다. history에 남는 것이 아니기 때문에 stash를 했었는지 잊어버릴 수도 있고, message를 남길 수 없기 때문에 어떤 내용이었는지 쉽게 알아볼 수 없다.

commit을 다시 찾을 때는 `git reflog`를 사용하면 된다. commit 이후에 branch가 지워지거나, rebase가 꼬이거나 등등의 불상사가 발생하더라도 찾을 수 있다.

### commit message를 에디터에서 작성하자.

`git config --global core.editor "code --wait"`을 입력하면 git commit을 했을 때 VS Code 내에서 commit message를 입력할 수 있다. 익숙한 에디터로 작성할 수 있는 것도 장점이지만, spell checker 확장 기능을 사용할 경우, 오타가 나는 것을 방지할 수 있다. 오타가 포함된 commit message를 나중에 발견했을 때의 부끄러움을 막을 수 있다.

### commit message를 규칙에 맞게 작성하자.

commit message 작성에 대해서는 [Git 커밋 메시지 작성법](https://item4.github.io/2016-11-01/How-to-Write-a-Git-Commit-Message/)을 따르자. 가장 간단하게는 Add …, Fix …처럼 대문자 동사 현재형으로 시작하기만 해도 한결 깔끔해진다. 추가로 issue 번호 등을 어떻게 넣을지 팀 내에서 규칙을 정하자.

## git-push

### push를 자주 하자.

commit된 내용은 local에서만 안전하다. 컴퓨터가 고장난다면 작업한 내용이 날아가므로 자주 push를 하는 것이 좋다. push가 다른 작업자에게 영향을 미치지 않으려면 독립된 branch를 사용해야 한다. 한 기능을 같이 개발하더라도 각각 branch에서 작업하고 merge (혹은 rebase)하자.

### push 하기 전에 정리하자.

`git rebase -i` 를 사용하면 commit 순서 바꾸기, commit message 수정, commit 합치기 등을 한번에 할 수 있다. 사용법이 낯설 수 있지만, 강력한 도구이므로 꼭 익혀두자.

## git-reset

### 취소하는 명령어를 알아두자

실수로 add 했을 때, 실수로 commit했을 때 대처할 수 있는 방법을 기억해두면 편리하다.

- add 되돌리기: `git reset HEAD [file]`
- commit 되돌리기: `git reset HEAD^`

## git-blame

### GUI에서 `git blame`을 사용하자.

각 줄을 누가 어떤 commit으로 수정했는지 확인할 수 있는 `git blame`은 유용한 경우가 많다. 코드가 왜 이렇게 되었는지 해당 commit을 찾아가 확인해볼 수도 있고, 이 코드를 누구에게 물어봐야하는지 알 수도 있다. 하지만 CLI에서는 매우 불편하므로 GUI에서 확인하자.

VS Code의 Git Lens 확장 기능은 현재 커서가 있는 줄에 수정한 사람, 수정 시점, commit messsage를 바로 보여준다. 또한 사이드바에서는 file history와 line history가 나와서 더 이전에 어떤 commit이 있었는지 쉽게 확인할 수 있다.
