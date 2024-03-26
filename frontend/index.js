async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const cardsContainer = document.querySelector(".cards"); // Select the container for the cards
  const infoParagraph = document.querySelector(".info"); // Select the info paragraph

  try {
    // Try to fetch data. Needed to catch errors
    const learnersResponse = await axios.get("http://localhost:3003/api/learners"); // Fetch learners HTML file.. line 14
    const mentorsResponse = await axios.get("http://localhost:3003/api/mentors"); // Fetch mentors
    const learners = learnersResponse.data; // Get learners
    const mentors = mentorsResponse.data; // Get mentors

    // Combining the data
    const combinedData = learners.map((learner) => {
      // Map over learners and return a new object. needed because we need to combine data
      return {...learner,
        mentors: learner.mentors.map((mentorId) => {
          const mentor = mentors.find((m) => m.id === mentorId); // Find mentor by ID
          return mentor ? mentor.fullName : "Unknown"; // Return mentor name or 'Unknown'
        }),
      };
    });

    // Clear info paragraph and render learner cards
    infoParagraph.textContent = ""; // Clear info paragraph
    combinedData.forEach((learner) => { // Loop over combined data so we can render cards
      const card = document.createElement("div"); // Create a new card element for each learner
      card.className = "card"; // Add a class to the card. class is for styling
      card.innerHTML = `
        <h3>${learner.fullName}</h3>
        <p>Email: ${learner.email}</p>
        <ul>${learner.mentors.map((name) => `<li>${name}</li>`).join("")}</ul>
      `;
      cardsContainer.appendChild(card);
    });

  } catch (error) { // Catch any errors that occur and give this repsonse
    console.error("Failed to fetch data:", error);
    infoParagraph.textContent = "Failed to fetch learner cards.";
  }



















  // Updated footer NO ISSUE
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
