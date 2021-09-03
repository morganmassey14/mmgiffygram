
import { getPosts } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { getJokes } from "./data/JokesData.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/Footer.js"

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const theJokes = () => {
	const postElement = document.querySelector(".jokeList");
	getJokes().then(apiJoke => {
		postElement.innerHTML = `<h3>${apiJoke.joke}</h3>`
	})
}

const showFooter = () => {
    const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

const startGiffyGram = () => {
	showNavBar();
	theJokes();
	showPostList();
	showFooter();
}
startGiffyGram();
