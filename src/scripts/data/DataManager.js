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

let postCollection = [];

export const usePostCollection = () => {
	return [...postCollection];
}

export const getPosts = () => {
	return fetch("http://localhost:8088/posts")
		.then(response => response.json())
		.then(parsedResponse => {
			postCollection = parsedResponse
			return parsedResponse;
		})
}

export const getSinglePost = (postId) => {
	return fetch(`http://localhost:8088/posts/${postId}`)
	  .then(response => response.json())
  }
  

export const createPost = postObj => {
	return fetch("http://localhost:8088/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(postObj)

	}).then(response => response.json())
}

export const updatePost = postObj => {
	return fetch(`http://localhost:8088/posts/${postObj.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(postObj)
  
	})
		.then(response => response.json())
		
  }

export const deletePost = postId => {
	return fetch(`http://localhost:8088/posts/${postId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
  
	})
		.then(response => response.json())
  }


  