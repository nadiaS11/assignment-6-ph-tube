let selectedId = null;

const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categoryArr = data.data;
  const categories = document.getElementById("categories");
  categories.innerHTML = "";
  categoryArr.forEach((btn) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <a onclick="handleCategory('${btn.category_id}')" id="${btn.category_id}" class=" btn-sm px-4 py-2 text-lg font-semibold bg-[#25252533] active:bg-red-600 active:text-white rounded-sm">
          ${btn.category}
        </a>
    `;
    categories.appendChild(div);
  });
  // console.log(document.getElementsByTagName("a"));
};

//////////////////////handles categories
const handleCategory = async (categoryId, sortByViews = false) => {
  selectedId = categoryId;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const categoryVideo = data.data;

  // console.log(categoryVideo);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (categoryVideo.length === 0) {
    videoContainer.classList.remove(
      "grid",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-10",
      "lg:gap-8"
    );
    videoContainer.innerHTML = `
      <div class="mx-auto text-center flex flex-col items-center justify-center mt-12">
        <img src="./images/Icon.png" alt="">
        <h2 class="font-bold text-4xl">Oops!! Sorry, </br>There is no content here</h2>
      </div>
      `;
  } else {
    if (sortByViews) {
      categoryVideo.sort((a, b) => {
        const view1 = parseFloat(a.others.views);
        const view2 = parseFloat(b.others.views);
        if (view1 > view2) return -1;
        else if (view1 < view2) return 1;
        else return 0;
      });
    }
    videoContainer.classList.add(
      "grid",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-10",
      "lg:gap-8"
    );
    categoryVideo.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.classList = `flex flex-col mx-auto relative`;

      const seconds = video?.others?.posted_date;
      const convertedSeconds = handleSeconds(seconds);

      videoCard.innerHTML = `
    
            <img class="h-[200px] w-80 object-cover rounded-lg" src=${
              video.thumbnail
            } />
            <div class="timeDiv absolute text-white bg-gray-900 px-2 rounded-lg right-2  top-32 ">${
              video?.others?.posted_date
                ? convertedSeconds
                : '<div class="timeDiv hidden"></div>'
            }</div>
          
          <div class="flex items-start gap-5 pt-5 px-2">
            
              <img class=" w-10 h-10 rounded-full" src=${
                video?.authors[0]?.profile_picture || " "
              }/>
            
            <div class="">
              <h2 class="text-xl font-bold">${video.title} </h2>
              <p class="py-2 flex items-center font-semibold text-gray-500 text-sm">${
                video?.authors[0]?.profile_name || " "
              } <span class="ml-3">${
        video?.authors[0]?.verified ? '<img src="./images/verified.svg">' : " "
      } </span>  
      </p>
              <p class="text-gray-500 font-semibold text-sm">${
                video?.others?.views || "not available"
              } Views</p>
            </div>
          </div>
    `;

      videoContainer.appendChild(videoCard);
      // console.log(video?.others?.views || "not available");
    });
  }
  loadCategory();
};

//for sorting
document.getElementById("btn-sort").addEventListener("click", () => {
  if (selectedId) {
    handleCategory(selectedId, true);
  } else {
    handleCategory(1000, true);
  }
});

const handleSeconds = (d) => {
  d = Number(d);
  const hours = parseInt(d / 3600);
  let remainingSeconds = d % 3600;
  const minutes = parseInt(remainingSeconds / 60);

  return `${hours}hrs ${minutes}min ago`;
};

handleCategory(1000);
