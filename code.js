const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categoryArr = data.data;
  const categories = document.getElementById("categories");
  categoryArr.forEach((btn) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <a onclick="handleCategory('${btn.category_id}')" class="btn-sm px-4 py-2 text-lg font-semibold bg-[#25252533] active:bg-red-600 active:text-white rounded-sm">
          ${btn.category}
        </a>
    `;
    categories.appendChild(div);
  });
};
const handleCategory = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const categoryVideo = data.data;
  console.log(categoryVideo);
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
    videoContainer.classList.add(
      "grid",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-10",
      "lg:gap-8"
    );
    categoryVideo.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.classList = `flex flex-col mx-auto`;

      videoCard.innerHTML = `
    <figure>
            <img class="h-[220px] w-80 rounded-lg" src=${video.thumbnail} />
          </figure>
          <div class="flex items-start gap-5 pt-5 px-2">
            
              <img class=" w-10 h-10 rounded-full" src=${
                video?.authors[0]?.profile_picture || " "
              }/>
            
            <div class="">
              <h2 class="text-xl font-bold">Shoes!</h2>
              <p class="py-2 font-semibold text-gray-500 text-sm">${
                video?.authors[0]?.profile_name || " "
              }</p>
              <p class="text-gray-500 font-semibold text-sm">91k Views</p>
            </div>
          </div>
    `;

      videoContainer.appendChild(videoCard);
      // console.log(categoryVideo);
    });
  }
};
handleCategory(1000);
loadCategory();
