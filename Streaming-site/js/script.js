


(function(){

   //code here
   const toggleButton = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.nav-sub');

toggleButton.addEventListener('click', () => {
   navbarLinks.classList.toggle('active');
})


let myObj;
async function getFile(file) {
   try {
      let myFile = await fetch(file);
      // console.log(myFile);
      myObj = await myFile.json();
      myObj = myObj.card;
      // console.log(myObj);
   } catch (err) {
      console.log(err);
   }
   let carousel = document.querySelector(".carousel");

   let createSlide = (i) => {

      let slide = document.createElement('a');
      let imgElement = document.createElement('img');
      let content = document.createElement('div');
      let contentHolder = document.createElement('div');
      let h1 = document.createElement('h1');
      let p = document.createElement('p');
      let playIcon = document.createElement('a');


      imgElement.appendChild(document.createTextNode(''));
      h1.appendChild(document.createTextNode(myObj[i].name));
      p.appendChild(document.createTextNode(myObj[i].des));
      playIcon.appendChild(document.createTextNode("Watch Now"));
      contentHolder.appendChild(h1);
      contentHolder.appendChild(p);
      contentHolder.appendChild(playIcon);
      content.appendChild(contentHolder);
      slide.appendChild(content);
      slide.appendChild(imgElement);
      carousel.appendChild(slide);

      //setting up image
      imgElement.src = myObj[i].image;
      imgElement.alt = myObj[i].name;
      playIcon.setAttribute('href', 'video.html');

      //setting classnames
      slide.className = 'swiper-slide';
      slide.classList.add("slid");
      contentHolder.className = 'content-holder';
      content.className = 'slide-content';
      h1.className = 'movie-title';
      p.className = 'movie-des';
      playIcon.className = "play-icon";
      slide.setAttribute('href', "./video.html");
   }
   for (let i = 0; i < 6; i++) {
      if (myObj[i].typ === "slider") {
         createSlide(i);
      }
   }
   let latestContainer = document.querySelector(".latest-container");
   let popularContainer = document.querySelector('.popular-container');
   let createCard = (i, store) => {
      let container = document.createElement('a');
      let imgContainer = document.createElement('img');
      let cardContent = document.createElement('div');
      let cardTitle = document.createElement('div');
      let cardDes = document.createElement('div');
      let playIcon = document.createElement('a');

      imgContainer.appendChild(document.createTextNode(''));
      cardTitle.appendChild(document.createTextNode(myObj[i].name));
      cardDes.appendChild(document.createTextNode(myObj[i].des));
      playIcon.appendChild(document.createTextNode("Watch Now"));
      cardContent.appendChild(cardTitle);
      cardContent.appendChild(cardDes);
      cardContent.appendChild(playIcon);
      container.appendChild(imgContainer);
      container.appendChild(cardContent);

      container.setAttribute('href', 'video.html');
      playIcon.setAttribute('href', 'video.html');
      if (store === "new") {
         latestContainer.appendChild(container);
      }
      else if (store > 3) {
         popularContainer.appendChild(container);
      }
      else if (store === "cricket") {
         cardContent.removeChild(cardDes);
         cardContent.removeChild(playIcon);
         latestContainer.appendChild(container);
      }
      else if (store === "football") {
         cardContent.removeChild(cardDes);
         cardContent.removeChild(playIcon);
         popularContainer.appendChild(container);
      }
      imgContainer.src = myObj[i].image;
      imgContainer.alt = myObj[i].name;

      container.className = "container";
      container.classList.add("swiper-slide");
      imgContainer.className = "img-container";
      cardContent.className = "card-content";
      cardTitle.className = "card-title";
      cardDes.className = "card-des";
      playIcon.className = "play-icon";
   }

   let store;

   let homeBtn = document.querySelector('#home-link');
   homeBtn.addEventListener('click', homeFun);

   function homeFun() {
      //latest movies and shows
      navbarLinks.classList.toggle('active');
      document.querySelector('.latest-container').innerHTML = " ";
      document.querySelector('.latest-header').innerHTML = "Latest Movies and Shows";
      for (let i = 0; i < myObj.length; i++) {
         if (myObj[i].typ === "non-slider") {
            if (myObj[i].period === "new") {
               if (myObj[i].category === "movie" || myObj[i].category === "tv") {
                  store = myObj[i].period;
                  createCard(i, store);
               }
            }
         }
      }

      //popular movies and shows
      document.querySelector('.popular-container').innerHTML = " ";
      document.querySelector('.popular-header').innerHTML = "Popular Shows and Movies";
      for (let j = 0; j < myObj.length; j++) {
         if (myObj[j].typ === "non-slider") {
            if (myObj[j].rating > 3) {
               if (myObj[j].category === "movie" || myObj[j].category === "tv") {
                  store = myObj[j].rating;
                  createCard(j, store);
               }
            }
         }
      }
   }

   homeFun();

   //when tv Button is clicked
   let tvBtn = document.querySelector('#tv-link');
   tvBtn.addEventListener("click", function () {

      navbarLinks.classList.toggle('active');
      document.querySelector('.latest-container').innerHTML = " ";
      //latest tv/shows
      document.querySelector('.latest-header').innerHTML = "Latest shows";
      for (let i = 0; i < myObj.length; i++) {
         if (myObj[i].typ === "non-slider") {
            if (myObj[i].period === "new") {
               if (myObj[i].category === "tv") {
                  store = myObj[i].period;
                  createCard(i, store);
               }
            }
         }
      }
      document.querySelector('.popular-container').innerHTML = " ";
      document.querySelector('.popular-header').innerHTML = "Popular shows";
      for (let j = 0; j < myObj.length; j++) {
         if (myObj[j].typ === "non-slider") {
            if (myObj[j].rating > 3) {
               if (myObj[j].category === "tv") {
                  store = myObj[j].rating;
                  createCard(j, store);
               }
            }
         }
      }
   });

   //when Movies Button is clicked
   let movieBtn = document.querySelector('#movies-link');
   movieBtn.addEventListener('click', function () {

      navbarLinks.classList.toggle('active');
      document.querySelector('.latest-container').innerHTML = " ";
      document.querySelector('.latest-header').innerHTML = "Latest movies";
      for (let i = 0; i < myObj.length; i++) {
         if (myObj[i].typ === "non-slider") {
            if (myObj[i].period === "new") {
               if (myObj[i].category === "movie") {
                  store = myObj[i].period;
                  createCard(i, store);
               }
            }
         }
      }
      document.querySelector('.popular-container').innerHTML = " ";
      document.querySelector('.popular-header').innerHTML = "Popular movies";
      for (let j = 0; j < myObj.length; j++) {
         if (myObj[j].typ === "non-slider") {
            if (myObj[j].rating > 3) {
               if (myObj[j].category === "movie") {
                  store = myObj[j].rating;
                  createCard(j, store);
               }
            }
         }
      }
   });
   //when sports button is clicked
   let sportsBtn = document.querySelector('#sports-link');
   sportsBtn.addEventListener('click', function () {

      navbarLinks.classList.toggle('active');
      document.querySelector('.latest-container').innerHTML = " ";
      document.querySelector('.latest-header').innerHTML = "Latest from cricket";
      for (let i = 0; i < myObj.length; i++) {
         if (myObj[i].typ === "non-slider") {
            if (myObj[i].category === "cricket") {
               store = myObj[i].category;
               createCard(i, store);
            }
         }
      }
      document.querySelector('.popular-container').innerHTML = " ";
      document.querySelector('.popular-header').innerHTML = "Latest from football";
      for (let j = 0; j < myObj.length; j++) {
         if (myObj[j].typ === "non-slider") {
            if (myObj[j].category === "football") {
               store = myObj[j].category;
               createCard(j, store);
            }
         }
      }
   });

   
   let search = document.getElementById("search-bar");
   search.addEventListener("input", searchCard);

   let search1= document.getElementById("search-item")
   search1.addEventListener("input",searchCard1);

   function searchCard() {  //whenever anything is written in the field this gets triggered
      let searchVal = search.value;
      console.log("input fired", searchVal);
      let card = document.getElementsByClassName("container");
      
      Array.from(card).forEach(function (element) {
       
         let cardTxt = element.querySelector('.card-title').innerHTML;
        
         if (cardTxt.toLowerCase().includes(searchVal.toLowerCase())) {
            element.style.display = "block";
            console.log("from includes",element);

         }
         else {
            element.style.display = "none";
            
         }
      });
   }
   function searchCard1() {
      let searchVal = search1.value;
      console.log("input fired", searchVal);
      let card = document.getElementsByClassName("container");
     
      Array.from(card).forEach(function (element) {
        
         let cardTxt = element.querySelector('.card-title').innerHTML;
        
         if (cardTxt.toLowerCase().includes(searchVal.toLowerCase())) {
            element.style.display = "block";
            console.log("from includes",element);

         }
         else {
            element.style.display = "none";
            
         }
      });
   }
}
getFile("data.json");
   })();



