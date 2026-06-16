function setLoadingState(isLoading) {

    const buttons = [
        "explainBtn",
        "summarizeBtn",
        "quizBtn",
        "flashcardBtn"
    ];

    buttons.forEach(id => {
        document.getElementById(id).disabled = isLoading;
    });

}


async function sendRequest(url, payload) {

    const responseBox =
        document.getElementById("responseText");

    responseBox.innerText = "Loading...";

    setLoadingState(true);

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(payload)

        });

        const data = await response.json();

        responseBox.innerText = data.response;

    }

    catch(error) {

        console.error(error);

        responseBox.innerText =
            "Something went wrong. Please try again.";

    }

    finally {

        setLoadingState(false);

    }

}



// 📘 Explain Topic

document.getElementById("explainBtn")
.addEventListener("click", function () {

    const topic =
        document.getElementById("topicInput").value;

    if (!topic.trim()) {

        document.getElementById("responseText")
        .innerText = "Please enter a topic.";

        return;

    }

    sendRequest("/explain", {

        topic: topic

    });

});



// 📝 Summarize Notes

document.getElementById("summarizeBtn")
.addEventListener("click", function () {

    const notes =
        document.getElementById("notesInput").value;

    if (!notes.trim()) {

        document.getElementById("responseText")
        .innerText = "Please enter notes.";

        return;

    }

    sendRequest("/summarize", {

        notes: notes

    });

});



// ❓ Practice Quiz

document.getElementById("quizBtn")
.addEventListener("click", function () {

    const notes =
        document.getElementById("notesInput").value;

    if (!notes.trim()) {

        document.getElementById("responseText")
        .innerText = "Please enter notes.";

        return;

    }

    sendRequest("/quiz", {

        notes: notes

    });

});



// 🧠 Flashcards

document.getElementById("flashcardBtn")
.addEventListener("click", function () {

    const notes =
        document.getElementById("notesInput").value;

    if (!notes.trim()) {

        document.getElementById("responseText")
        .innerText = "Please enter notes.";

        return;

    }

    sendRequest("/flashcards", {

        notes: notes

    });

});