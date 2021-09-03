const loggedInUser = {
	id: 1,
	name: "Morgan",
	dateJoined: 1630513631166,
	email: "morganne1170@gmail.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}

export const getUsers = () => {
	return fetch("http://localhost:8088/users")
		.then(response => response.json())
}

export const getPosts = () => {
	return fetch("http://localhost:8088/posts")
	.then(response => response.json())
}