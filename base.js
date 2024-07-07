const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
// let value = params.some_key; // "some_value"
console.log(params.id);
console.log(params.breed);

let myName = "";

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let starCount = 0
let totalStarCount = 0
let health = 100
let myWeapon = 1
let isGuest = true
let myBreed = 1

if (params.id) {
  isGuest = false
} else { 
  isGuest = true
  min = Math.ceil(1000);
  max = Math.floor(2000);
  id = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  myName = "guest_" + id
  document.getElementById("guestId").innerHTML = myName
}

if (params.breed) {
  myBreed = params.breed
}

document.getElementById("redeemBtn").style.display = "none"; 

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 100) {
  collisionsMap.push(collisions.slice(i, 100 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i))
}
console.log(charactersMap)

const boundaries = []
const offset = {
  x: -735,
  y: -650
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const battleZones = []
const characters = []

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const petImages = []
for (let i = 0; i < 7; i++) {
  let playerDownImage = new Image()
  playerDownImage.src = './img/playerDown_'+i+'.png'
  
  let playerUpImage = new Image()
  playerUpImage.src = './img/playerUp_'+i+'.png'
  
  let playerLeftImage = new Image()
  playerLeftImage.src = './img/playerLeft_'+i+'.png'
  
  let playerRightImage = new Image()
  playerRightImage.src = './img/playerRight_'+i+'.png'
  
  let playerStandRightImage = new Image()
  playerStandRightImage.src = './img/standRight_'+i+'.png'
  
  let playerStandLefttImage = new Image()
  playerStandLefttImage.src = './img/standLeft_'+i+'.png'

  let x = {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
    standLeft: playerStandLefttImage,
    standRight: playerStandRightImage
  }
  petImages.push(x);
 
}

console.log(petImages)

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown_' + myBreed + '.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp_' + myBreed + '.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft_' + myBreed + '.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight_' + myBreed + '.png'

const playerStandRightImage = new Image()
playerStandRightImage.src = './img/standRight_' + myBreed + '.png'

const playerStandLefttImage = new Image()
playerStandLefttImage.src = './img/standLeft_' + myBreed + '.png'

const poopImage = new Image()
poopImage.src = './img/poop.png'

const spiderImage = new Image()
spiderImage.src = './img/spider.png'

const mosquitoLeftImage = new Image()
mosquitoLeftImage.src = './img/mosquitoLeft.png'

const mosquitoRightImage = new Image()
mosquitoRightImage.src = './img/mosquitoRight.png'

const bugLeftImage = new Image()
bugLeftImage.src = './img/bugLeft.png'

const bugRightImage = new Image()
bugRightImage.src = './img/bugRight.png'

const starImage = new Image()
starImage.src = './img/star.png'

const healthKitImage = new Image()
healthKitImage.src = "./img/healthKit.png"

const gun1Image = new Image()
gun1Image.src = "./img/gun1.png"

const gun2Image = new Image()
gun2Image.src = "./img/gun2.png"

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
    standLeft: playerStandLefttImage,
    standRight: playerStandRightImage
  }
})


function showName(){
  var nameToDisplay = myName;
  if (myName.length > 8) {
    nameToDisplay = myName.slice(0, 8) + "...";
  }
  
  c.save()
  c.globalAlpha = this.alpha;
  c.fillStyle = "cyan";
  c.font = "15px Rubik";
  c.textAlign = "center";
  c.fillText(nameToDisplay, player.position.x + 24, player.position.y - 5);
  c.restore()
 }

const projectiles = [];
const stars = [];
const friends = [];
const enemies = [];
const particles = [];
const damageTexts = [];
const healthKits = [];
const weapons = [];

for (let i = 0; i < 3; i++) {
  let initDirection = ["up", "down", "right", "left"][Math.floor(Math.random() * 4)]
  let friend = new Friend({
    position: {
      x: player.position.x + (Math.floor(Math.random() * 800) - 200),
      y: player.position.y + 50 + Math.floor(Math.random() * 150),
    },
    image: playerDownImage,
    frames: {
      max: 4,
      hold: 10
    },
    sprites: petImages[Math.floor(Math.random() * 7)],
    direction: initDirection,
    name: dogNames[Math.floor(Math.random()*dogNames.length)]
  })
  
  friends.push(friend)
}

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters,
  ...friends,
]
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground,
  ...friends,
]

