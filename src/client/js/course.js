const locationMap = document.getElementById("location-map");
let map; // 카카오 지도
let userLatitude;
let userLongitude;
let isMapDrawn = false;
let courseData = []; // 마커를 위한 데이터 담을 공간
let markers = [];

// 마커를 그리는 함수
const addMarker = (position) => {
  let marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  markers.push(marker);
};
// 마커를 지우는 함수
const delMarker = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  };
  markers = [];
};

const addCourseMarker = (course) => {
  // 방문했으면 A이미지, 안했으면 B이미지
  let markerImageUrl = "/file/map_not_done.png";
  let markerImageSize = new kakao.maps.Size(24, 35);
  const kakaoMarkerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize);
  const latlng = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);

  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: course.course_name,
    image: kakaoMarkerImage
  });
}

const setCourseMarker = () => {
  for (let i = 0; i < courseData.length; i++) {
    addCourseMarker(courseData[i]);
  }
};

const drawMap = (lat, lng) => {
  // 첫번째 인자: 지도 그릴 dom(html)
  map = new kakao.maps.Map(locationMap, {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3
  });
  map.setZoomable(false);
};

const configLocation = () => {
  if(navigator.geolocation) { // 위치 허용 받으면
    // navigator web api 위치정보 접근 , watchPosition : 감시
    navigator.geolocation.watchPosition((pos) => {
      // console.log(pos);
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;
      // 전역변수 선언 이유 > 다른 위치에 있어도 값을 받기위해
      if(!isMapDrawn) {
        // 1.지도 그리기 2.마커 그리기 3.변수값 변경
        drawMap(userLatitude, userLongitude);
        // 목적지 마커
        setCourseMarker();
        isMapDrawn = true;
      };
      addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    });
  }
};

const makeCourseNaviHTML = (data) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<li class="course">`
    html += `<p>${data[i].course_name}</p>`;
    html += `</li>`
  }
  html += `<li id="myPosition" class="course on">나의 위치</li>`
  courseWrap.innerHTML = html;
}

// 코스 데이터를 불러오는 fetch 함수
const getCourseList = async () => {
  const response = await fetch("/api/course");
  const result = await response.json();
  const data = result.data;
  console.log(data);
  courseData = data;
  // 결과가 나오면 함수 실행
  makeCourseNaviHTML(data);
  configLocation();
};
getCourseList();