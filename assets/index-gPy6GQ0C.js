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
const RestaurantData = [
  {
    name: "피양콩할마니",
    distance: 10,
    description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로,‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
                메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
    imgSrc: "./category-korean.png",
    imgAlt: "한식",
    category: "한식",
    link: "https://naver.me/xFLMsS9n",
    id: `restaurant-${/* @__PURE__ */ new Date() - 6}`
  },
  {
    name: "친친",
    distance: 5,
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다.`,
    imgSrc: "./category-chinese.png",
    imgAlt: "중식",
    category: "중식",
    link: "https://naver.me/FV7Y4RTm",
    id: `restaurant-${/* @__PURE__ */ new Date() - 5}`
  },
  {
    name: "잇쇼우",
    distance: 10,
    description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을
                다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다.`,
    imgSrc: "./category-japanese.png",
    imgAlt: "일식",
    category: "일식",
    link: "https://naver.me/FLyTJ4dC",
    id: `restaurant-${/* @__PURE__ */ new Date() - 4}`
  },
  {
    name: "이태리키친",
    distance: 20,
    description: `늘 변화를 추구하는 이태리키친입니다.`,
    imgSrc: "./category-western.png",
    imgAlt: "양식",
    category: "양식",
    link: "https://naver.me/5huapW2k",
    id: `restaurant-${/* @__PURE__ */ new Date() - 3}`
  },
  {
    name: "호아빈 삼성점",
    distance: 15,
    description: `푸짐한 양에 국물이 일품인 쌀국수`,
    imgSrc: "./category-asian.png",
    imgAlt: "아시안",
    category: "아시안",
    link: "https://naver.me/5WOQLjn6",
    id: `restaurant-${/* @__PURE__ */ new Date() - 2}`
  },
  {
    name: "도스타코스 선릉점",
    distance: 5,
    description: `멕시칸 캐주얼 그릴`,
    imgSrc: "./category-etc.png",
    imgAlt: "기타",
    category: "기타",
    link: "https://naver.me/Gn0yLQ8K",
    id: `restaurant-${/* @__PURE__ */ new Date() - 1}`
  }
];
class Component {
  constructor($target, props) {
    __publicField(this, "$target");
    __publicField(this, "state");
    this.$target = $target;
    this.props = props;
    this.state = this.initState();
    this.render();
  }
  initState() {
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
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
class IconButton extends Component {
  initState() {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteRestaurantList") || "[]"
    );
    return {
      isButtonClicked: savedFavorites.includes(this.props.restaurantId)
    };
  }
  template() {
    const imgSrc = this.state.isButtonClicked ? "./favorite-icon-filled.png" : "./favorite-icon-lined.png";
    const imgAlt = this.state.isButtonClicked ? "filled-star" : "empty-star";
    return `<button class="favorite_add_button">
    <img src="${imgSrc}" alt="${imgAlt}" class="favorite-icon"/>
  </button>`;
  }
  setEvent() {
    const favoriteButton = this.$target.querySelector(".favorite_add_button");
    if (favoriteButton) {
      favoriteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const newState = !this.state.isButtonClicked;
        this.setState({ isButtonClicked: newState });
        const savedFavorites = JSON.parse(
          localStorage.getItem("favoriteRestaurantList") || "[]"
        );
        let updatedFavorites = [...savedFavorites];
        if (newState) {
          if (!updatedFavorites.includes(this.props.restaurantId)) {
            updatedFavorites.push(this.props.restaurantId);
          }
        } else {
          updatedFavorites = updatedFavorites.filter(
            (id) => id !== this.props.restaurantId
          );
        }
        localStorage.setItem(
          "favoriteRestaurantList",
          JSON.stringify(updatedFavorites)
        );
        document.dispatchEvent(
          new CustomEvent("favoriteUpdated", {
            detail: {
              favoriteRestaurants: updatedFavorites
            }
          })
        );
      });
    }
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
const categoryFilterValue = {
  전체: "전체",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타"
};
const sortingValue = {
  name: "이름순",
  distance: "거리순"
};
const addData = () => {
  const formData = new FormData(
    document.getElementById("input-form")
  );
  const submittedData = Object.fromEntries(formData);
  const information = {
    name: submittedData.name,
    distance: Number(submittedData.distance),
    description: submittedData.description,
    imgSrc: `./category-${submittedData.category}.png`,
    imgAlt: `${categoryValue[submittedData.category]}`,
    category: `${categoryValue[submittedData.category]}`,
    link: `${submittedData.link}`,
    id: `restaurant-${Date.now()}`
  };
  document.dispatchEvent(
    new CustomEvent("restaurantUpdated", { detail: { information } })
  );
};
class Modal extends Component {
  template() {
    return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      ${this.props.content}
    </div>`;
  }
  render() {
    super.render();
    this.onMount();
  }
  onMount() {
    if (this.props.isModalOpen) {
      this.$target.classList.add("modal--open");
    } else {
      this.$target.classList.remove("modal--open");
    }
  }
  setEvent() {
    this.$target.querySelector(".modal-backdrop").addEventListener("click", () => {
      this.props.toggleModal();
    });
    if (this.props.modalType === "add") {
      this.setupAddModalEvents();
    } else if (this.props.modalType === "info") {
      this.setupInfoModalEvents();
    }
  }
  setupAddModalEvents() {
    const cancelButton = this.$target.querySelector(
      ".button.button--secondary.text-caption"
    );
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        this.props.toggleModal();
      });
    }
    this.addSubmitEvent();
  }
  setupInfoModalEvents() {
    const closeButton = this.$target.querySelector(
      ".button.button--primary.text-caption"
    );
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.props.toggleModal();
      });
    }
    const element = this.$target.querySelector("[data-restaurant-id]");
    const deleteButton = this.$target.querySelector(
      ".button.button--secondary.text-caption"
    );
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        document.dispatchEvent(
          new CustomEvent("restaurantDeleted", {
            detail: { restaurantId: element.dataset.restaurantId }
          })
        );
        this.props.toggleModal();
      });
    }
    const iconButtonContainer = this.$target.querySelector(
      ".iconButton_container"
    );
    if (iconButtonContainer) {
      new IconButton(iconButtonContainer, {
        restaurantId: element.dataset.restaurantId
      });
    }
  }
  addSubmitEvent() {
    document.getElementById("input-form").addEventListener("submit", (event) => {
      event.preventDefault();
      addData();
      this.props.toggleModal();
    });
  }
}
class Header extends Component {
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
const addResturantContent = () => {
  return ` <h2 class="modal-title text-title">새로운 음식점</h2>
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
        </form>`;
};
const restaurantInfoContent = (data = {}) => {
  return `
    <div id="restaurant_info_content" data-restaurant-id="${data.id}">
      <div class="modal-header">
        <div class="restaurant__category">
          <img src="${data.imgSrc}" alt="${data.imgAlt}" class="category-icon"/>     
        </div>
          <div class="iconButton_container data-restaurant-id="${data.id}"></div>
      </div>
        <div class="restaurant__info" id="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${data.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${data.distance}분 내</span>
          <p class="restaurant__description text-body" id="restaurant__description">${data.description}</p>
          <a href=${data.link} class="restaurant__description text-body">${data.link}</a>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">삭제하기</button>
          <button class="button button--primary text-caption">닫기</button>
        </div>
    </div>
`;
};
class Tab extends Component {
  template() {
    return `
    <div class="tab text-tab-title ${this.props.activeTab === "all" ? "active" : ""}" data-title="all">
      모든 음식점
        </div>
        <div class="tab text-tab-title ${this.props.activeTab === "frequently-visited" ? "active" : ""}" data-title="frequently-visited">
        자주 가는 음식점
        </div>
      `;
  }
  setEvent() {
    this.$target.addEventListener("click", (event) => {
      const targetTab = event.target.closest("[data-title]");
      document.dispatchEvent(
        new CustomEvent("tabClicked", {
          detail: {
            targetTabTitle: targetTab.dataset.title
          }
        })
      );
    });
  }
  updateActiveTab(newActiveTab) {
    this.setState({ activeTab: newActiveTab });
    this.$target.querySelectorAll(".tab").forEach((tab) => {
      const tabTitle = tab.dataset.title;
      if (tabTitle === newActiveTab) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }
}
class FilterDropdown extends Component {
  template() {
    return `
        <select name="${this.props.id}" id="${this.props.id}-filter" class="restaurant-filter">
        ${Object.entries(this.props.optionValue).map(
      ([key, value]) => `<option value="${key}" ${key === this.props.selectedValue ? "selected" : ""}>${value}</option>`
    ).join("")}
        </select>
        `;
  }
  setEvent() {
    this.$target.addEventListener("change", (e) => {
      this.props.onChange(e.target.value);
    });
  }
  setState(newState) {
    this.props.selectedValue = newState.selectedValue;
    this.render();
  }
}
const createCategoryFilter = (onChange, selectedCategory) => {
  return new FilterDropdown(
    document.querySelector(".category-filter-container"),
    {
      id: "category",
      optionValue: categoryFilterValue,
      selectedValue: selectedCategory,
      onChange
    }
  );
};
const createSortingFilter = (onChange, sortOption) => {
  return new FilterDropdown(
    document.querySelector(".sorting-filter-container"),
    {
      id: "sorting",
      optionValue: sortingValue,
      selectedValue: sortOption,
      onChange
    }
  );
};
const filterByCategory = (restaurants, category) => {
  if (category === "전체") {
    return restaurants;
  }
  return restaurants.filter((restaurant) => restaurant.category === category);
};
const getRestaurant = (data) => {
  return `<div class="restaurant__category">
                   <img src=${data.imgSrc} alt=${data.imgAlt} class="category-icon"/>
                   </div>
                   <div class="restaurant__content">
                    <div class="restaurant__info">
                      <h3 class="restaurant__name text-subtitle">${data.name}</h3>
                      <span class="restaurant__distance text-body">캠퍼스부터 ${data.distance}분 내</span>
                      <p class="restaurant__description text-body">${data.description}</p>
                    </div>
                    <div class="iconButton_container" data-restaurant-id="${data.id}">
                    </div>
                   </div>
                   `;
};
const renderRestaurants = (restaurants, onRestaurantClick) => {
  const restaurantList = document.querySelector(".restaurant-list");
  restaurantList.innerHTML = "";
  restaurants.forEach((data) => {
    const restaurantItem = document.createElement("li");
    restaurantItem.classList.add("restaurant");
    const restaurant = getRestaurant(data);
    restaurantItem.innerHTML = restaurant;
    restaurantItem.addEventListener("click", () => onRestaurantClick(data));
    restaurantList.appendChild(restaurantItem);
    const iconButtonContainer = restaurantItem.querySelector(
      ".iconButton_container"
    );
    if (iconButtonContainer) {
      new IconButton(iconButtonContainer, {
        restaurantId: data.id
      });
    }
  });
};
const sortByOption = (restaurants, sortOption) => {
  if (sortOption === "name") {
    return restaurants.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }
  if (sortOption === "distance") {
    return restaurants.sort(
      (a, b) => a.distance - b.distance
    );
  }
};
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.initState();
    this.tab = new Tab(document.querySelector(".tab-container"), {
      activeTab: this.state.activeTab
    });
    this.activateMain = this.activateMain.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    document.addEventListener("tabClicked", this.activateMain);
    document.addEventListener("restaurantUpdated", this.updateRestaurant);
    document.addEventListener("restaurantDeleted", this.deleteRestaurant);
    document.addEventListener(
      "favoriteUpdated",
      (event) => this.state.favoriteRestaurants = event.detail.favoriteRestaurants
    );
  }
  initState() {
    const savedData = localStorage.getItem("restaurantList");
    const savedFavorites = localStorage.getItem("favoriteRestaurantList");
    if (!savedData) {
      localStorage.setItem("restaurantList", JSON.stringify(RestaurantData));
    }
    if (!savedFavorites) {
      localStorage.setItem("favoriteRestaurantList", JSON.stringify([]));
    }
    return {
      isModalOpen: false,
      restaurantList: savedData ? JSON.parse(savedData) : [...RestaurantData],
      favoriteRestaurants: savedFavorites ? JSON.parse(savedFavorites) : [],
      selectedCategory: "전체",
      sortOption: "name",
      selectedRestaurant: null,
      activeTab: "all"
    };
  }
  render() {
    new Header(document.querySelector(".gnb"), {
      toggleModal: () => this.toggleModal()
    });
    if (this.state.activeTab === "all") {
      this.showAllRestaurants();
    } else {
      this.showFavoriteRestaurants();
    }
    new Modal(document.querySelector(".modal"), {
      isModalOpen: this.state.isModalOpen,
      toggleModal: () => this.toggleModal(),
      content: this.state.selectedRestaurant ? restaurantInfoContent(this.state.selectedRestaurant) : addResturantContent(),
      modalType: this.state.selectedRestaurant ? "info" : "add"
    });
  }
  showAllRestaurants() {
    renderRestaurants(this.state.restaurantList, (restaurant) => {
      this.toggleModal(restaurant);
    });
    createCategoryFilter((selectedCategory) => {
      this.filterRestaurants(selectedCategory);
    }, this.state.selectedCategory);
    createSortingFilter((sortOption) => {
      this.sortRestaurants(sortOption);
    }, this.state.sortOption);
  }
  showFavoriteRestaurants() {
    const favoriteRestaurants = this.state.restaurantList.filter(
      (restaurant) => this.state.favoriteRestaurants.includes(restaurant.id)
    );
    renderRestaurants(favoriteRestaurants, (restaurant) => {
      this.toggleModal(restaurant);
    });
  }
  toggleModal(restaurantData = null) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      restaurantList: this.state.restaurantList,
      selectedRestaurant: restaurantData
    });
  }
  activateMain(event) {
    const { targetTabTitle } = event.detail;
    this.setState({
      activeTab: targetTabTitle
    });
    this.tab.updateActiveTab(targetTabTitle);
  }
  filterRestaurants(selectedCategory) {
    const filtered = filterByCategory(
      JSON.parse(localStorage.getItem("restaurantList")),
      selectedCategory
    );
    this.setState({
      restaurantList: filtered,
      selectedCategory
    });
  }
  sortRestaurants(sortOption) {
    const sorted = sortByOption(this.state.restaurantList, sortOption);
    this.setState({
      restaurantList: sorted,
      sortOption
    });
  }
  updateRestaurant(event) {
    const newRestaurantList = [...this.state.restaurantList];
    newRestaurantList.push(event.detail.information);
    localStorage.setItem("restaurantList", JSON.stringify(newRestaurantList));
    this.setState({
      restaurantList: newRestaurantList,
      selectedCategory: this.state.selectedCategory,
      sortOption: this.state.sortOption
    });
  }
  deleteRestaurant(event) {
    const restaurantId = event.detail.restaurantId;
    let restaurantIndex = -1;
    this.state.restaurantList.forEach((restaurant, index) => {
      if (restaurant.id === restaurantId) {
        restaurantIndex = index;
      }
    });
    this.state.restaurantList.splice(restaurantIndex, 1);
    localStorage.setItem(
      "restaurantList",
      JSON.stringify([...this.state.restaurantList])
    );
    this.setState({
      restaurantList: this.state.restaurantList,
      selectedCategory: this.state.selectedCategory,
      sortOption: this.state.sortOption,
      selectedRestaurant: null
    });
  }
}
new App(document.getElementById("app"));
