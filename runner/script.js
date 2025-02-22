const startDiv = document.getElementById("starting-div");
const hintDiv = document.getElementById("hint")
const startButton = document.getElementById("button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;

const proportionalSize = (size) => {
    return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

class Player {
  constructor() {
    this.position = {
        x: proportionalSize(20),
        y: proportionalSize(400)
    };
    this.velocity = {
        x: 0,
        y: 0,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);
  }
  draw() {
    if (keys.rightKey.pressed) ctx.fillStyle = "green";
    else if (keys.leftKey.pressed) ctx.fillStyle = "red";
    else ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width,this.height);
    if (keys.rightKey.pressed) {
      // overhere
      ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
      ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
      ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
      ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
      ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
      ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
    }
    else if (keys.leftKey.pressed) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(this.position.x + 8, this.position.y, this.width,this.height)
      ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
      ctx.fillRect(this.position.x + 20, this.position.y, this.width,this.height)
      ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      ctx.fillRect(this.position.x + 40, this.position.y, this.width,this.height)
    }

  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y = gravity;
        }
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
}

const player = new Player();

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
        player.velocity.x = 5;
    }
    else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
        player.velocity.x = -5;
    } 
    else {
        player.velocity.x = 0;
    }
}

const keys = {
    rightKey: {
        pressed: false,
    },
    leftKey: {
        pressed: false,
    }
}

const movePlayer = (key, xVelocity, isPressed) => {
    switch (key) {
      case "ArrowLeft":
        keys.leftKey.pressed = isPressed;
        if (xVelocity === 0) {
          player.velocity.x = xVelocity;
        }
        player.velocity.x -= xVelocity;
        break;
      case "ArrowUp":
      case " ":
      case "Spacebar":
        player.velocity.y -= 8;
        break;
      case "ArrowRight":
        keys.rightKey.pressed = isPressed;
        if (xVelocity === 0) {
          player.velocity.x = xVelocity;
        }
        player.velocity.x += xVelocity;
    }
  }

window.addEventListener("keydown", ({ key }) => {
   movePlayer(key, 8, true);
})

window.addEventListener("keyup", ({ key }) => {
   movePlayer(key, 0, false);
})


startDiv.classList.toggle("hidden"); 
canvas.classList.remove("hidden");
animate();

startButton.addEventListener("click", () => {
    startDiv.classList.add("fadeOut")
    startDiv.addEventListener("animationend", () => {
        startDiv.classList.toggle("hidden"); 
        canvas.classList.remove("hidden");
        animate();
        setTimeout(() => {
    hintDiv.classList.remove("hidden")
    hintDiv.classList.add("fadeIn");
}, 4000)

setTimeout(() => {
    hintDiv.classList.remove("fadeIn")
}, 5000)

setTimeout(() => {
    hintDiv.classList.add("fadeOut");
    hintDiv.addEventListener("animationend", () => {
      hintDiv.classList.add("hidden");
    }, { once: true})
}, 9000)
    }, { once: true});
})

