
import { getPosts, createPost, usePostCollection, deletePost, getSinglePost, updatePost, getLoggedInUser, logoutUser, setLoggedInUser, loginUser, registerUser } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { getJokes } from "./data/JokesData.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/Footer.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"

const applicationElement = document.querySelector("nav");
const formElement = document.querySelector(".giffygram")

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts()
		.then((allPosts) => {
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

const showPostEntry = () => {
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}

const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
}

const checkForUser = () => {
	if (sessionStorage.getItem("user")){
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
	  startGiffyGram();
	}else {
		 showLoginRegister();
	}
}

const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
}


applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		console.log("You clicked on logout")
	}
})

applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
		const yearAsNumber = parseInt(event.target.value)
		console.log(`User wants to see posts since ${yearAsNumber}`)
		//invoke a filter function passing the year as an argument
		showFilteredPosts(yearAsNumber);
	}
})

formElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		showPostList();
		showPostEntry();
		//clear the input fields
	}
})

formElement.addEventListener("click", event => {
	console.log("eventTarget", event.target.id);
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
		const postId = event.target.id.split("__")[1];
		deletePost(postId)
			.then(response => {
				showPostList();
			})
	}
})

formElement.addEventListener("click", event => {
	event.preventDefault();
	console.log(event.target.id);
	if (event.target.id === "newPost__submit") {
		//collect the input values into an object to post to the DB
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		//we have not created a user yet - for now, we will hard code `1`.
		//we can add the current time as well
		const userId = JSON.parse(sessionStorage.getItem("user"))
		
		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: userId.id,
			timestamp: Date.now()
		}

		// be sure to import from the DataManager
		createPost(postObject)
			.then(dbResponse => {
				showPostList();
			});
	}
})


formElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
		const postId = event.target.id.split("__")[1];
		//collect all the details into an object
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		const timestamp = document.querySelector("input[name='postTime']").value

		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: parseInt(timestamp),
			id: parseInt(postId)
		}

		updatePost(postObject)
			.then(response => {
				showPostList();
				showPostEntry();
			})
	}
})



formElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		const postId = event.target.id.split("__")[1];
		getSinglePost(postId)
			.then(response => {
				showEdit(response);
			})
	}
})

formElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		console.log(getLoggedInUser());
	}
})

//we're looking for the sumbit, then it creates an object with the name and email, then it is invoking loggedInUser
formElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	  }
	  loginUser(userObject)
	  .then(dbUserObj => {
		if(dbUserObj){
		  sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		  startGiffyGram();
		}else {
		  //got a false value - no user
		  const entryElement = document.querySelector(".entryForm");
		  entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		}
	  })
	}
  })
  
  //User completes registration form,
  formElement.addEventListener("click", event => {
	event.preventDefault();
//click submit button	
	if (event.target.id === "register__submit") {
//collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	  }
	  registerUser(userObject)
	  .then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
	  })
	}
  })  

//click event for the logout
  formElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	 //clear the session strorage 
	  sessionStorage.clear();
	 //knows its now empty 
	  checkForUser();
	}
  })
  

const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
		if (singlePost.timestamp >= epoch) {
			return singlePost
		}
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
}

const startGiffyGram = () => {
	showNavBar();
	showPostEntry();
	theJokes();
	showPostList();
	showFooter();


}
// startGiffyGram();
checkForUser();
