let pool = []
let defaultOption = {
  el: '',
  width: 4,
  height: 4,
  padding: 18,
  block_size: 100,
  boxStyle: {
    backGround: {
      backgroundColor: 'rgb(127,105,138)',
      position: 'relative',
      overflow: 'hidden'
    },
    BlockStyle: {
      fontFamily: '微软雅黑',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'rgb(200,200,200)',
      position: 'absolute'
    }
  },
  level: [
    {
      lv: 0,
      value: '',
      style: {}
    },
    {
      lv: 1,
      value: 2,
      style: {
        backgroundColor: 'rgb(238,228,218)',
        color: 'rgb(124,115,106)',
        fontSize: 58
      }
    },
    {
      lv: 2,
      value: 4,
      style: {
        backgroundColor: 'rgb(236,224,200)',
        color: 'rgb(124,115,106)',
        fontSize: 58
      }
    },
    {
      lv: 3,
      value: 8,
      style: {
        backgroundColor: 'rgb(242,177,121)',
        color: 'rgb(255,247,235)',
        fontSize: 58
      }
    },
    {
      lv: 4,
      value: 16,
      style: {
        backgroundColor: 'rgb(245,149,99)',
        color: 'rgb(255,250,235)',
        fontSize: 50
      }
    },
    {
      lv: 5,
      value: 32,
      style: {
        backgroundColor: 'rgb(244,123,94)',
        color: 'rgb(255,247,235)',
        fontSize: 50
      }
    },
    {
      lv: 6,
      value: 64,
      style: {
        backgroundColor: 'rgb(247,93,59)',
        color: 'rgb(124,115,106)',
        fontSize: 50
      }
    },
    {
      lv: 7,
      value: 128,
      style: {
        backgroundColor: 'rgb(236,205,112)',
        color: 'rgb(255,247,235)',
        fontSize: 42
      }
    },
    {
      lv: 8,
      value: 256,
      style: {
        backgroundColor: 'rgb(237,204,97)',
        color: 'rgb(255,247,235)',
        fontSize: 42
      }
    },
    {
      lv: 9,
      value: 512,
      style: {
        backgroundColor: 'rgb(236,200,80)',
        color: 'rgb(255,247,235)',
        fontSize: 42
      }
    },
    {
      lv: 10,
      value: 1024,
      style: {
        backgroundColor: 'rgb(238,197,63)',
        color: 'rgb(255,247,235)',
        fontSize: 34
      }
    },
    {
      lv: 11,
      value: 2048,
      style: {
        backgroundColor: 'rgb(238,194,46)',
        color: 'rgb(255,247,235)',
        fontSize: 34
      }
    },
    {
      lv: 12,
      value: 4096,
      style: {
        backgroundColor: 'rgb(61,58,61)',
        color: 'rgb(255,247,235)',
        fontSize: 34
      }
    },
    {
      lv: 13,
      value: 8192,
      style: {
        backgroundColor: 'rgb(126,228,20)',
        color: 'rgb(255,247,235)',
        fontSize: 34
      }
    },
    {
      lv: 14,
      value: 16384,
      style: {
        backgroundColor: 'rgb(200,122,122)',
        color: 'rgb(255,247,235)',
        fontSize: 26
      }
    }
  ]
}
let option
let allRandom = []

