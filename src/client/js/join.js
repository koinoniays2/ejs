const joinBtn = document.getElementById("joinBtn");
const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");
const userNameInput = document.getElementById("userName");

const joinFetch = async () => {
  const userId = userIdInput.value;
  const userPassword = userPasswordInput.value;
  const userName = userNameInput.value;

  if(!userId || !userPassword || !userName) {
    // sweetalert2 라이브러리
    msgAlert("center", "모든 필드를 입력해 주세요.", "error");
    return;
  }

  const response = await fetch("/api/join", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      userId,
      userPassword,
      userName
    })
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  if(data.message === "회원가입 완료") {
    msgAlert("center", "회원가입 완료", "success");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } else if(data.message === "중복된 아이디입니다.") {
    msgAlert("center", "중복된 아이디입니다.", "error");
  };
};

joinBtn.addEventListener("click", joinFetch);