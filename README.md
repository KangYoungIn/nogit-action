# nogit-action

`nogit-action`은 GitHub Actions 환경에서 `git` CLI 없이 Git 기능을 수행할 수 있도록 도와주는 GitHub 액션입니다.

Node.js 기반의 `isomorphic-git` 라이브러리를 사용하여 clone, commit, push 등을 실행합니다.

---

## 주요 특징

- Git CLI 설치 불필요
- 퍼블릭 및 프라이빗 저장소 지원
- GitHub Token(PAT) 인증 지원
- GitHub Actions 워크플로우에 최적화

---

## 주요 사용처

- Git CLI가 설치되지 않은 커스텀 GitHub Actions 러너 환경에서 Git 작업이 필요한 경우
- Docker 이미지나 WASM 기반 런타임 등에서 Git 명령을 CLI 없이 수행해야 할 때
- CI/CD 파이프라인 중 특정 단계에서 `clone`, `commit`, `push` 작업이 필요한 경우
- 보안 상 이유로 git 바이너리를 설치할 수 없는 환경
- GitHub Actions 내에서 Node.js 환경만으로 Git 관련 자동화를 하고자 할 때

---

## 사용 예시

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: nogit-action으로 저장소 클론
        uses: KangYoungIn/nogit-action@v1
        with:
          action: clone
          repo-url: <https://github.com/your-org/private-repo.git>
          directory: ./repo
          username: oauth2
          token: ${{ secrets.GIT_TOKEN }}

```

---

## 지원 액션 목록

| 액션 이름 | 설명 |
| --- | --- |
| `clone` | Git 저장소를 clone |
| `checkout` | 브랜치 이동 또는 생성 |
| `add` | 파일을 스테이징 |
| `commit` | 커밋 생성 |
| `push` | 원격 저장소에 푸시 |
| `log` | 커밋 로그 출력 |
| `status` | 변경된 파일 상태 확인 |
| `fetch` | 원격 저장소 정보 가져오기 |

---

## 입력값 설명

| 입력 이름 | 필수 여부 | 설명 |
| --- | --- | --- |
| `action` | 예 | 실행할 Git 작업 (`clone`, `commit`, `push` 등) |
| `repo-url` | 아니오 | clone 시 사용할 저장소 URL |
| `directory` | 예 | Git 작업을 수행할 로컬 디렉터리 |
| `username` | 아니오 | 인증용 사용자 이름 (기본값: `oauth2`) |
| `token` | 아니오 | GitHub Token 또는 Personal Access Token |
| `email` | 아니오 | 커밋 작성자 이메일 주소 |
| `files` | 아니오 | add/commit 대상 파일 목록 (줄바꿈으로 구분) |
| `message` | 아니오 | 커밋 메시지 |
| `ref` | 아니오 | 브랜치 또는 태그 이름 |
| `remote` | 아니오 | 원격 저장소 이름 (기본값: `origin`) |

---

## 인증 정보

- 퍼블릭 저장소는 인증 없이 clone 가능
- 프라이빗 저장소 clone 또는 push 시에는 인증 필요

```yaml
with:
  username: oauth2
  token: ${{ secrets.GIT_TOKEN }}

```

> username에는 oauth2 또는 x-access-token 같은 값 사용 가능
> 
> 
> Classic PAT: `repo` 권한 필요
> Fine-grained PAT: 저장소 접근 + `contents: write` 권한 필요
> 

---

## 프라이빗 저장소 워크플로우 예시

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - name: 프라이빗 저장소 클론
        uses: KangYoungIn/nogit-action@v1
        with:
          action: clone
          repo-url: <https://github.com/your-org/private.git>
          directory: ./my-repo
          username: oauth2
          token: ${{ secrets.GIT_TOKEN }}

      - name: 파일 생성
        run: echo "Hello" > ./my-repo/hello.txt

      - name: 파일 스테이징
        uses: KangYoungIn/nogit-action@v1
        with:
          action: add
          directory: ./my-repo
          files: |
            hello.txt

      - name: 커밋
        uses: KangYoungIn/nogit-action@v1
        with:
          action: commit
          directory: ./my-repo
          message: "Add hello.txt"
          username: nogit-bot
          email: nogit@localhost

      - name: 푸시
        uses: KangYoungIn/nogit-action@v1
        with:
          action: push
          directory: ./my-repo
          username: oauth2
          token: ${{ secrets.GIT_TOKEN }}

```