const battle = {
  initiated: false
}


function preShake() {
  c.save();
  var dx = Math.random()*10;
  var dy = Math.random()*10;
  c.translate(dx, dy);  
}

function postShake() {
  c.restore();
}

let damageVisualizationAlpha = 0

function animate() {
  const animationId = window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false

  showName();

  if (battle.initiated) return
  
  friends.forEach(friend => {
    friend.makeNextMove(player, boundaries)
    friend.showName()
  })
  
  enemies.forEach(enemy => {
    enemy.makeNextMove(player, boundaries)
    // check for enemy damage
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player})) {      
      if (enemy.attackCoolDown == 0) {
        health -= 50
  
        if (health < 0) health = 0
        document.getElementById('health').innerHTML = health

        if (health == 0){
          redeemStars();
          var gameOverModal = document.getElementById("gameOverModal");
          gameOverModal.style.display = "block";
          document.getElementById('totalStarCount').innerHTML = totalStarCount
          // cancelAnimationFrame(battleAnimationId)
          return
        }
        else{
          damageVisualizationAlpha = 0.2
        }
        audio.collectStar.play()
        enemy.attackCoolDown = 100
      }
      else  enemy.attackCoolDown--
    }
  })

  foreground.draw(); // to make sure enemies and friends are behind foreground objects

  // check for projectile hits
  projectiles.forEach((projectile, index) => {
    projectile.update()
    
    enemies.forEach(enemy => {
      if(rectangularCollision({rectangle1: enemy,
        rectangle2:{
          position: {
            x: projectile.position.x,
            y: projectile.position.y
          },
          height: projectile.radius,
          width: projectile.radius
        }
      })){
        enemy.life -= projectile.damage;
        damageTexts.push(new DamageText({
          position: {x: enemy.position.x + enemy.width / 2, y: enemy.position.y + enemy.height / 2},
          damagePt: -1 * projectile.damage
        }))

        if(enemy.life <= 0){
          // create explosion effects
          for (let i = 0; i < 12; i++){
            particles.push(
              new Particle({x: projectile.position.x, y: projectile.position.y, radius: Math.random() * 15, velocity: { x: (Math.random() - 0.5) * 10, y:(Math.random() - 0.5) * 10 }})
            )
          }

          // drop stars
          // for (let i = 0; i < (Math.floor(Math.random() * 4 + 1)); i++){
          for (let i = 0; i < enemy.reward; i++){
            let star = new Sprite({
              position: {
                x: enemy.position.x + enemy.width / 2 + (Math.random() - 0.5) * 60,
                y: enemy.position.y + enemy.height / 2 + (Math.random() - 0.5) * 60
              },
              image: starImage,
              frames: {
                max: 1,
                hold: 30
              },
            })
            renderables.push(star)
            movables.push(star)
            stars.push(star)
          }

          // drop healthkit
          if (Math.random() < 0.1) {
            let healthKit = new Sprite({
              position: {
                x: enemy.position.x + enemy.width / 2 + (Math.random() - 0.5) * 40,
                y: enemy.position.y + enemy.height / 2 + (Math.random() - 0.5) * 40
              },
              image: healthKitImage,
              frames: {
                max: 1,
                hold: 30
              },
            })
            renderables.push(healthKit)
            movables.push(healthKit)
            healthKits.push(healthKit)
          }

          // drop weapon
          if (Math.random() < 0.1) {
            let weapon = new Weapon({
              position: {
                x: enemy.position.x + enemy.width / 2 + (Math.random() - 0.5) * 100,
                y: enemy.position.y + enemy.height / 2 + (Math.random() - 0.5) * 100
              },
              image: gun1Image,
              frames: {
                max: 1,
                hold: 30
              },
              type: 2
            })
            renderables.push(weapon)
            movables.push(weapon)
            weapons.push(weapon)
          }

          // drop weapon
          if (Math.random() < 0.02) {
            let weapon = new Weapon({
              position: {
                x: enemy.position.x + enemy.width / 2 + (Math.random() - 0.5) * 100,
                y: enemy.position.y + enemy.height / 2 + (Math.random() - 0.5) * 100
              },
              image: gun2Image,
              frames: {
                max: 1,
                hold: 30
              },
              type: 4
            })
            renderables.push(weapon)
            movables.push(weapon)
            weapons.push(weapon)
          }

          enemy.position.x = -10000
        }
        
        projectiles.splice(index, 1)
        audio.pop.play()
      }
    })
  })

  // display explosion effects
  particles.forEach((particle, index) => {
    // particle.update()
    if (particle.alpha <= 0) {
      particles.splice(index, 1)
    }
    else{
      particle.update()
    }
  })

  damageTexts.forEach((damagetext, index) => {
    if (damagetext.alpha <= 0) {
      damageTexts.splice(index, 1)
    }
    else{
      damagetext.update()
    }
  })

  // check for star collection
  stars.forEach(star => {
    if (rectangularCollision({ rectangle1: star, rectangle2: player})) {
      star.position.x = -10000
      starCount++
      totalStarCount++
      document.getElementById('starCount').innerHTML = starCount
      if (!isGuest) document.getElementById("redeemBtn").style.display = "flex"
      audio.collectStar.play()
    }

    friends.forEach(friend => {
      if (rectangularCollision({ rectangle1: star, rectangle2: friend})) {
        star.position.x = -10000
      }
    })
  })

  // check for healthKit collection
  healthKits.forEach(healthKit => {
    if (rectangularCollision({ rectangle1: healthKit, rectangle2: player})) {
      healthKit.position.x = -10000
      health = 100
      document.getElementById('health').innerHTML = health
      audio.collectStar.play()
    }
  })
  
  // check for weapon collection
  weapons.forEach(weapon => {
    if (rectangularCollision({ rectangle1: weapon, rectangle2: player})) {
      weapon.position.x = -10000
      myWeapon = weapon.type
      audio.collectStar.play()
    }
  })

  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
      projectiles.forEach(projectile => {
        projectile.position.y += 3
      })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
      projectiles.forEach(projectile => {
        projectile.position.x += 3
      })
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
      projectiles.forEach(projectile => {
        projectile.position.y -= 3
      })
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
      projectiles.forEach(projectile => {
        projectile.position.x -= 3
      })
  }

  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    // spawn new friends
    if (Math.random() < 0.001) {
      let spawn = true
      let x = 400
      if (Math.random() > 0.5) x = -400

      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: {
              ...player,
              position: {
                x: player.position.x + x,
                y: player.position.y
              }
            },
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y
              }
            }
          })
        ) {
          spawn = false
          break
        }
      }
      if (spawn) {
        let initDirection = ["up", "down", "right", "left"][Math.floor(Math.random() * 4)]
        let friend = new Friend({
          position: {
            x: player.position.x + x,
            y: player.position.y,
          },
          image: playerDownImage,
          frames: {
            max: 4,
            hold: 10
          },
          sprites: petImages[Math.floor(Math.random() * 7)],
          direction: initDirection,
          name: dogNames[Math.floor(Math.random()*dogNames.length)]
        })
        
        friends.push(friend)
        renderables.push(friend)
        movables.push(friend)
      }
    }
    
    // spawn new enemies
    if (Math.random() < 0.005) {
      let spawn = true
      let x = 400
      if (Math.random() > 0.5) x = -400

      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: {
              ...player,
              position: {
                x: player.position.x + x,
                y: player.position.y
              }
            },
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y
              }
            }
          })
        ) {
          spawn = false
          break
        }
      }
      if (spawn) {
        let initDirection = ["up", "down", "right", "left"][Math.floor(Math.random() * 4)]
        let enemy;
        
        if (Math.random() < 0.25) {
          enemy = new Enemy({
            position: {
              x: player.position.x + x,
              y: player.position.y
            },
            image: bugLeftImage,
            frames: {
              max: 4,
              hold: 10
            },
            sprites: {
              up: bugLeftImage,
              left: bugLeftImage,
              right: bugRightImage,
              down: bugRightImage
            },
            direction: initDirection,
            life: 50,
            reward: 3
          })
        }
        else if (Math.random() < 0.40){
          enemy = new Enemy({
            position: {
              x: player.position.x + x,
              y: player.position.y
            },
            image: poopImage,
            frames: {
              max: 4,
              hold: 10
            },
            sprites: {
              up: poopImage,
              left: poopImage,
              right: poopImage,
              down: poopImage
            },
            direction: initDirection,
            life: 100,
            reward: 5
          })
        }
        else if (Math.random() < 0.80){
          enemy = new Enemy({
            position: {
              x: player.position.x + x,
              y: player.position.y
            },
            image: mosquitoLeftImage,
            frames: {
              max: 4,
              hold: 10
            },
            sprites: {
              up: mosquitoLeftImage,
              left: mosquitoLeftImage,
              right: mosquitoRightImage,
              down: mosquitoRightImage
            },
            direction: initDirection,
            life: 25,
            reward: 1
          })
        }
        else{
          enemy = new Enemy({
            position: {
              x: player.position.x + x,
              y: player.position.y
            },
            image: spiderImage,
            frames: {
              max: 4,
              hold: 10
            },
            sprites: {
              up: spiderImage,
              left: spiderImage,
              right: spiderImage,
              down: spiderImage
            },
            direction: initDirection,
            life: 50,
            reward: 3
          })
        }
        
        enemies.push(enemy)
        renderables.push(enemy)
        movables.push(enemy)
      }
    }
  }

  c.save()
  damageVisualizationAlpha -= 0.01
  if (damageVisualizationAlpha <= 0) damageVisualizationAlpha = 0
  c.fillStyle = 'red'
  c.globalAlpha = damageVisualizationAlpha
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()

}
animate()

