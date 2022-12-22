ReactDOM => Connect React with dom within browser

state는 일반 변수와 다르게 값이 변하게 되면 렌더링이 일어난다. 즉, 값이 변하게 되면 연관있는 컴포넌트들이 다시 렌더링이되어 화면이 바뀌게 된다. state와 함께 사용되는 함수는 setState이다. setState는 state 값을 변경시켜주는 함수이다.

state 값들을 리렌더링 할 때 값들이 전부 변경 될 때 까지 기다렸다가 리렌더링

setState((prevState) => {return prevState \* 2});
=> prevState: 이전의 state value

json-server 와 axios 를 이용하여 title, body를 db와 같이 json 파일에 넣어줄것

json-server command: json-server --watch db.json (\* --port 3001)
npm command for db: npm run db

axios.post("http://localhost:3001/posts", {
title,
body,
});
