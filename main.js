const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
    .then(response => response.json())
    .then(data =>  {
        console.log(data);
        result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound('${data[0].phonetics[0].audio}')">
            <i class="fa-solid fa-volume-up"></i>
          </button>
        </div>
        <div class="detail">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
           ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""} 
        </p>
        `;
        
        // Memainkan audio jika tersedia
        if (data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
            playSound(`https:${data[0].phonetics[0].audio}`);
        } else {
            console.log("Tidak ada audio tersedia untuk kata ini.");
        }
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playSound(audioUrl) {
    const sound = new Audio(audioUrl);
    console.log("Memainkan audio...");
    sound.play();
}
