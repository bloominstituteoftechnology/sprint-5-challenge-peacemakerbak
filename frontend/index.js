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
    const learners = learnersResponse.data; // Get learners
    const mentors = mentorsResponse.data; // Get mentors

    // Combining the data
    const combinedData = [];
    learners.forEach((learner) => {
      // Utilize forEach over learners and return a new object. Needed because we need to combine data
      const result = {
        ...learner, // Taking existing learners & mapping mentors to search the list to match the ID to mentor itself
        mentors: learner.mentors.map((mentorId) => {
          const mentor = mentors.find((m) => m.id === mentorId); // Find mentor by ID
          return mentor ? `${mentor.firstName} ${mentor.lastName}` : "Unknown"; // Concatenating first name and last name, handling potential undefined mentor
        }),
      };
      combinedData.push(result); // Add the result to the combinedData array
    });

    combinedData.forEach((learner) => { // Loop over combined data to render cards
      const card = document.createElement("div");
      card.className = "card"; // Ensure card has only the 'card' class for styling
      
      const name = document.createElement("h3");
      name.textContent = learner.fullName; // Set text content to learner's full name
      card.appendChild(name);
      
      const email = document.createElement("p");
      email.textContent = `Email: ${learner.email}`; // Set text content to learner's email
      card.appendChild(email);

      const mentorsEl = document.createElement("h4");
      mentorsEl.textContent = "Mentors";
      card.appendChild(mentorsEl);
      
      const mentorList = document.createElement("ul");
      mentorList.style.display = 'none'; // Ensure mentors list is hidden on page load
      learner.mentors.forEach(mentorName => {
        const li = document.createElement("li");
        li.textContent = mentorName;
        mentorList.appendChild(li);
      });
      card.appendChild(mentorList); // Append mentors list to the card
      
      // Append the completed card to the cards container
      cardsContainer.appendChild(card);
      
      // Add click event listener to each card for interactivity
      card.addEventListener('click', function(e) {
        // Prevent the event from bubbling to the document
        e.stopPropagation();
        // Toggle the 'selected' class on the clicked card and update the mentors list display
        const isSelected = card.classList.contains('selected');
        document.querySelectorAll('.card').forEach(c => {
          c.classList.remove('selected');
          c.querySelector('ul').style.display = 'none'; // Ensure mentors list is hidden in all cards
        });
        if (!isSelected) {
          card.classList.add('selected');
          mentorList.style.display = '';
          infoParagraph.textContent = `The selected learner is ${learner.fullName}`;
        } else {
          infoParagraph.textContent = "No learner is selected";
        }
      });
    });

    // Update footer text to match the test requirement
    const footer = document.querySelector("footer");
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${new Date().getFullYear()}`;

  } catch (error) {
    console.error("Failed to fetch data:", error);
    infoParagraph.textContent = "Failed to fetch learner cards."; // Notify user of error
  }

  // Reset selection and info paragraph when clicking outside cards
  document.addEventListener('click', () => {
    document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.card ul').forEach(ul => ul.style.display = 'none'); // Hide all mentors lists
    infoParagraph.textContent = "No learner is selected"; // Reset info paragraph to initial state
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆
}



// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();


