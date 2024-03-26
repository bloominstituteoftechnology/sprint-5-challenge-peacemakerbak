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
    const combinedData = learners.map((learner) => {
      // Map over learners and return a new object. Needed because we need to combine data
      return {
        ...learner,
        mentors: learner.mentors.map((mentorId) => {
          const mentor = mentors.find((m) => m.id === mentorId); // Find mentor by ID
          return mentor ? mentor.fullName : "Unknown"; // Return mentor name or 'Unknown'
        }),
      };
    });

    // Clear info paragraph and render learner cards
    combinedData.forEach((learner) => { // Loop over combined data so we can render cards
      const card = document.createElement("div"); // Create a new card element for each learner
      card.className = "card"; // Add a class to the card. Class is for styling
      card.innerHTML = `
        <h3> ${learner.fullName}</h3>
        <p>Email: ${learner.email}</p> 
        <ul>${learner.mentors.map((name) => <li>${name}</li>).join("")}</ul> // Populate mentors list with mentor names
      `; // Populate card with learner info and mentors
      cardsContainer.appendChild(card); // Append the card to the container

      // Initially hide the mentors list
      const mentorsList = card.querySelector('ul');
      mentorsList.style.display = 'none'; // Hide mentors list

      // Add click event listener to each card for selection
      card.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the event from bubbling to the document
        // Deselect all other cards
        document.querySelectorAll('.card').forEach(c => {
          c.classList.remove('selected');
          c.querySelector('ul').style.display = 'none'; // Hide mentors list in other cards
        });
        card.classList.toggle('selected'); // Toggle the 'selected' class on the clicked card
        mentorsList.style.display = mentorsList.style.display === 'none' ? '' : 'none'; // Toggle display of mentors list
        // Update info paragraph based on selection
        infoParagraph.textContent = card.classList.contains('selected') ?
          `The selected learner is ${learner.fullName}` : "No learner is selected";
      });
    });

    // Reset selection and info paragraph when clicking outside cards
    document.addEventListener('click', () => {
      document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
      document.querySelectorAll('.card ul').forEach(ul => ul.style.display = 'none'); // Hide all mentors lists
      infoParagraph.textContent = "No learner is selected"; // Reset info paragraph
    });

  } catch (error) { // Catch any errors that occur during fetching
    console.error("Failed to fetch data:", error);
    infoParagraph.textContent = "Failed to fetch learner cards."; // Notify user of error
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
