const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");
const joinBtn = document.querySelector(".join");
const login = document.querySelector(".login");

const loginFetch = async () => {
  const userId = userIdInput.value;
  const userPassword = userPasswordInput.value;
  if(!userId || !userPassword) {
    msgAlert("center", "모든 필드를 입력해 주세요.", "error");
    return;
  };
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      userId,
      userPassword
    })
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  if(data.status === "success") {
    console.log(data.data.accessToken);
    // ejs -> 쿠키 저장해야함
    // accessToken 저장
    localStorage.setItem("accessToken", data.data.accessToken);
    msgAlert("center", "로그인에 성공하였습니다.", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    // alert
    // 페이지이동
  }else {
    msgAlert("center", "로그인에 실패하였습니다.", "error");
  }
}

login.addEventListener("click", loginFetch);
joinBtn.addEventListener("click", () => { window.location.href = "/join"; });