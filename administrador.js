const apiUrl = "https://raw.githubusercontent.com/cesarmcuellar/CuestionarioWeb/refs/heads/main/cuestionario.json";

document.addEventListener("DOMContentLoaded", async () => {
    
    
    const quizContainer = document.getElementById("quiz-container");
    
    
    const submitBtn = document.getElementById("submit-btn");
    
    
    const resultContainer = document.getElementById("result");
    
    
    const percentageDisplay = document.getElementById("percentage");

    let questions = [];

    try {
       
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API: ${response.status}');
        }

        const data = await response.json();
        console.log("Datos obtenidos de la API:", data); 

        
        if (!Array.isArray(data)) {
            throw new Error("El formato de los datos no es un array.");
        }

        questions = shuffleArray(data); 
        displayQuestions(questions, quizContainer);
    } catch (error) {
       
        console.error("Error cargando las preguntas:", error);
        
        
        quizContainer.innerHTML =
         "<p>Error cargando el cuestionario. Por favor, inténtelo más tarde.</p>";

        
        console.warn("Usando datos simulados");
        questions = getMockQuestions(); 
        displayQuestions(questions, quizContainer);
    }

    
    submitBtn.addEventListener("click", () => {
        const totalQuestions = questions.length;
        let correctAnswers = 0;

        questions.forEach((question, index) => {
            const userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
            if (userAnswer && userAnswer.value === question.correcta) {
                correctAnswers++;
            }
        });

        
        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        
        percentageDisplay.textContent = `Has obtenido un ${percentage}% `;
        
        
        resultContainer.classList.remove("hidden");
    });
});


function displayQuestions(questions, container) {
    
    container.innerHTML = ""; 
    
    questions.forEach((question, index) => {
    
    
        const questionDiv = document.createElement("div");
    
    
        questionDiv.classList.add("question");

        questionDiv.innerHTML = `
    
    
        <h3>${question.pregunta}</h3>
            ${question.respuestas.map((respuesta, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${respuesta}">
                    ${respuesta}
                </label>
            
            
                `).join("")}
        
        `;
        
        container.appendChild(questionDiv);
    
    
    });


}


function shuffleArray(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("shuffleArray esperaba un array.");
    }
    return array.sort(() => Math.random() - 0.5);
}


function getMockQuestions() {
    return [
        {
            pregunta: "¿capital de Francia?",
            respuestas: ["París", "Madrid", "Roma", "Berlín"],
            correcta: "París"
        },
        {
            pregunta: "¿Cuánto es 2 + 2?",
            respuestas: ["3", "4", "5", "6"],
            correcta: "4"
        },
        {
            pregunta: "¿que es el sol?",
            respuestas: ["Estrella", "Planeta", "Luna", "Cometa"],
            correcta: "Estrella"
        }
    ];
}