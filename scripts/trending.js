// let url = `https://api.themoviedb.org/3/discover/movie?api_key=df030b5d200eb1392bd0bd69fe42d520`
var trend = 1
// var movie = document.getElementById('movies')
for(let i=1;i<=8;i++){
    mainTrend(trend++)
}
async function mainTrend(trend){
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=df030b5d200eb1392bd0bd69fe42d520&page=${trend}`
    let data = await getMovies(url)
    appendData(data,trend)
}

async function getMovies(url,trend){
    try{
        let res = await fetch(url)
        let data = await res.json()
        return data.results
    }catch{
        console.log('error')
    }
}

function appendData(arr,id){
    let movie = document.getElementById(`trend${id}`)
    console.log(arr)
    movie.innerHTML=null
    arr.forEach(ele => {
        const query = document.createElement('div');
        query.setAttribute('class','query')            
        const pos = document.createElement('img');
        pos.src = `https://image.tmdb.org/t/p/w500${ele.poster_path}`
        const title = document.createElement('h4');
        title.innerText = ele.title
        const realease = document.createElement('p');
        realease.innerText = ele.release_date
        query.append(pos,title,realease)
        movie.append(query)
    });
}