let lastKey = ''
let lastProjectileTime = Date.now()
window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        // finish conversation
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    return
  }

  switch (e.key) {
    case ' ':
      
      if (myWeapon == 1) {
        let now = Date.now();
        if ((now - lastProjectileTime) > 100) {
          lastProjectileTime = now
        }
        else {
          return;
        }

        audio.bubble1.play()
        let projectileVelocity = 5
        
        if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
          projectileVelocity = 8
        }

        if (keys.w.pressed || lastKey === 'w') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2 + (Math.random() * 30 - 15), y: player.position.y + player.height / 2},
              velocity: { x: 0, y: -1 * projectileVelocity },
              damage: 25
            })
          )
        }
        else if (keys.s.pressed || lastKey === 's') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2 + (Math.random() * 30 - 15), y: player.position.y + player.height / 2},
              velocity: { x: 0, y: projectileVelocity },
              damage: 25
            })
          )
        }
        else if (keys.a.pressed || lastKey === 'a') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 + (Math.random() * 30 - 15)},
              velocity: { x: -1 * projectileVelocity, y: 0 },
              damage: 25
            })
          )
        }
        else if (keys.d.pressed || lastKey === 'd') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 + (Math.random() * 30 - 15)},
              velocity: { x: projectileVelocity, y: 0 },
              damage: 25
            })
          )
        }
      }
      else if (myWeapon == 2) {
        let now = Date.now();
        if ((now - lastProjectileTime) > 100) {
          lastProjectileTime = now
        }
        else {
          return;
        }

        audio.bubble1.play()
        let projectileVelocity = 5
        
        if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
          projectileVelocity = 8
        }

        if (keys.w.pressed || lastKey === 'w') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2 + (Math.random() * 30 - 15), y: player.position.y + player.height / 2},
              velocity: { x: (Math.random() - 0.5) * 5 , y: -1 * projectileVelocity },
              damage: 25
            })
          )
        }
        else if (keys.s.pressed || lastKey === 's') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2 + (Math.random() * 30 - 15), y: player.position.y + player.height / 2},
              velocity: { x: (Math.random() - 0.5) * 5 , y: projectileVelocity },
              damage: 25
            })
          )
        }
        else if (keys.a.pressed || lastKey === 'a') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 + (Math.random() * 30 - 15)},
              velocity: { x: -1 * projectileVelocity, y: (Math.random() - 0.5) * 5  },
              damage: 25
            })
          )
        }
        else if (keys.d.pressed || lastKey === 'd') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 + (Math.random() * 30 - 15)},
              velocity: { x: projectileVelocity, y: (Math.random() - 0.5) * 5  },
              damage: 25
            })
          )
        }
      }
      else if (myWeapon == 3) {
        let now = Date.now();
        if ((now - lastProjectileTime) > 100) {
          lastProjectileTime = now
        }
        else {
          return;
        }

        audio.bubble1.play()
        let projectileVelocity = 4

        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: 0 + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: projectileVelocity + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0)},
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: 0 + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: -projectileVelocity  + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: projectileVelocity + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: 0 + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: -projectileVelocity + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: 0 + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: projectileVelocity * 0.7 + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: projectileVelocity * 0.7 + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: -projectileVelocity * 0.7 + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: projectileVelocity * 0.7 + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: projectileVelocity * 0.7 + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: -projectileVelocity * 0.7 + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
        projectiles.push(
          new Projectile({
            position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2},
            velocity: { x: -projectileVelocity * 0.7 + ((keys.d.pressed) ? 3 : 0) - ((keys.a.pressed) ? 3 : 0), y: -projectileVelocity * 0.7 + ((keys.s.pressed) ? 3 : 0) - ((keys.w.pressed) ? 3 : 0) },
            damage: 25
          })
        )
      }
      else if (myWeapon == 4) {
        let now = Date.now();
        if ((now - lastProjectileTime) > 1500) {
          lastProjectileTime = now
        }
        else {
          return;
        }

        audio.bubble1.play()
        let projectileVelocity = 5
        
        if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
          projectileVelocity = 8
        }

        if (keys.w.pressed || lastKey === 'w') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2 + (Math.random() * 30 - 15), y: player.position.y + player.height / 2},
              velocity: { x: 0, y: -1 * projectileVelocity * 2 },
              damage: 50
            })
          )
        }
        else if (keys.s.pressed || lastKey === 's') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2 + (Math.random() * 30 - 15), y: player.position.y + player.height / 2},
              velocity: { x: 0, y: projectileVelocity * 2 },
              damage: 50
            })
          )
        }
        else if (keys.a.pressed || lastKey === 'a') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 + (Math.random() * 30 - 15)},
              velocity: { x: -1 * projectileVelocity * 2, y: 0 },
              damage: 50
            })
          )
        }
        else if (keys.d.pressed || lastKey === 'd') {
          projectiles.push(
            new Projectile({
              position: { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 + (Math.random() * 30 - 15)},
              velocity: { x: projectileVelocity * 2, y: 0 },
              damage: 50
            })
          )
        }
      }

      if (!player.interactionAsset) return

      // beginning the conversation
      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector('#characterDialogueBox').innerHTML = firstMessage
      document.querySelector('#characterDialogueBox').style.display = 'flex'
      player.isInteracting = true
      break
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      player.image = player.sprites.up
      break
    case 'a':
      keys.a.pressed = false
      player.image = player.sprites.standLeft
      break
    case 's':
      keys.s.pressed = false
      player.image = player.sprites.down
      break
    case 'd':
      keys.d.pressed = false
      player.image = player.sprites.standRight
      break
  }
})

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    // audio.Map.play()
    clicked = true
  }
})

