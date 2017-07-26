/* MudClone - 2017 */
/* Unofficial Competitor To Google */
/* ---------- { G } ------------- */

{
	// this block jail sets up the jumping characters
	const appName = document.querySelector('#appName');
	appName.innerHTML = convertTextToSpanEl(appName.textContent)

	function convertTextToSpanEl(word) {
		return [...word].map(letter => `<span>${letter}</span>`).join('');
	}


} // ends


const apiKey = "AIzaSyCnLwzNb7oUcdavNeojQ9hi8frv0H0qx0w" 
const baseUrl = "https://www.googleapis.com/youtube/v3"

/* Helper Functions */

function get(id) {
	return document.getElementById(id)
} // helper function.. dammit man i hate jquery

function createStory(object) {
	// this function basically takes an object and builds a DOM element using data from the object 
	const tempDiv = document.createElement("div") ;
	tempDiv.classList.add("col","infoBox") ;
    tempDiv.innerHTML = `
        <div class="thumbnail">
          <img src="${object.snippet.thumbnails.high.url}">
        </div>
        <div class="excerpt">
          <span>${object.snippet.title}</span>
        </div>
        <button data-src="${object.id.videoId}" class="ctw">Click To Play  <i id="youtube-icon" class="fa fa-youtube-play"></i></button>
    `
    return tempDiv
}

/* end of Helper Functions */


/* Mudclone */

const searchButton = get("fake-search") ;
const row = document.querySelector("div[class='flex-grid-thirds']") ;

searchButton.addEventListener("click", event => {
	row.innerHTML = "" ;
	const query = encodeURIComponent(get("search-box").value) ;
	const json = fetch(`${baseUrl}/search?part=snippet&q=${query}&type=video&key=${apiKey}`)
		.then(data => data.json() )
		.then(json => {
			const videoObjects = json["items"].slice(0,4) ; // just extract 4 videos
			for (const obj of videoObjects) {
				row.appendChild(createStory(obj))
			}
		})
		.catch(err => console.log(err))
}) ;

window.addEventListener("click", event => {
	if (event.target.classList.contains("ctw")) {
		const watchUrl = `https://www.youtube.com/watch?v=${event.target.getAttribute("data-src")}` ;
		console.log(watchUrl) ;
		window.open(watchUrl,'_blank') ;
	} ;
})



/* ends here */

