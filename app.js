document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
  
    stars.forEach(function (star) {
      // Set random initial position for each star
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      star.style.left = randomX + "px";
      star.style.top = randomY + "px";
    });
  
    document.addEventListener("mousemove", function (e) {
      stars.forEach(function (star) {
        // Calculate random distance for the star to travel
        const randomDistanceX = (Math.random() - 0.5) * 2; // Adjust the distance as needed
        const randomDistanceY = (Math.random() - 0.5) * 2; // Adjust the distance as needed
  
        // Get the current position of the star
        const currentX = parseFloat(star.style.left);
        const currentY = parseFloat(star.style.top);
  
        // Calculate the new position of the star
        const newX = currentX + randomDistanceX;
        const newY = currentY + randomDistanceY;
  
        // Apply the new position to the star
        star.style.left = newX + "px";
        star.style.top = newY + "px";
      });
    });
  
    const messages = [
      "No Matter how many times you reload...",
      "The stars will always align differently... ",
      ".....",
      "....",
      "I have a question C:",
      "Wanna be my valentines?",
      ""
    ];
  
    const subtitle = document.querySelector(".content__subtitle");
    const buttons = document.querySelectorAll(".button");
    let messageIndex = 0;
  
    // Function to display messages sequentially
    function displayNextMessage() {
      subtitle.innerHTML = messages[messageIndex];
      messageIndex++;
      // If all messages have been displayed, reset the index
      if (messageIndex === messages.length) {
        // Don't hide the subtitle or show buttons yet
        messageIndex--; // Decrement to keep showing the last message
      }
    }
  
    // Display initial message
    displayNextMessage();
  
    // Add click event listener to display next message or show buttons
    document.addEventListener("click", function () {
      if (messageIndex < messages.length - 1) {
        displayNextMessage();
      } else if (messageIndex === messages.length - 1) {
        // Hide the subtitle and show buttons
        subtitle.classList.add("hidden");
        buttons.forEach(button => button.classList.remove("hidden"));
      }
    });
  
    // Add event listener for yes button click
    document.querySelector(".yes__button").addEventListener("click", function () {
      // Handle yes button click
    });
  
    // Add event listener for no button click
    document.querySelector(".no__button").addEventListener("click", function () {
      // Handle no button click
    });
  });
  