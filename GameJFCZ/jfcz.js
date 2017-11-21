const defaultOption = [{
    speed: 200,
    waitBall: 2,
    initBall: 1
  },
  {
    speed: 180,
    waitBall: 3,
    initBall: 2
  },
  {
    speed: 150,
    waitBall: 4,
    initBall: 3
  },
  {
    speed: 120,
    waitBall: 5,
    initBall: 4
  },
  {
    speed: 100,
    waitBall: 6,
    initBall: 5
  },
  {
    speed: 70,
    waitBall: 7,
    initBall: 6
  },
  {
    speed: 40,
    waitBall: 8,
    initBall: 7
  }
]
let lv = document.getElementById('level')
let gameBox = document.getElementById('game')
let ctx = gameBox.getContext('2d')
let balls = []
let waitBalls = []
let menban = document.getElementById('menban')

function gameStart(option) {
  initGame(option)
}

function initGame(option) {
  ctx.clearRect(0, 0, 300, 600)
  for (let i = 0; i < option.initBall; i++) {
    balls.push({
      deg: i * 360 / option.initBall,
      str: ''
    })
  }
  for (let j = 0; j < option.waitBall; j++) {
    waitBalls.push({
      deg: 0,
      str: j + 1
    })
  };
  (function cir() {
    setTimeout(function () {
      ctx.clearRect(0, 0, 300, 600)
      centerBall(option)
      initBall(10)
      waitBall()
      cir()
    }, option.speed)
  })()
}

function centerBall(option) {
  frawCircle(150, 150, 50)
  drawText(`第${lv.innerText}关`, 150, 150, 20)
}
// 初始小球
function initBall(deg) {
  balls.map(function (item) {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.translate(150, 150)
    item.deg += deg
    item.deg = item.deg >= 360 ? item.deg - 360 : item.deg
    let x = 120 * Math.cos(item.deg * Math.PI / 180)
    let y = 120 * Math.sin(item.deg * Math.PI / 180)
    if (item.str != '') drawText(item.str, x, y, 12)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.closePath()
    frawCircle(x, y, 10)
    ctx.restore()
  })
}
// 等待小球
function waitBall() {
  waitBalls.map(function (item) {
    frawCircle(150, (300 + item.str * 30), 10)
    drawText(item.str, 150, (300 + item.str * 30), 12)
  })
}

function frawCircle(x, y, r) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fillStyle = '#000'
  ctx.fill()
  ctx.closePath()
}

function drawText(str, x, y, size) {
  ctx.beginPath()
  ctx.font = `${size}px 微软雅黑`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  ctx.fillText(str, x, y)
  ctx.closePath()
}

let state
menban.onclick = function () {
  if (waitBalls.length === 0) return
  let transferBall = waitBalls.shift()
  transferBall.deg = 90
  let faild = true
  balls.map(function (item, index) {
    if (!faild) return
    if (
      Math.abs(item.deg - transferBall.deg) <=
      Math.asin(10 / 120) * (180 / Math.PI)
    ) {
      state = 0
      faild = false
    } else if (waitBalls.length === 0 && index === balls.length - 1) {
      state = 1
      faild = false
    }
  })
  balls.push(transferBall)
  waitBall()
  initBall(0)
  if (state === 0) {
    alert('闯关失败')
    empty()
    if (lv.innerText >= 7) {
      alert('游戏结束')
      empty()
      lv.innerText = 1
    }
  } else if (state === 1) {
    alert('闯关成功')
    empty()
    lv.innerText = parseInt(lv.innerText) + 1
  }
}

function empty() {
  balls = []
  waitBalls = []
  state = undefined
  menban.style.display = 'none'
}