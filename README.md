<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/95rolancia/danim-react-spring-boot">
    <img src="https://github.com/95rolancia/danim-react-spring-boot/blob/master/frontend/public/images/danilogo.png?raw=true" alt="Logo" width="120" height="80">
  </a>

  <h3 align="center">다님</h3>

  <p align="center">
    여행 일기를 더욱 세련되고 알아보기 쉽게 만드는 서비스, 여행을 내 입맛대로 계획할 수 있는 서비스
    <br />
    <a href="https://github.com/95rolancia/danim-react-spring-boot"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=G7T2ra51dBQ">View Demo</a>
    ·
    <a href="https://github.com/95rolancia/danim-react-spring-boot/issues">Report Bug</a>
    ·
    <a href="https://github.com/95rolancia/danim-react-spring-boot/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">목차</h2></summary>
  <ol>
    <li> <a href="#프로젝트-설명">프로젝트 설명</a></li>
    <li><a href="#기술-스택">기술 스택</a></li>
    <li><a href="#빠른-시작">빠른 시작</a></li>
    <li><a href="#라이센스">라이센스</a></li>
    <li><a href="#아키텍쳐">아키텍쳐</a></li>
    <li><a href="#참고">참고</a></li>
  </ol>
</details>

<!-- INTRODUCE MEMBER -->

## 🧑‍💻 팀원소개

|                                              [이종현](https://github.com/kepler53)                                               |                                             [김경원](https://github.com/shining8543)                                             |                                               [노영주](https://github.com/Y0ungZ)                                                |                                               [김문희](https://github.com/munimun)                                               |                                             [장준혁](https://github.com/95rolancia)                                              |
| :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/41102293/130561102-23be9b86-d3e8-460a-8ab0-e133b7e9d4ea.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561099-a6ef11d4-68bd-4f98-89ea-b232604cb47e.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561101-bf389c47-397e-4a82-9f11-ef842e403605.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561100-aca30a21-2f9b-4154-969e-1afc64654a92.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561093-3e81caa1-a718-46b3-9adf-6ad372c59de8.png" width="250px"/> |
|                                                       dlwhdgus53@naver.com                                                       |                                                      shining8543@naver.com                                                       |                                                         at8in@naver.com                                                          |                                                       ansgml6491@naver.com                                                       |                                                       95jjangjun@gmail.com                                                       |
|                                               누구보다 성장하는 개발자가 될것이다.                                               |                                           여러분들과 즐겁게 개발하는 사람이 되겠습니다                                           |                                           항상 배우는 자세를 갖는 개발자가 되겠습니다.                                           |                                                유용한걸 만드는 사람이 되겠습니당~                                                |                                            꾸준히 성장할 수 있는 개발자가 되겠습니다.                                            |

<!-- ABOUT THE PROJECT -->

## 프로젝트 설명

[![Product Name Screen Shot][product-screenshot2]](product-screenshot2)
[![Product Name Screen Shot][product-screenshot1]](product-screenshot1)

[프로젝트 설명](https://github.com/95rolancia/danim-react-spring-boot/blob/master/exec/%EC%86%8C%EC%8A%A4%20%ED%81%B4%EB%A1%A0%20%ED%9B%84%20%EB%B0%B0%ED%8F%AC%20%EB%AC%B8%EC%84%9C.pdf)

## 기술 스택

#### front-end

- [React](https://reactjs.org)
- [MobX](https://mobx.js.org/README.html)
- [Material-UI](https://material-ui.com)

#### back-end

- [Spring boot](https://spring.io/projects/spring-boot)
- [MySQL](https://www.mysql.com)
- [Redis](https://redis.io)
- [Firebase](https://firebase.google.com/?hl=ko)

<!-- GETTING STARTED -->

## 빠른 시작

### Front-End
```
    $ git clone https://github.com/95rolancia/danim-react-spring-boot
    $ cd danim-react-spring-boot/frontend
    $ touch .env.development.local
    $ yarn
    $ yarn start
```

### front-end env setting

```
    REACT_APP_API_END_POINT=https://localhost:8080
    REACT_APP_IMAGE_BASE_URL=
    REACT_APP_GOOGLE_MAP_API_KEY=
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_DB_URL=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
```

### Back-End
```
  $ cd danim-react-spring-boot/backend
  $ mvn package
  $ java -jar {jar파일이름}
```

<!-- LICENSE -->

## 라이센스

Distributed under the MIT License. See `LICENSE` for more information.

<!-- ARCHITECTURE -->

## 아키텍쳐
![image](https://user-images.githubusercontent.com/61743793/130647531-c1f6e7ad-1aa3-44cb-977b-01d18e52779f.png)


## 참고

- [노션(기획서, 스크럼, 그라운드/개발 규칙)](https://fuchsia-nerine-f9b.notion.site/Danim-faf3fd4b53994648b9ca24b4c21bd368)
- [와이어프레임](https://www.figma.com/file/wQ0vlsMUl2Jrte52zixv9J/%5BSSAFY%5D2%ED%95%99%EA%B8%B0-1%EC%B0%A8-team-library?node-id=480%3A3455)
- []()

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/95rolancia/danim-react-spring-boot.svg?style=for-the-badge
[contributors-url]: https://github.com/95rolancia/danim-react-spring-boot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/95rolancia/danim-react-spring-boot.svg?style=for-the-badge
[forks-url]: https://github.com/95rolancia/danim-react-spring-boot/network/members
[stars-shield]: https://img.shields.io/github/stars/95rolancia/danim-react-spring-boot.svg?style=for-the-badge
[stars-url]: https://github.com/95rolancia/danim-react-spring-boot/stargazers
[issues-shield]: https://img.shields.io/github/issues/95rolancia/danim-react-spring-boot.svg?style=for-the-badge
[issues-url]: https://github.com/95rolancia/danim-react-spring-boot/issues
[license-shield]: https://img.shields.io/github/license/95rolancia/danim-react-spring-boot.svg?style=for-the-badge
[license-url]: https://github.com/95rolancia/danim-react-spring-boot/blob/master/license.txt
[product-screenshot2]: https://user-images.githubusercontent.com/41102293/130556791-b466d883-effe-403b-be20-a881ec149851.png
[product-screenshot1]: https://user-images.githubusercontent.com/41102293/130557312-e3ac3bdb-2a62-4c23-a606-d55460033a0d.png
