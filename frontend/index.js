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
          return `${mentor.firstName} ${mentor.lastName}`; // Concatenating first name and last name
        }),
      };
      combinedData.push(result); // Add the result to the combinedData array
    });

    // Clear info paragraph and render learner cards
    combinedData.forEach((learner) => { // Loop over combined data to render cards
      const card = document.createElement("div"); // Create a new card element for each learner
      card.className = "card"; // Add a class to the card for styling
      
      const name = document.createElement("h3"); // Create element for learner's name
      name.textContent = learner.fullName; // Set text content to learner's full name
      card.appendChild(name); // Append name element to card

      const email = document.createElement("p"); // Create element for learner's email
      email.textContent = `Email: ${learner.email}`; // Set text content to learner's email
      card.appendChild(email); // Append email element to card

      const mentorsEl = document.createElement("h4"); // Create element for the "Mentors" label
      mentorsEl.textContent = "Mentors"; // Set text content to "Mentors"
      card.appendChild(mentorsEl); // Append mentors label to card
      
      const mentorList = document.createElement("ul"); // Create ul element for mentors list
      learner.mentors.forEach(mentorName => {
        const li = document.createElement("li"); // Create li element for each mentor
        li.textContent = mentorName; // Set text content to mentor's name
        mentorList.appendChild(li); // Append mentor item to mentors list
      });
      card.appendChild(mentorList); // Append mentors list to card

      cardsContainer.appendChild(card); // Append the completed card to the cards container

      // Initially hide the mentors list
      mentorList.style.display = 'none'; // Hide mentors list initially
      
      // Add click event listener to each card for selection
      card.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the event from bubbling to the document
        // Toggle the 'selected' class on the clicked card
        document.querySelectorAll('.card').forEach(c => {
          c.classList.remove('selected');
          c.querySelector('ul').style.display = 'none'; // Ensure mentors list is hidden in all cards
        });
        card.classList.toggle('selected'); // Toggle the 'selected' class on the clicked card
        mentorList.style.display = card.classList.contains('selected') ? '' : 'none'; // Show or hide the mentors list based on selection
        
        // Update info paragraph based on selection
        infoParagraph.textContent = card.classList.contains('selected') ?
          `The selected learner is ${learner.fullName}` : "No learner is selected";
      });
    });

    // Reset selection and info paragraph when clicking outside cards
    document.addEventListener('click', () => {
      document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
      document.querySelectorAll('.card ul').forEach(ul => ul.style.display = 'none'); // Hide all mentors lists
      infoParagraph.textContent = "No learner is selected"; // Reset info paragraph to initial state
    });

  } catch (error) { // Catch any errors that occur during fetching
    console.error("Failed to fetch data:", error);
    infoParagraph.textContent = "Failed to fetch learner cards."; // Notify user of error
  }

  // 👆 WORK WORK ABOVE THIS LINE
}


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();