function redeemStars() {
  if (starCount == 0) return;
  if (isGuest) return;
  
  var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getStarsFromGame";
  const request = {
    "pet_id": parseInt(params.id), "count": starCount
  };
  console.log(request);

  const options = {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
  };

  starCount = 0;
  document.getElementById("redeemBtn").style.display = "none";

  fetch(endpoint_url, options).then((response) => 
  {
    if(response.status == 200){
      document.getElementById('starCount').innerHTML = starCount;
      return response.text();
    }
    else{
        return "error";
    }
  })
  .then((text) => {
      console.log(text);
  });
}

document.getElementById("redeemBtn").addEventListener('click', redeemStars);


function getPetById() {
  var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getPetById";
  const request = {
    "pet_id": parseInt(params.id)
  };
  
  const options = {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
  };

  fetch(endpoint_url, options)
  .then((response) => { return response.json(); })
  .then((myJson) => {
      console.log(myJson);
      myName = myJson.name;
  });
}
getPetById();

if (isGuest == false) {
  document.getElementById("guestBox").style.display = "none";
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.image.src = image.src

    this.animate = animate
    this.sprites = sprites
    this.opacity = 1

    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )

    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}

class Monster extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation
    })
    this.health = 100
    this.isEnemy = isEnemy
    this.name = name
    this.attacks = attacks
  }

  // faint() {
  //   document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
  //   gsap.to(this.position, {
  //     y: this.position.y + 20
  //   })
  //   gsap.to(this, {
  //     opacity: 0
  //   })
  //   audio.battle.stop()
  //   audio.victory.play()
  // }

  // attack({ attack, recipient, renderedSprites }) {
  //   document.querySelector('#dialogueBox').style.display = 'block'
  //   document.querySelector('#dialogueBox').innerHTML =
  //     this.name + ' used ' + attack.name

  //   let healthBar = '#enemyHealthBar'
  //   if (this.isEnemy) healthBar = '#playerHealthBar'

  //   let rotation = 1
  //   if (this.isEnemy) rotation = -2.2

  //   recipient.health -= attack.damage

  //   switch (attack.name) {
  //     case 'Fireball':
  //       audio.initFireball.play()
  //       const fireballImage = new Image()
  //       fireballImage.src = './img/fireball.png'
  //       const fireball = new Sprite({
  //         position: {
  //           x: this.position.x,
  //           y: this.position.y
  //         },
  //         image: fireballImage,
  //         frames: {
  //           max: 4,
  //           hold: 10
  //         },
  //         animate: true,
  //         rotation
  //       })
  //       renderedSprites.splice(1, 0, fireball)

  //       gsap.to(fireball.position, {
  //         x: recipient.position.x,
  //         y: recipient.position.y,
  //         onComplete: () => {
  //           // Enemy actually gets hit
  //           audio.fireballHit.play()
  //           gsap.to(healthBar, {
  //             width: recipient.health + '%'
  //           })

  //           gsap.to(recipient.position, {
  //             x: recipient.position.x + 10,
  //             yoyo: true,
  //             repeat: 5,
  //             duration: 0.08
  //           })

  //           gsap.to(recipient, {
  //             opacity: 0,
  //             repeat: 5,
  //             yoyo: true,
  //             duration: 0.08
  //           })
  //           renderedSprites.splice(1, 1)
  //         }
  //       })

  //       break
  //     case 'Tackle':
  //       const tl = gsap.timeline()

  //       let movementDistance = 20
  //       if (this.isEnemy) movementDistance = -20

  //       tl.to(this.position, {
  //         x: this.position.x - movementDistance
  //       })
  //         .to(this.position, {
  //           x: this.position.x + movementDistance * 2,
  //           duration: 0.1,
  //           onComplete: () => {
  //             // Enemy actually gets hit
  //             audio.tackleHit.play()
  //             gsap.to(healthBar, {
  //               width: recipient.health + '%'
  //             })

  //             gsap.to(recipient.position, {
  //               x: recipient.position.x + 10,
  //               yoyo: true,
  //               repeat: 5,
  //               duration: 0.08
  //             })

  //             gsap.to(recipient, {
  //               opacity: 0,
  //               repeat: 5,
  //               yoyo: true,
  //               duration: 0.08
  //             })
  //           }
  //         })
  //         .to(this.position, {
  //           x: this.position.x
  //         })
  //       break
  //   }
  // }
}

