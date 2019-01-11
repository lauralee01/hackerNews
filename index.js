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
								<li>${index}</strong>. ${data.title}</li>
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