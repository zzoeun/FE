import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      axios
        .post("https://project-be.site/auth/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          let bearer_token = response.headers.bearer_token; 
          localStorage.setItem("bearer_token", bearer_token); //테스트 토큰 저장
          const token = response.data.token;
          localStorage.setItem("token", token); // 토큰 저장
          console.log("토큰이 로컬 스토리지에 저장되었습니다:", token);
          alert(email + "님 환영합니다.");
          window.location.href = "/"; // 로그인 성공 후 리다이렉트
        })
        .catch((error) => {
          console.error("로그인 오류:", error);
          alert(
            "이메일일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
          );
        });
    }
  };

  return (
    
    <div style={styles.container}>
      <form style={styles.form}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={handleLogin} style={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
