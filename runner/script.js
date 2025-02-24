const startDiv = document.getElementById("starting-div");
const hintDiv = document.getElementById("hint")
const startButton = document.getElementById("button");
const canvas = document.getElementById("canvas");
const levelNumberSpan = document.getElementById("level-span");
const levelNumberP = document.getElementById("level-p");
const ctx = canvas.getContext("2d");
let gravity = 1.5;
let playerAtTheBottom = false;
let theLevel = 2;
let didNotLose = true;

const proportionalSize = (size) => {
    return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

let platformsArray = [];

canvas.width  = innerWidth - proportionalSize(1);
canvas.height = innerHeight - proportionalSize(5);

const createPlatforms = () => {
  const scale = proportionalSize(400);
  let previousX = 0;
  for (let i = 0; i < 1000; i++) {
    const result = {
      x: parseInt(scale * (Math.random() + 0.4) * 3) + previousX,
      y: parseInt(canvas.height - (Math.random() * 150) - 80),
    }
    platformsArray.push(result);
    previousX = result.x;
  }
}

createPlatforms()

class Player {
  constructor() {
    this.position = {
        x: proportionalSize(400),
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
    switch (theLevel) {
       case 4:
        ctx.fillStyle = "limegreen";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "rgba(85, 255, 0, 0.1)";
        ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
        ctx.fillStyle = "rgba(85, 255, 0, 0.05)";
        ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
        ctx.fillStyle = "rgba(85, 255, 0, 0.01)";
        ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
       break;
       case 5: 
         ctx.fillStyle = "yellow";
         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
         ctx.fillStyle = "rgba(153, 255, 0, 0.1)";
         ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(153, 255, 0, 0.05)";
         ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(153, 255, 0, 0.01)";
         ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
       break;
       case 6:
         ctx.fillStyle = "lightyellow";
         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
         ctx.fillStyle = "rgba(221, 255, 0, 0.1)";
         ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(221, 255, 0, 0.05)";
         ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(221, 255, 0, 0.01)";
         ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
       break;
       case 7:
         ctx.fillStyle = "yellow";
         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
         ctx.fillStyle = "rgba(255, 255, 0, 0.1)";
         ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(225, 255, 0, 0.05)";
         ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(225, 255, 0, 0.01)";
         ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
       break;
       case 8:
         ctx.fillStyle = "orange";
         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
         ctx.fillStyle = "rgba(255, 196, 0, 0.1)";
         ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(225, 196, 0, 0.05)";
         ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(225, 196, 0, 0.01)";
         ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
       break;
       case 9:
         ctx.fillStyle = "orange";
         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
         ctx.fillStyle = "rgba(255, 196, 0, 0.1)";
         ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(225, 196, 0, 0.05)";
         ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(225, 196, 0, 0.01)";
         ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
       break;
       case 10:
         ctx.fillStyle = "darkorange";
         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
         ctx.fillStyle = "rgba(255, 149, 0, 0.1)";
         ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(255, 149, 0, 0.05)";
         ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
         ctx.fillStyle = "rgba(255, 149, 0, 0.01)";
         ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
        break;
        case 11: 
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
        ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
        ctx.fillStyle = "rgba(255, 0, 0, 0.05)";
        ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
        ctx.fillStyle = "rgba(255, 0, 0, 0.01)";
        ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
        break;
        default:
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
        ctx.fillRect(this.position.x - 8, this.position.y, this.width,this.height)
        ctx.fillStyle = "rgba(0, 255, 0, 0.05)";
        ctx.fillRect(this.position.x - 20, this.position.y, this.width,this.height)
        ctx.fillStyle = "rgba(0, 255, 0, 0.01)";
        ctx.fillRect(this.position.x - 40, this.position.y, this.width,this.height)
      }
    }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height - proportionalSize(40)) {
        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y = gravity;
        }
        else if (this.position.y <= canvas.height - proportionalSize(200)) {
          playerAtTheBottom = false;
        }
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
        playerAtTheBottom = true;
      }
    }
}

class Floor {
  constructor() {
    this.width = player.position.x + canvas.width;
    this.height = proportionalSize(40)
    this.position = {
      x: 0,
      y: canvas.height - proportionalSize(40)
    }
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Platform {
  constructor(xIn, yIn,) { 
    this.position = {
      x: xIn,
      y: yIn,
    }
    this.width = (40);
    this.height = canvas.height - yIn - proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

}

const platforms = platformsArray.map((platform) => new Platform(platform.x, platform.y))

const player = new Player();
const floor = new Floor();

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    floor.draw();
    platforms.forEach((platform) => {
      platform.draw()
    })
    platforms.forEach((platform) => {
      if (didNotLose) {
      platform.position.x -= theLevel * 2;        
      }
    })
    platforms.forEach((platform) => {
      const collisionDetectionRules = [
        player.position.y + player.height >= platform.position.y,
        player.position.y <= platform.position.y + platform.height,
        player.position.x + player.width >= platform.position.x,
        player.position.x <= platform.position.x + platform.width,
      ];
      if (collisionDetectionRules.every((rule) => rule === true)) {
        youLost();
      }
    });
}

const youLost = () => {
   didNotLose = false;
   player.velocity.y = 0;
   gravity = 0;
   alert("you lost. if you want to play again please refresh the page");
}

window.addEventListener("resize", () => {
  canvas.width  = innerWidth - proportionalSize(1);
  canvas.height = innerHeight - proportionalSize(5);

  player.position.x = Math.min(player.position.x, canvas.width - player.width);
  player.position.y = Math.min(player.position.y, canvas.height - player.height);
});


window.addEventListener("keydown", ({ key }) => {
  if (key === " " |key === "ArrowUp" && playerAtTheBottom && didNotLose) {
    player.velocity.y -= proportionalSize(28);
  }
})

startButton.addEventListener("click", () => {
    startDiv.classList.add("fadeOut")
    startDiv.addEventListener("animationend", () => {
        startDiv.classList.toggle("hidden"); 
        canvas.classList.remove("hidden");
        levelNumberSpan.textContent = theLevel - 1;
        animate();
        levelNumberP.classList.remove("hidden");
        levelNumberP.classList.add("fadeIn");
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

setInterval(() => {
  if (theLevel < 11 && didNotLose) {
    theLevel++;
    levelNumberSpan.textContent = theLevel - 1;
  }  
}, 15000)