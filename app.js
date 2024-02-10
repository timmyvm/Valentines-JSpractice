document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");

  // Set random initial position for each star
  stars.forEach(function (star) {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    star.style.left = randomX + "px";
    star.style.top = randomY + "px";
  });

  // Mouse move event listener to animate stars
  document.addEventListener("mousemove", function (e) {
    stars.forEach(function (star) {
      const randomDistanceX = (Math.random() - 0.5) * 2;
      const randomDistanceY = (Math.random() - 0.5) * 2;
      const currentX = parseFloat(star.style.left);
      const currentY = parseFloat(star.style.top);
      const newX = currentX + randomDistanceX;
      const newY = currentY + randomDistanceY;
      star.style.left = newX + "px";
      star.style.top = newY + "px";
    });
  });

  const messages = [
    "No Matter how many times you reload...",
    "The stars will always align differently...",
    "...",
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
    if (messageIndex === messages.length) {
      messageIndex--;
    }
  }

  // Display initial message
  displayNextMessage();

  // Add click event listener to display next message or show buttons
  document.addEventListener("click", function () {
    if (messageIndex < messages.length - 1) {
      displayNextMessage();
    } else if (messageIndex === messages.length - 1) {
      subtitle.classList.add("hidden");
      buttons.forEach(button => button.classList.remove("hidden"));

      // Load Lottie animation for the idle state
      const valentinesAnimation = lottie.loadAnimation({
        container: document.querySelector(".valentines__animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "animations/Animation - 1707449574597.json"
      });

      // Add event listeners for button clicks
      document.querySelector(".yes__button").addEventListener("click", function () {
        valentinesAnimation.destroy(); // Remove previous animation
        lottie.loadAnimation({
          container: document.querySelector(".valentines__animation"),
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "animations\Animation - 1707449685510.json"
        });
      });

      document.querySelector(".no__button").addEventListener("click", function () {
        valentinesAnimation.destroy(); // Remove previous animation
        lottie.loadAnimation({
          container: document.querySelector(".valentines__animation"),
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "animations\Animation - 1707450100299.json"
        });
      });
    }
  });
});