---

## 개발 및 테스트

```bash
npm install
npm run build

```

테스트 시나리오는 `.github/workflows/test.yml`에 포함되어 있습니다.

---

## 라이선스

MIT

---

# nogit-action (English)

`nogit-action` is a GitHub Action that allows you to perform Git operations without requiring the `git` CLI.
It uses the Node.js-based `isomorphic-git` library to execute commands like clone, commit, and push.

---

## Features

- No need for Git CLI
- Supports public and private repositories
- Supports authentication via GitHub Token (PAT)
- Optimized for GitHub Actions workflow

---

## Use Cases

- When Git operations are needed in a custom GitHub Actions runner where the Git CLI is not installed
- When working in Docker images or WASM-based runtimes where using a Git CLI is not possible
- During CI/CD pipelines where steps require `clone`, `commit`, or `push`
- In environments where installing the Git binary is restricted for security or compliance reasons
- To automate Git operations entirely in a Node.js environment within GitHub Actions

---

## Example Usage

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Clone repository using nogit-action
        uses: KangYoungIn/nogit-action@v1
        with:
          action: clone
          repo-url: <https://github.com/your-org/private-repo.git>
          directory: ./repo
          username: oauth2
          token: ${{ secrets.GIT_TOKEN }}

```

---

## Supported Actions

| Action | Description |
| --- | --- |
| `clone` | Clone a Git repository |
| `checkout` | Switch to or create a branch |
| `add` | Stage files |
| `commit` | Create a commit |
| `push` | Push to remote repository |
| `log` | Display commit logs |
| `status` | Show status of working directory |
| `fetch` | Fetch remote references |

---

## Inputs

| Name | Required | Description |
| --- | --- | --- |
| `action` | Yes | Git command to run (`clone`, `commit`, etc.) |
| `repo-url` | No | Repository URL for cloning |
| `directory` | Yes | Local working directory |
| `username` | No | Username for authentication (`oauth2` default) |
| `token` | No | GitHub Token or Personal Access Token |
| `email` | No | Commit author email address |
| `files` | No | Files to add/commit (newline-separated) |
| `message` | No | Commit message |
| `ref` | No | Branch or tag name |
| `remote` | No | Remote name (`origin` by default) |

---

## Authentication

- Public repositories can be cloned without authentication
- Private repos or push require authentication

```yaml
with:
  username: oauth2
  token: ${{ secrets.GIT_TOKEN }}

```

> Use conventional usernames like oauth2 or x-access-token
> 
> 
> Classic PAT: requires `repo` scope
> Fine-grained PAT: requires repo access + `contents: write` permission
> 

---

## Private Repository Workflow Example

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - name: Clone private repository
        uses: KangYoungIn/nogit-action@v1
        with:
          action: clone
          repo-url: <https://github.com/your-org/private.git>
          directory: ./my-repo
          username: oauth2
          token: ${{ secrets.GIT_TOKEN }}

      - name: Create a file
        run: echo "Hello" > ./my-repo/hello.txt

      - name: Stage file
        uses: KangYoungIn/nogit-action@v1
        with:
          action: add
          directory: ./my-repo
          files: |
            hello.txt

      - name: Commit changes
        uses: KangYoungIn/nogit-action@v1
        with:
          action: commit
          directory: ./my-repo
          message: "Add hello.txt"
          username: nogit-bot
          email: nogit@localhost

      - name: Push changes
        uses: KangYoungIn/nogit-action@v1
        with:
          action: push
          directory: ./my-repo
          username: oauth2
          token: ${{ secrets.GIT_TOKEN }}

```

---

## Development & Testing

```bash
npm install
npm run build

```

Test scenarios are defined in `.github/workflows/test.yml`.

---

## License

MIT