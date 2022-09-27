var id;
async function fetchData(title) {
  try {
    let res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=87440420`)
    let data = await res.json()
    if (data.Response == 'False') {
      throw Error
    }
    let arr = []
    arr.push(data)
    localStorage.setItem('searchedMovie', JSON.stringify(arr))
    window.location.href = 'search.html'
  } catch {
    console.log('Error')
  }
}

async function debounce(fn,delay) {
  if(id) {
    clearTimeout(id)
  }
  id = setTimeout(function () {
    fn()
  }, delay)
}

async function main() {
  let title = document.getElementById('search-bar').value
  let data = await getData(title)
  appendQuery(data)
}

async function getData(title) {
  let url = `https://www.omdbapi.com/?s=${title}&apikey=87440420`
  try {
    let res = await fetch(url)
    let data = await res.json()
    return data.Search    
  } catch {
    console.log('Error in Main Function')
  }
}

function appendQuery(arr) {
  let query = document.getElementById('query')
  if(arr==undefined){
    query.innerHTML = null
    return
  }
  // console.log(arr)  
  query.innerHTML = null
  arr.forEach(function(ele,i){
    const avatar = document.createElement('div');
    const image = document.createElement('img');
    image.src = ele.Poster
    avatar.append(image)
    const name = document.createElement('p');
    name.innerText = ele.Title
    // console.log(ele.Title,name)
    const card = document.createElement('div');
    card.setAttribute('class','queries')
    card.append(avatar,name)
    card.addEventListener('click',function(){
      fetchData(ele.Title)
    })
    query.append(card)
  });
}
