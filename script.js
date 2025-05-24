const userForm = document.getElementById("user-form");
const quizForm = document.getElementById("quiz-form");
const quizContainer = document.getElementById("quiz-container");
const resultDiv = document.getElementById("result");

let userInfo = {};

// Sample questions and correct answers
const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
    },
    {
      id: 2,
      question: "Which programming language is used for web apps?",
      options: ["Python", "Java", "PHP", "All of the above"],
    },
    {
      id: 3,
      question: "Which of the following is a database management system?",
      options: ["Linux", "Oracle", "Git", "HTML"],
    },
    {
      id: 4,
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<hyper>"],
    },
    {
      id: 5,
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    },
    {
      id: 6,
      question: "Which symbol is used to comment in JavaScript?",
      options: [" <!-- --> ", " # ", "//", "**"],
    },
    {
      id: 7,
      question: "Which company developed the Java programming language?",
      options: ["Microsoft", "Oracle", "Sun Microsystems", "Google"],
    },
    {
      id: 8,
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Program Internet", "Applied Programming Input", "Advanced Protocol Interface"],
    },
    {
      id: 9,
      question: "Which of the following is not a programming language?",
      options: ["Python", "Java", "HTML", "C++"],
    },
    {
      id: 10,
      question: "Which of the following is used for version control?",
      options: ["Docker", "Kubernetes", "Git", "Node.js"],
    },
    {
      id: 11,
      question: "In SQL, which command is used to remove all records from a table?",
      options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    },
    {
      id: 12,
      question: "Which keyword is used to declare a constant in JavaScript?",
      options: ["let", "const", "var", "static"],
    },
    {
      id: 13,
      question: "What is the value of Boolean(0) in JavaScript?",
      options: ["true", "false", "undefined", "null"],
    },
    {
      id: 14,
      question: "Which protocol is used to send emails?",
      options: ["FTP", "HTTP", "SMTP", "TCP"],
    },
    {
      id: 15,
      question: "Which of these is a frontend framework?",
      options: ["Django", "Flask", "React", "Node.js"],
    },
  ];

const correctAnswers = {
    
        1: "Hyper Text Markup Language",
        2: "All of the above",
        3: "Oracle",
        4: "<a>",
        5: "Cascading Style Sheets",
        6: "//",
        7: "Sun Microsystems",
        8: "Application Programming Interface",
        9: "HTML",
        10: "Git",
        11: "TRUNCATE",
        12: "const",
        13: "false",
        14: "SMTP",
        15: "React",
  // Add correct answers for all questions here
};

// Function to show quiz questions
function displayQuiz() {
  let html = "";
  questions.forEach((q) => {
    html += `<div class="question">
      <p>${q.id}. ${q.question}</p>`;
    q.options.forEach((option) => {
      html += `<label><input type="radio" name="q${q.id}" value="${option}"> ${option}</label>`;
    });
    html += `</div>`;
  });
  html += `<button type="submit">Submit Quiz</button>`;
  quizForm.innerHTML = html;
  quizContainer.style.display = "block";
}

// Handle user details submission
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  // Simple validations (you can improve)
  if (name === "" || phone.length !== 10 || email === "") {
    alert("Please fill all fields correctly.");
    return;
  }

  userInfo = { name, phone, email };

  userForm.style.display = "none";
  displayQuiz();
});

// Handle quiz submission and send data to backend
quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;

  questions.forEach((q) => {
    const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    if (selected && selected.value === correctAnswers[q.id]) {
      score++;
    }
  });

  // Send data to backend API
  fetch("http://localhost:3000/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      score: score,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      resultDiv.innerHTML = `
        <h3>Hi, ${userInfo.name}!</h3>
        <p>Your Score: ${score} / ${questions.length}</p>
        <p>Email: ${userInfo.email}</p>
        <p>Phone: ${userInfo.phone}</p>
        <p> Thank you! Your quiz has been submitted successfully.</p>
      `;
      resultDiv.style.display = "block";
      quizForm.style.display = "none";
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      alert("Failed to save data, please try again later.");
    });
});

  
  