function start_game(json) {
  // 更新配置文件
  option = $.fn.extend(true, {}, defaultOption, json)
  createGameBox(option.el)

  allRandom = AllXY()
  for (let x = 0; x < option.width; x++) {
    for (let y = 0; y < option.height; y++) {
      pool.push(new GameBlock(x, y, 0))
    }
  }
  initBlock()
  initBlock()
  console.log(pool)
}
// 创建游戏区域
function createGameBox(el) {
  //创建背景
  el.css(option.boxStyle.backGround).css({
    borderRadius: `${option.padding}px`,
    width: `${option.width * (option.block_size + option.padding) +
      option.padding}px`,
    height: `${option.height * (option.block_size + option.padding) +
      option.padding}px`
  })
  //创建游戏方块
  let blockBox = $('<div></div>').css({
    margin: `${option.padding}px`,
    width: `${(option.padding + option.block_size) * (option.width - 1) +
      option.block_size}px`,
    height: `${(option.padding + option.block_size) * (option.height - 1) +
      option.block_size}px`,
    position: 'relative'
  })
  for (var y = 0; y < option.height; y++) {
    for (var x = 0; x < option.width; x++) {
      $(`<div></div>`)
        .css({
          left: `${(option.padding + option.block_size) * x}px`,
          top: `${(option.padding + option.block_size) * y}px`,
          width: `${option.block_size}px`,
          height: `${option.block_size}px`,
          lineHeight: `${option.block_size}px`
        })
        .css(option.boxStyle.BlockStyle)
        .appendTo(blockBox)
    }
  }
  blockBox.appendTo(option.el)
}
// 创建游戏块类
class GameBlock {
  constructor(x, y, level) {
    this.isMoved = true
    this.numx = x
    this.numy = y
    this.level = level
    this.value = option.level[this.level].value
    this.block = $(`<div>${this.value}</div>`)
      .css({
        left: `${(option.padding + option.block_size) * x + option.padding}px`,
        top: `${(option.padding + option.block_size) * y + option.padding}px`,
        width: `${option.block_size}px`,
        height: `${option.block_size}px`,
        lineHeight: `${option.block_size}px`
      })
      .css(option.boxStyle.BlockStyle)
      .css(option.level[level].style)
      .appendTo(option.el)
  }
  // 运动块方法
  moveGameBlock() {
    this.isMoved = false
    this.block.animate(
      {
        left: `${(option.padding + option.block_size) * this.numx +
          option.padding}px`,
        top: `${(option.padding + option.block_size) * this.numy +
          option.padding}px`
      },
      300,
      () => {
        this.isMoved = true
      }
    )
  }
  // 改变块的等级
  changeLevel() {
    this.value = option.level[this.level].value
    this.block.html(`${this.value}`).css(option.level[this.level].style)
  }
}
//生成随机数
function AllXY() {
  let allXY = []
  for (let x = 0; x < option.width; x++) {
    for (let y = 0; y < option.height; y++) {
      allXY.push({
        x,
        y
      })
    }
  }
  return allXY
}

//生成不同于现有的随机数
function differbutongRandom(arr) {
  let knownArray = []
  let randomArray = []
  arr.map(item => {
    if (item.value != 0)
      knownArray.push({
        x: item.numx,
        y: item.numy
      })
  })
  allRandom.map(item => {
    if (!knownArray.some(item2 => item.x == item2.x && item.y == item2.y)) {
      item.level = Math.random() < 0.5 ? 1 : 2
      randomArray.push(item)
    }
  })
  return randomArray[Math.floor(Math.random() * randomArray.length)]
}

// 建立初始块
function initBlock() {
  let initRandom = differbutongRandom(pool)
  let initBlock = pool.filter(
    item => item.numx == initRandom.x && item.numy == initRandom.y
  )
  initBlock[0].level = initRandom.level
  initBlock[0].changeLevel()
}

function gamePlay() {
  for (var y = 0; y < option.height; y++) {
    let pool1 = pool.filter(item => item.numy == y)
    pool1.sort((a, b) => a.numx - b.numx)
    for (let i = 0, length = pool1.length - 1; i <= length; i++) {
      pool1.sort((a, b) => a.numx - b.numx)
      if (i != length) {
        if (pool1[i].level == 0 && i != 0) {
          updateXandY(pool1, i, 'numx')
        }
        if (pool1[i].level == pool1[i + 1].level) {
          if (pool1[i].level != 0) {
            pool1[i].level++
            pool1[i + 1].level = 0
            updateXandY(pool1, i + 1, 'numx')
          }
        }
      } else {
        if (pool1[i].level == 0) {
          pool1.map(
            item => (item.numx == length ? (item.numx = 0) : (item.numx += 1))
          )
        }
      }
    }
  }
}
//更新x或y
function updateXandY(arr, i, xOry) {
  arr.map((item, index) => {
    if (index < i) {
      item[xOry]++
    }
    if (index == i) {
      item[xOry] = 0
    }
  })
}
