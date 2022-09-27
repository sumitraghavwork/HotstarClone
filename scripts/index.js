let imageArr = [
  'https://akamaividz2.zee5.com/image/upload/w_1188,h_475,c_scale,f_webp,q_auto:eco/resources/0-101-externall_1904997942/cover/wion1170mobile8abada64ed2b4ee493763e1de2c92dda.jpg',
  'https://akamaividz2.zee5.com/image/upload/w_1188,h_475,c_scale,f_webp,q_auto:eco/resources/0-6-1298/cover/1920x770d9ead07e5b304a989d85cf8c6e0113fb.jpg',
  'https://akamaividz2.zee5.com/image/upload/w_1188,h_475,c_scale,f_webp,q_auto:eco/resources/0-0-1z5146416/cover/1920x77030295e51fe54452d8c85e76c5ec756e8.jpg',
  'https://akamaividz2.zee5.com/image/upload/w_1188,h_475,c_scale,f_webp,q_auto:eco/resources/0-101-10z5145273/cover/1170x6582df54c70231d46be821e840ee96314a4.jpg',
  'https://akamaividz2.zee5.com/image/upload/w_1188,h_475,c_scale,f_webp,q_auto:eco/resources/0-0-1z5149852/cover/1920x770e865a5df0d5d45dca1c4e7f593ccbddfc265fab1f80b40ac84a2612281d61eed.jpg',
  'https://res.cloudinary.com/Sony-liv/image/fetch/c_fill,e_contrast:30,f_auto,fl_lossy,q_auto:low,w_1366/e_brightness:10/https://origin-staticv2.sonyliv.com/masthead_foreground/Upcoming_Foreground_rev1.png',
  'https://res.cloudinary.com/Sony-liv/image/fetch/c_fill,e_contrast:30,f_auto,fl_lossy,q_auto:low,w_1366/e_brightness:10/https://origin-staticv2.sonyliv.com/masthead_foreground/IND_V_IRL_1T20I_HL_foreground_rev.png',
  'https://res.cloudinary.com/Sony-liv/image/fetch/c_fill,e_contrast:30,f_auto,fl_lossy,q_auto:low,w_1366/e_brightness:10/https://origin-staticv2.sonyliv.com/masthead_foreground/ind_vd_IRL_T20_SponsorsB_foreground.png',
  'https://res.cloudinary.com/Sony-liv/image/fetch/c_fill,e_contrast:30,f_auto,fl_lossy,q_auto:low,w_1366/e_brightness:10/https://origin-staticv2.sonyliv.com/masthead_foreground/ENG_NZ_3TEST_D5_HLS_Foreground.png',
  'https://res.cloudinary.com/Sony-liv/image/fetch/c_fill,e_contrast:30,f_auto,fl_lossy,q_auto:low,w_1366/e_brightness:10/https://origin-staticv2.sonyliv.com/masthead_foreground/AvrodhS2_6_Foreground_Pradeep_free_ep.png',
  'https://tpc.googlesyndication.com/simgad/10641385997610156874?',
]
localStorage.setItem('images', JSON.stringify(imageArr))
function slideShow() {
  let images = JSON.parse(localStorage.getItem('images')) || []
  // console.log(images)
  let container = document.getElementById('slideshow')
  id = setInterval(function () {
    var image1 = document.createElement('img')
    // var image2 = document.createElement('img')
    image1.src = images[i++]
    // image2.src = images[i++]
    container.innerHTML = null
    container.append(image1)
    if (i >= images.length - 1) {
      i = 0
    }
    // document
    //   .querySelector('#slideshow>img')
    //   .addEventListener('mouseover', function () {
    //     clearInterval(id)
    //   })
    // document
    //   .querySelector('#slideshow>img')
    //   .addEventListener('mouseout', function () {
    //     slideShow()
    //   })
  }, 1000)
}
var id;
var i = 0;
window.addEventListener('load', function () {
  slideShow()
  fetchMovies()
})
document.getElementById('sort-lh').addEventListener('click', sortLH)
document.getElementById('sort-hl').addEventListener('click', sortHL)

function addGrid(arr) {
  document.getElementById('movies').innerHTML = null
  arr.forEach(function (ele) {
    const card = document.createElement('div')

    const poster = document.createElement('div');
    const image = document.createElement('img')
    image.src = ele.Poster
    poster.setAttribute('class','parent')
    image.setAttribute('class','image1')
    poster.append(image)

    const des = document.createElement('div')
    const name = document.createElement('h2')
    name.innerText = ele.Title
    const rating = document.createElement('h4');
    var rat = getRandomInt(6, 11)
    rating.innerText = `IMDB Rating: ${rat}`
    rating.style.color = 'yellow'
    if(rat>8.5){
      var recommend = document.createElement('img');
      recommend.src = './media/recommend.png'
      recommend.setAttribute('class','image2')
      poster.append(recommend)
    }
    const release = document.createElement('p')
    release.innerText = `Release Date: ${ele.Year}`
    des.append(name, release,rating)
    card.append(poster, des)
    document.getElementById('movies').append(card)
  })
}
function sortLH() {
  let arr = JSON.parse(localStorage.getItem('movies'))
  arr.sort(function (a, b) {
    return a.Year.substring(0, 4) - b.Year.substring(0, 4)
  })
  addGrid(arr)
}
function sortHL() {
  let arr = JSON.parse(localStorage.getItem('movies'))
  arr.sort(function (a, b) {
    return b.Year.substring(0, 4) - a.Year.substring(0, 4)
  })
  addGrid(arr)
}
function filterbyyear() {
  let year = document.getElementById('year').value
  document.getElementById('year').value = null
  if (year.length != 4) {
    alert('Please Enter Valid Year in YYYY format')
    return
  }
  let arr = JSON.parse(localStorage.getItem('movies'))
  let filtered = arr.filter(function (ele) {
    return ele.Year >= year
  })
  addGrid(filtered)
  localStorage.setItem('movies', JSON.stringify(filtered))
}
async function fetchMovies() {
  try {
    let res = await fetch(`https://www.omdbapi.com/?s=avengers&apikey=87440420`)
    let data = await res.json()
    let arr = data.Search
    localStorage.setItem('movies', JSON.stringify(arr))
    addGrid(arr)
  } catch {
    console.log('Error')
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}