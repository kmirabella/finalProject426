async function getDadJoke() {
    const joke = await axios({
        method: 'get',
        url: 'https://icanhazdadjoke.com/',
        withCredentials: true,
    });
    console.log(joke);
    const $root=$('#root');
    let layout = displayJoke(joke)
    $root.append(layout);
};

export const layout = function(joke) {
    let string = `
    <div data-id = ${joke.id} class ="joke"> 
        <div class="body">Dad Joke to get you through the semster: ${joke.joke}</div>
        <div class="button"> 
            <button class="newJoke" type="button">New Joke</button>
        </div>
    </div>`;

    return string;
}

function newJokeHander() {
    getDadJoke;
}

$(function() {
    getDadJoke();
    $(document).on('click', '.newJoke', newJokeHander);
})