class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    // c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Character extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = ['']
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })

    this.dialogue = dialogue
    this.dialogueIndex = 0
  }
}

class Weapon extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames,
    sprites,
    animate,
    rotation,
    scale,
    type,
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })
    this.type = type
  }
}



class Friend extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames,
    sprites,
    animate,
    rotation,
    scale,
    direction,
    name
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })
    this.direction = direction
    this.pause = 10
    this.sameDirectionCount = 0
    this.name = name
  }

  showName(){
    var nameToDisplay = this.name;
    if (this.name.length > 8) {
      nameToDisplay = this.name.slice(0, 8) + "...";
    }
    
    c.save()
    c.globalAlpha = this.alpha;
    c.fillStyle = "white";
    c.font = "15px Rubik";
    c.textAlign = "center";
    c.fillText(nameToDisplay, this.position.x + 24, this.position.y);
    c.restore()

  }

  changeDirection(){
    if (this.sameDirectionCount > 5){
      this.direction = ["up", "down", "right", "left"][Math.floor(Math.random() * 4)]
      this.sameDirectionCount = 0
    }
    else {
      this.sameDirectionCount += 1
    }
  }

  makeNextMove(player, boundaries){
    this.pause -= 1
    if (this.pause > 0) return

    let distance = {
      x: this.position.x - player.position.x,
      y: this.position.y - player.position.y
    }

    if (this.sameDirectionCount > 15) {
      if (Math.abs(distance.x) < 100 && Math.abs(distance.y) < 100) {
        if (Math.abs(distance.x) > Math.abs(distance.y)){
          if (distance.x > 0) {
            this.direction = "left";
          }
          else {
            this.direction = "right";
          }
        }
        else{
          if (distance.y > 0) {
            this.direction = "up";
          }
          else {
            this.direction = "down";
          }
        }

        this.sameDirectionCount = 0
      }
    }
    else {
      this.sameDirectionCount += 1
    }

    this.animate = true
    let friend1Moving = true

    // if already touches player, pause
    if (rectangularCollision({ rectangle1: this, rectangle2: player})) {
      friend1Moving = false
    }
  
    if (this.direction == "up"){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: this,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3
              }
            }
          })
        ) {
          friend1Moving = false
          this.changeDirection()
          break
        }
      }
    } 
  
    else if (this.direction == "right"){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: this,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y
              }
            }
          })
        ) {
          friend1Moving = false
          this.changeDirection()
          break
        }
      }
    }
      
    else if (this.direction == "left"){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: this,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y
              }
            }
          })
        ) {
          friend1Moving = false
          this.changeDirection()
          break
        }
      }
    }  
  
    else if (this.direction == "down"){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: this,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3
              }
            }
          })
        ) {
          friend1Moving = false
          this.changeDirection()
          break
        }
      }
    }
    
    if (!friend1Moving){
      this.animate = false
      this.image = this.sprites.down
      this.pause = 80
      return
    }
      
    if (friend1Moving){
      if (this.direction == "up"){
        this.position.y -= 3
        this.image = this.sprites.up
      }
      else if (this.direction == "right"){
        this.position.x += 3
        this.image = this.sprites.right
      }
        
      else if (this.direction == "left"){
        this.position.x -= 3
        this.image = this.sprites.left
      }  
    
      else if (this.direction == "down"){
        this.position.y += 3
        this.image = this.sprites.down
      }
    }  
  }
}

