let results = " ";
const app = document.querySelector("#app");

fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
	.then(response => response.json())
	.then(data => {
		let posts = data.slice(0, 10);
		posts
			.sort((x, y) => x - y)
			.forEach((post, index) => {
				fetch(`https://hacker-news.firebaseio.com/v0/item/${post}.json?print=pretty`)
					.then(response => response.json())
					.then(data => {
						results += `
							<ul class="card">
								<li><strong>${index}</strong>. ${data.title}</li>
								<li>${data.score} points by <em>${data.by}</em> &mdash; ${new Date(
									data.time).getMinutes()} minutes ago | ${data.descendants} comments</li>
							</ul>
							`;
							app.innerHTML = results;
					})
					.catch(err => console.log(err));
				});

})
.catch(err => console.log(err));
search = () => {
	
	let input,filter,newsList,li,i;
		input = document.getElementById('myInput');
		filter = input.value.toUpperCase();
		newsList = document.getElementsByClassName('card');
			for (i = 0; i < newsList.length; i++) {
				li = newsList[i]
				if(li.textContent.toUpperCase().indexOf(filter) > -1) {
					newsList[i].style.display = "block";
				} else {
					newsList[i].style.display = "none";
				}
			}
}