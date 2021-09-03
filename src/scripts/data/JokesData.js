export const getJokes = () => {
	return fetch("https://icanhazdadjoke.com/",
        {headers: {
            Accept: "application/json",
        }})
		.then(response => response.json())
}
