async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const cardsContainer = document.querySelector(".cards"); // Select the container for the cards
  const infoParagraph = document.querySelector(".info"); // Select the info paragraph
  infoParagraph.textContent = "No learner is selected"; // Set initial text for info paragraph

  try {
    // Try to fetch data. Needed to catch errors
    const learnersResponse = await axios.get("http://localhost:3003/api/learners"); // Fetch learners
    const mentorsResponse = await axios.get("http://localhost:3003/api/mentors"); // Fetch mentors
    const learners = learnersResponse.data; // Get learners data from response
    const mentors = mentorsResponse.data; // Get mentors data from response

    // Combining the data
    const combinedData = [];
    learners.forEach((learner) => {
      const result = {
        ...learner, // Taking existing learners & mapping mentors
        mentors: learner.mentors.map((mentorId) => {
          const mentor = mentors.find((m) => m.id === mentorId); // Find mentor by ID
          return mentor ? `${mentor.firstName} ${mentor.lastName}` : "Unknown"; // Concatenate names
        }),
      };
      combinedData.push(result);
    });

    combinedData.forEach((learner) => {
      const card = document.createElement("div");
      card.className = "card"; // Style the card
      
      const name = document.createElement("h3");
      name.textContent = learner.fullName;
      card.appendChild(name);
      
      const emailDiv = document.createElement("div");
      emailDiv.textContent = `Email: ${learner.email}`;
      card.appendChild(emailDiv);

      const mentorsEl = document.createElement("h4");
      mentorsEl.textContent = "Mentors";
      mentorsEl.classList.add("closed"); // Start as closed
      card.appendChild(mentorsEl);
      
      const mentorList = document.createElement("ul");
      mentorList.classList.add("closed"); // Mentors list hidden on page load
      learner.mentors.forEach(mentorName => {
        const li = document.createElement("li");
        li.textContent = mentorName;
        mentorList.appendChild(li);
      });
      card.appendChild(mentorList);

      cardsContainer.appendChild(card);

      // Toggle mentors list on h4 click
      mentorsEl.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop event from bubbling
        mentorList.classList.toggle("closed");
        mentorsEl.classList.toggle("open");
      });

      // Card click event for selection
      card.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop event from bubbling to document
        const isSelected = card.classList.toggle('selected');
        document.querySelectorAll('.card.selected').forEach(c => {
          if (c !== card) c.classList.remove('selected');
        });
        mentorList.style.display = isSelected ? '' : 'none'; // Toggle display of mentors list
        infoParagraph.textContent = isSelected ? `The selected learner is ${learner.fullName}` : "No learner is selected";
      });
    });

    // Clicking outside the cards
    document.addEventListener('click', () => {
      document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
      document.querySelectorAll('.card ul').forEach(ul => ul.style.display = 'none'); // Hide mentors lists
      infoParagraph.textContent = "No learner is selected";
    });

    const footer = document.querySelector("footer");
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${new Date().getFullYear()}`;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    infoParagraph.textContent = "Failed to fetch learner cards.";
  }
}





// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();


