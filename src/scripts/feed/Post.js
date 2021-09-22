import { getLikes } from './../data/DataManager.js';

let result = undefined;
const getNumberOfLikes = (postId) => {
  getLikes(postId)
    .then(response => {
      document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
      const user = JSON.parse(sessionStorage.getItem("user"));
      result = response.find(({ userId }) => userId === user.id);
      if (result === undefined) {
        document.getElementById(`like__${postId}`).innerHTML = `<button id="like__${postId}">Like</button>`
      }
    })
}


export const Post = (postObject) => {
  return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
            <h3>${postObject.user.name}</h3>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <div id="like__${postObject.id}"></div>
        <button id="edit__${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button>
        </section>`
}