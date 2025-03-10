var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Component {
  constructor($target, props) {
    __publicField(this, "$target");
    __publicField(this, "state");
    this.$target = $target;
    this.props = props;
    this.state = this.setUp();
    this.render();
  }
  setUp() {
  }
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {
  }
  setState(newState) {
    this.state = { ...this.setState, ...newState };
    this.render();
  }
}
const categoryValue = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시안",
  etc: "기타"
};
const distanceValue = {
  5: "5분 내",
  10: "10분 내",
  15: "15분 내",
  20: "20분 내",
  30: "30분 내"
};
const label = {
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크"
};
const Dropdown = ({ id, required, optionValue }) => {
  return `
  <div id="${id}" class="form-item ${"form-item--required"}">
    <label for="${id} text-caption">${label[id]}</label>
    <select name="${id}" class="option" ${required}}>
      <option value="">선택해 주세요</option>
      ${Object.entries(optionValue).map(([key, value]) => `<option value="${key}">${value}</option>`).join("")}    
    </select>
  </div>
  `;
};
const Input = ({ id, required, type }) => {
  return `
  <div id="name" class="form-item ${required ? "form-item--required" : ""}">
      <label for="${id} text-caption">${label[id]}</label>
      <input type="${type}" name="${id}" ${required}>
    </div>`;
};
const RestaurantData = [
  {
    name: "피양콩할마니",
    distance: 10,
    description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
                곳으로,
                ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
                메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
    imgSrc: "./category-korean.png",
    imgAlt: "한식"
  },
  {
    name: "친친",
    distance: 5,
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다.`,
    imgSrc: "./category-chinese.png",
    imgAlt: "중식"
  },
  {
    name: "잇쇼우",
    distance: 10,
    description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을
                다하는 잇쇼우는
                고객 한분 한분께 최선을 다하겠습니다.`,
    imgSrc: "./category-japanese.png",
    imgAlt: "일식"
  },
  {
    name: "이태리키친",
    distance: 20,
    description: `늘 변화를 추구하는 이태리키친입니다.`,
    imgSrc: "./category-western.png",
    imgAlt: "양식"
  },
  {
    name: "호아빈 삼성점",
    distance: 15,
    description: `푸짐한 양에 국물이 일품인 쌀국수`,
    imgSrc: "./category-asian.png",
    imgAlt: "아시안"
  },
  {
    name: "도스타코스 선릉점",
    distance: 5,
    description: `멕시칸 캐주얼 그릴`,
    imgSrc: "./category-etc.png",
    imgAlt: "기타"
  }
];
class Restaurant extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    const { name, distance, description, imgSrc, imgAlt } = this.props;
    return ` 
              <div class="restaurant__category">
                  <img
                    src=${imgSrc}
                    alt=${imgAlt}
                    class="category-icon"
                  />
                </div>
                <div class="restaurant__info">
                  <h3 class="restaurant__name text-subtitle">${name}</h3>
                  <span class="restaurant__distance text-body"
                    >캠퍼스부터 ${distance}분 내</span
                  >
                  <p class="restaurant__description text-body">
                  ${description}
                  </p>
                </div>
              

      `;
  }
}
const addData = () => {
  const formData = new FormData(document.getElementById("input-form"));
  const submittedData = Object.fromEntries(formData);
  const information = {
    name: submittedData.name,
    distance: Number(submittedData.distance),
    description: submittedData.description,
    imgSrc: `./category-${submittedData.category}.png`,
    imgAlt: `${categoryValue[submittedData.category]}`
  };
  RestaurantData.push(information);
  document.dispatchEvent(new CustomEvent("restaurantUpdated"));
};
class Modal extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    const { isModalOpen } = this.props;
    return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='input-form'>

        ${Dropdown({ id: "category", required: "required", optionValue: categoryValue })}
        ${Input({ id: "name", required: "required", type: "text" })}
        ${Dropdown({ id: "distance", required: "required", optionValue: distanceValue })}
        ${Input({ id: "description", required: "", type: "text" })}
        ${Input({ id: "link", required: "", type: "url" })}

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    </div>
    `;
  }
  render() {
    super.render();
    if (this.props.isModalOpen) {
      this.$target.classList.add("modal--open");
    } else {
      this.$target.classList.remove("modal--open");
    }
  }
  setEvent() {
    const { toggleModal } = this.props;
    this.$target.querySelector(".modal-backdrop").addEventListener("click", () => {
      this.props.toggleModal();
    });
    this.$target.querySelector(".button.button--secondary.text-caption").addEventListener("click", () => {
      this.props.toggleModal();
    });
    this.submitForm();
  }
  submitForm() {
    document.getElementById("input-form").addEventListener("submit", (event) => {
      event.preventDefault();
      addData();
      this.props.toggleModal();
    });
  }
}
class Header extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    return `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가" />
      </button>`;
  }
  setEvent() {
    this.$target.querySelector(".gnb__button").addEventListener("click", () => {
      this.props.toggleModal();
    });
  }
}
const createRestaurant = () => {
  const restaurantList = document.querySelector(".restaurant-list");
  if (restaurantList.childElementCount === 0) {
    RestaurantData.forEach((data) => {
      const restaurantItem = document.createElement("li");
      restaurantItem.classList.add("restaurant");
      new Restaurant(restaurantItem, data);
      restaurantList.appendChild(restaurantItem);
    });
  }
};
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.setUp();
    document.addEventListener("restaurantUpdated", this.addNewRestaurant);
  }
  setUp() {
    return { isModalOpen: false };
  }
  render() {
    new Header(document.querySelector(".gnb"), {
      toggleModal: () => this.toggleModal()
    });
    new Modal(document.querySelector(".modal"), {
      isModalOpen: this.state.isModalOpen,
      toggleModal: () => this.toggleModal()
    });
    createRestaurant();
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  addNewRestaurant() {
    const restaurantList = document.querySelector(".restaurant-list");
    const newRestaurant = RestaurantData[RestaurantData.length - 1];
    if (newRestaurant) {
      const restaurantItem = document.createElement("li");
      restaurantItem.classList.add("restaurant");
      new Restaurant(restaurantItem, newRestaurant);
      restaurantList.appendChild(restaurantItem);
    }
  }
}
new App(document.getElementById("app"));
