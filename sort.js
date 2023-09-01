const handleSort = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categoryArr = data.data;
  categoryArr.forEach((category) => {
    console.log(category.category_id);
  });
};
// sortButton.addEventListener("click", () => {
//   sortedVideo = categoryVideo.sort((a, b) => {
//     const view1 = parseFloat(a.others.views);
//     const view2 = parseFloat(b.others.views);
//     if (view1 > view2) return -1;
//     else if (view1 < view2) return 1;
//     else return 0;
//   });
// });
