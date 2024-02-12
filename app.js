document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const subtitle = document.querySelector(".content__subtitle");
  const buttons = document.querySelectorAll(".button");
  const idleAnimationContainer = document.querySelector(".idle__animation");
  const yesAnimationContainer = document.querySelector(".yes__animation");
  const noAnimationContainer = document.querySelector(".no__animation");
  const noButton = document.querySelector(".no__button");
  const test = document.querySelector(".test");

  let messageIndex = 0;
  let selectedButton = null;
  let hasStarted = false;

  function setRandomPosition(star) {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    star.style.left = randomX + "px";
    star.style.top = randomY + "px";
  }

  stars.forEach(setRandomPosition);

  document.addEventListener("mousemove", function () {
    stars.forEach(function (star) {
      const randomDistanceX = (Math.random() - 0.5) * 2.5;
      const randomDistanceY = (Math.random() - 0.5) * 2.5;
      const currentX = parseFloat(star.style.left);
      const currentY = parseFloat(star.style.top);
      const newX = currentX + randomDistanceX;
      const newY = currentY + randomDistanceY;
      star.style.left = newX + "px";
      star.style.top = newY + "px";
    });
  });

  const messages = [
    "No matter how many times you reload...",
    "The stars will always align differently...",
    "...",
    "I have a question C:",
    "Wanna be my valentine?",
    "",
  ];

  function displayNextMessage() {
    subtitle.innerHTML = messages[messageIndex];
    messageIndex++;
    if (messageIndex === messages.length) {
      messageIndex = 0;
    }
  }

  displayNextMessage();

  document.addEventListener("click", function () {
    if (messageIndex < messages.length - 1) {
      displayNextMessage();
    } else if (messageIndex === messages.length - 1) {
      subtitle.classList.add("hidden");
      buttons.forEach((button) => button.classList.remove("hidden"));
      loadIdleAnimation();
    }
  });

  function loadIdleAnimation() {
    idleAnimationContainer.innerHTML = `<lottie-player src="animations/Animation - 1707449574597.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>`;
  }

  document.querySelector(".no__button").addEventListener("click", function () {
    if (selectedButton === "yes") {
      yesAnimationContainer.classList.add("hidden");
    }
    idleAnimationContainer.classList.add("hidden");
    noAnimationContainer.innerHTML = `<lottie-player src="animations/Animation - 1707449685510.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>`;
    noAnimationContainer.classList.remove("hidden");
    selectedButton = "no";
  });

  document.querySelector(".yes__button").addEventListener("click", function () {
    console.log("clicked");

    if (selectedButton === "no") {
      noAnimationContainer.classList.add("hidden");
    }

    idleAnimationContainer.classList.add("hidden");

    yesAnimationContainer.innerHTML = `
      <lottie-player src="animations/Animation - 1707450100299.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>`;
    yesAnimationContainer.classList.remove("hidden");

    selectedButton = "yes";

    document.querySelector(".yes__text").classList.remove("hidden");

    document.querySelector(".yes__button").classList.add("hidden__button");
    document.querySelector(".no__button").classList.add("hidden__button");
  });

  // Button run

  noButton.addEventListener("click", function () {
    const yesButton = document.querySelector(".yes__button");
    const OFFSET = 100;
    let scaleFactor = 1;
    const scaleing = 1.5

    // Function to increase the scale of the yes__button
    function increaseButtonScale() {
        scaleFactor *= scaleing;
        yesButton.style.transform = `scale(${scaleFactor})`;

        // Repeat the function call until the scale reaches 5
        if (scaleFactor < 5) {
            setTimeout(increaseButtonScale, 1500);
        }
    }

    // Start increasing the scale
    increaseButtonScale();

    document.addEventListener("mousemove", (e) => {
        const x = e.pageX;
        const y = e.pageY;
        const buttonBox = noButton.getBoundingClientRect();
        const horizontalDistanceFrom = distanceFromCenter(
            buttonBox.x,
            x,
            buttonBox.width
        );
        const verticalDistanceFrom = distanceFromCenter(
            buttonBox.y,
            y,
            buttonBox.height
        );
        const horizontalOffset = buttonBox.width / 2 + OFFSET;
        const verticalOffset = buttonBox.height / 2 + OFFSET;

        if (
            Math.abs(horizontalDistanceFrom) <= horizontalOffset &&
            Math.abs(verticalDistanceFrom) <= verticalOffset &&
            buttonBox.width !== 0 &&
            buttonBox.height !== 0
        ) {
            setButtonPosition(x, y, buttonBox.width, buttonBox.height);
        }
    });

    function setButtonPosition(mouseX, mouseY, buttonWidth, buttonHeight) {
        const windowBox = document.body.getBoundingClientRect();
        const distanceX = mouseX - (windowBox.left + windowBox.width / 2);
        const distanceY = mouseY - (windowBox.top + windowBox.height / 2);
        let newX = mouseX + distanceX - buttonWidth / 2; 
        let newY = mouseY + distanceY - buttonHeight / 2; 

        if (distanceFromCenter(newX, windowBox.left, buttonWidth) < 0) {
            newX = windowBox.right - buttonWidth - OFFSET;
        }
        if (
            distanceFromCenter(newX + buttonWidth, windowBox.right, buttonWidth) > 0
        ) {
            newX = windowBox.left + OFFSET;
        }
        if (distanceFromCenter(newY, windowBox.top, buttonHeight) < 0) {
            newY = windowBox.bottom - buttonHeight - OFFSET;
        }
        if (
            distanceFromCenter(
                newY + buttonHeight,
                windowBox.bottom,
                buttonHeight
            ) > 0
        ) {
            newY = windowBox.top + OFFSET;
        }

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    function distanceFromCenter(boxPosition, mousePosition, boxSize) {
        return boxPosition - mousePosition + boxSize / 2;
    }
});

});
