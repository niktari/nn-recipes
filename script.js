const spreadsheetId = '1v7buZDlZ1EsUrDacqeEkK3KgTNCA4JfYYwOrS-Mkpl4'
const tabName = 'Sheet1'
const myURL = `https://opensheet.elk.sh/${spreadsheetId}/${tabName}`

const firstMain = document.getElementById("first--main");
const firstSides = document.getElementById("first--sides");

const secondMain = document.getElementById("second--main");
const secondSides = document.getElementById("second--sides");

const regenerateButton = document.getElementById("regenerate");

fetchData();
triggerStars();

regenerateButton.onclick = function() {
    triggerStars();
    setTimeout(fetchData, 500);
}

async function fetchData() {
    try {
        const response = await fetch(myURL);
        const data = await response.json();

        const numRandoms = data.length;
        const uniqueRandoms = [];

        if (!uniqueRandoms.length) {
            for (let i = 0; i < numRandoms; i++) {
                uniqueRandoms.push(i);
            }
        }

        const index = Math.floor(Math.random() * uniqueRandoms.length);
        const firstIndex = uniqueRandoms[index];
        uniqueRandoms.splice(index, 1)[0];
        const secondIndex = uniqueRandoms[Math.floor(Math.random() * uniqueRandoms.length)];

        const firstMain = document.getElementById("first--main");
        const firstSides = document.getElementById("first--sides");
        const secondMain = document.getElementById("second--main");
        const secondSides = document.getElementById("second--sides");

        [firstMain, firstSides, secondMain, secondSides].forEach((el) =>
            el.parentElement.classList.add("hidden")
        );

        // Wait for the fade-out transition to finish
        setTimeout(() => {
            // Update the content
            if (!data[firstIndex].MainLink) {
                firstMain.innerHTML = `<li>${data[firstIndex].Main}</li>`;
            } else {
                firstMain.innerHTML = `<li><a href="${data[firstIndex].MainLink}" target="_blank">${data[firstIndex].Main} ↗</a></li>`;
            }

            if (!data[firstIndex].Side1Link) {
                firstSides.innerHTML = data[firstIndex].Side1;
            } else {
                firstSides.innerHTML = `<li><a href="${data[firstIndex].Side1Link}" target="_blank">${data[firstIndex].Side1} ↗</a></li>`;
            }

            if (!data[secondIndex].MainLink) {
                secondMain.innerHTML = `<li>${data[secondIndex].Main}</li>`;
            } else {
                secondMain.innerHTML = `<li><a href="${data[secondIndex].MainLink}" target="_blank">${data[secondIndex].Main} ↗</a></li>`;
            }

            if (!data[secondIndex].Side1Link) {
                secondSides.innerHTML = data[secondIndex].Side1;
            } else {
                secondSides.innerHTML = `<li><a href="${data[secondIndex].Side1Link}" target="_blank">${data[secondIndex].Side1} ↗</a></li>`;
            }

            // Remove the hidden class to trigger fade-in
            [firstMain, firstSides, secondMain, secondSides].forEach((el) =>
                el.parentElement.classList.remove("hidden")
            );
        }, 500); // Match this duration with the CSS `transition` duration
    } catch (error) {
        console.error(error);
    }
}

function triggerStars() {

for(let i = 0; i < 100; i++) {
    const newDiv = document.createElement("div");
    let newContent;
    
    if(Math.random() > 0.5) {
        newContent = document.createTextNode("Nikko");
        newDiv.classList.add("bg-green");
    } else {
        newContent = document.createTextNode("Nikki");
        newDiv.classList.add("bg-yellow");
    }
    newDiv.appendChild(newContent);
    newDiv.style.transform = `rotate(${Math.random() * 360}deg)`
    newDiv.classList.add("star");
    document.body.appendChild(newDiv)

    let stars = document.querySelectorAll(".star")

    for(let star of stars) {
        star.style.left = `${Math.random() * (100 - (-75)) + (-75)}vw`;
        star.style.animationDuration = `${(Math.random() * 2) + 1}s`;
        
        const randomRotation = Math.random() * 360 - 180;
        star.style.setProperty("--initial-rotation", `${randomRotation}deg`);
        
    }

    setTimeout(function() {
        document.body.removeChild(newDiv);
     }, 5000);

}

}