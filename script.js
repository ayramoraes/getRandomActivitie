const url = "https://www.boredapi.com/api/";
const modal = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const buttonCloseModal = document.querySelectorAll('.close-modal');
const buttonOpenModal = document.querySelectorAll('.show-modal');
const randomActivityBtn = document.getElementById("random-activity-btn");
const activityParagraph = document.getElementById("activity");
const categorySelect = document.getElementById("category-select");
const categoryBtn = document.getElementById("category-btn");
const activityCategoryParagraph = document.getElementById("activity-category");
const activityTypeSelect = document.getElementById("activity-type-select");
const activityTypeBtn = document.getElementById("activity-type-btn");
const categoryForm = document.querySelector('#category-form');



function openModal(index) {
  modal[index].classList.remove('hidden');
  overlay.classList.remove('hidden');
};

function closeModal() {
  modal.forEach((modal) => {
    modal.classList.add('hidden')
  })
  overlay.classList.add('hidden');
};

buttonOpenModal.forEach(function (button, index) {
  button.addEventListener('click', function () {
    openModal(index);
  });
});

buttonCloseModal.forEach(function (button) {
  button.addEventListener('click', function () {
    closeModal();
  });
});

overlay.addEventListener('click', function () {
  closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
    document.activeElement.blur()
  }
});

closeModal();


const categories = [
  { value: "", label: "--Select a category--" },
  { value: "education", label: "Education" },
  { value: "recreational", label: "Recreational" },
  { value: "social", label: "Social" },
  { value: "diy", label: "DIY" },
  { value: "charity", label: "Charity" },
  { value: "cooking", label: "Cooking" },
  { value: "relaxation", label: "Relaxation" },
  { value: "music", label: "Music" },
  { value: "busywork", label: "Busywork" },
];

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.value;
  option.textContent = category.label;
  categorySelect.appendChild(option);
});

function getRandomActivity() {

  activityParagraph.textContent = 'Loading...'; 
  fetch(`${url}activity/`)
    .then((response) => response.json())
    .then((data) => {
      activityParagraph.textContent = data.activity;
    
      if (activityParagraph.textContent !== '') {
        activityParagraph.style.border = '2px solid #ccc'; 
      }
    })
    .catch((error) => {
      console.error(error);

      activityParagraph.textContent = 'Error fetching activity...'; 

    });
}

function searchActivityByCategory(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const category = formData.get('category');
  const type = formData.get('type');

  if (category) {
    fetch(`${url}activity?type=${category}&participants=${type}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.activity) {
          activityCategoryParagraph.textContent = data.activity;
        } else {
          activityCategoryParagraph.textContent = "No activity available for this category and type.";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

categorySelect.addEventListener('change', () => {
  if (categorySelect.value !== "") {
    categoryBtn.disabled = false;
  } else {
    categoryBtn.disabled = true;
  }
});



randomActivityBtn.addEventListener("click", getRandomActivity);
categoryForm.addEventListener('submit', searchActivityByCategory);