class Enemy extends Friend {
  constructor({
    position,
    velocity,
    image,
    frames,
    sprites,
    animate,
    rotation,
    scale,
    direction,
    life,
    reward
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale,
      direction,
    })
    this.direction = direction
    this.pause = 10
    this.sameDirectionCount = 0
    this.attackCoolDown = 10
    this.life = life
    this.reward = reward
  }
}

class Projectile {
  constructor({position, velocity, damage}){
    this.position = position
    this.velocity = velocity
    this.radius = 6
    this.decay = 40
    this.color = ["LightSalmon", "Yellow", "GreenYellow", "Aquamarine", "#DFFF00"][Math.floor(Math.random() * 5)]
    this.damage = damage
  }

  draw(){
    c.beginPath()
    var x = 100,
    y = 75,
    // Radii of the white glow.
    innerRadius = 5,
    outerRadius = 10,
    // Radius of the entire circle.
    radius = 10;

    var gradient = c.createRadialGradient(this.position.x, this.position.y, innerRadius, this.position.x, this.position.y, outerRadius);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, this.color);

    c.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
    c.fillStyle = gradient;
    c.fill();
    c.closePath()
  }

  update(){
    if (this.decay == 0) {
      this.position.x = -10000
      this.position.y = -10000
      return
    } 

    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.decay -= 1
  }
}

const friction = 0.99
class Particle {
  constructor({x, y, radius, velocity}){
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.alpha = 1
    this.color = ["LightSalmon", "Yellow", "GreenYellow", "Aquamarine", "#DFFF00"][Math.floor(Math.random() * 5)]
    //["#C5B9EE", "#90D3B9", "#C7EEFF", "#FFACCB", "#C2E498", "#E16A66"][Math.floor(Math.random() * 6)]
  }

  draw(){
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update(){
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.alpha -= 0.01
  }
}

class DamageText {
  constructor({position, damagePt}){
    this.position = position
    this.damagePt = damagePt
    this.alpha = 1
  }

  draw(){
    c.save()
    c.globalAlpha = this.alpha;
    c.fillStyle = "#E0394C";
    c.font = "bold 30px sans-serif";
    c.fillText(this.damagePt, this.position.x, this.position.y);
    c.restore()
  }

  update(){
    this.draw()
    this.alpha -= 0.05
  }
}