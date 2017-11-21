$.fn.start_game = function(option) {
  var defaultoption = {
    width: 4,
    height: 4,
    style: {
      box_background: 'rgb(127,105,138)',
      padding: 18,
      block_size: 100
    },
    block_style: {
      'font-family': '微软雅黑',
      'text-align': 'center',
      'font-weight': 'bold'
    },
    initial_style: {
      'background-color': 'rgb(200,200,200)'
    },
    level: [
      {
        lv: 0,
        value: 2,
        style: {
          'background-color': 'rgb(238,228,218)',
          color: 'rgb(124,115,106)',
          'font-size': 58
        }
      },
      {
        lv: 1,
        value: 4,
        style: {
          'background-color': 'rgb(236,224,200)',
          color: 'rgb(124,115,106)',
          'font-size': 58
        }
      },
      {
        lv: 2,
        value: 8,
        style: {
          'background-color': 'rgb(242,177,121)',
          color: 'rgb(255,247,235)',
          'font-size': 58
        }
      },
      {
        lv: 3,
        value: 16,
        style: {
          'background-color': 'rgb(245,149,99)',
          color: 'rgb(255,250,235)',
          'font-size': 50
        }
      },
      {
        lv: 4,
        value: 32,
        style: {
          'background-color': 'rgb(244,123,94)',
          color: 'rgb(255,247,235)',
          'font-size': 50
        }
      },
      {
        lv: 5,
        value: 64,
        style: {
          'background-color': 'rgb(247,93,59)',
          color: 'rgb(124,115,106)',
          'font-size': 50
        }
      },
      {
        lv: 6,
        value: 128,
        style: {
          'background-color': 'rgb(236,205,112)',
          color: 'rgb(255,247,235)',
          'font-size': 42
        }
      },
      {
        lv: 7,
        value: 256,
        style: {
          'background-color': 'rgb(237,204,97)',
          color: 'rgb(255,247,235)',
          'font-size': 42
        }
      },
      {
        lv: 8,
        value: 512,
        style: {
          'background-color': 'rgb(236,200,80)',
          color: 'rgb(255,247,235)',
          'font-size': 42
        }
      },
      {
        lv: 9,
        value: 1024,
        style: {
          'background-color': 'rgb(238,197,63)',
          color: 'rgb(255,247,235)',
          'font-size': 34
        }
      },
      {
        lv: 10,
        value: 2048,
        style: {
          'background-color': 'rgb(238,194,46)',
          color: 'rgb(255,247,235)',
          'font-size': 34
        }
      },
      {
        lv: 11,
        value: 4096,
        style: {
          'background-color': 'rgb(61,58,61)',
          color: 'rgb(255,247,235)',
          'font-size': 34
        }
      },
      {
        lv: 12,
        value: 8192,
        style: {
          'background-color': 'rgb(126,228,20)',
          color: 'rgb(255,247,235)',
          'font-size': 34
        }
      },
      {
        lv: 13,
        value: 16384,
        style: {
          'background-color': 'rgb(200,122,122)',
          color: 'rgb(255,247,235)',
          'font-size': 26
        }
      }
    ]
  }

  option = $.fn.extend(true, {}, defaultoption, option)

  // console.log(option.style.padding)
  // console.log(option.style.block_size)

  function createbox() {
    //创建背景
    $('#game').css({
      'background-color': option.style.box_background,
      'border-radius': option.style.padding + 'px',
      width:
        option.width * (option.style.block_size + option.style.padding) +
        option.style.padding +
        'px',
      height:
        option.height * (option.style.block_size + option.style.padding) +
        option.style.padding +
        'px',
      position: 'relative'
    })
    //创建游戏方块
    for (var y = 0; y < option.height; y++) {
      for (var x = 0; x < option.width; x++) {
        $('<div></div>')
          .attr({
            numx: x,
            numy: y
          })
          .css({
            position: 'absolute',
            left:
              option.style.padding +
              (option.style.padding + option.style.block_size) * x +
              'px',
            top:
              option.style.padding +
              (option.style.padding + option.style.block_size) * y +
              'px',
            width: option.style.block_size + 'px',
            height: option.style.block_size + 'px',
            'line-height': option.style.block_size + 'px'
          })
          .css(option.block_style)
          .css(option.initial_style)
          .appendTo('#game')
      }
    }
    $('#explain').css({
      width:
        option.width * (option.style.block_size + option.style.padding) +
        option.style.padding +
        'px'
    })
  }
  //创建盒子
  createbox()

  //设置有值的样式函数
  function level(ele, lv) {
    //ele为元素，lv为等级
    ele
      .text(option.level[lv].value)
      .css(option.level[lv].style)
      .attr('lv', lv)
  }
  //还原样式函数
  function initial(ele) {
    ele
      .css(option.initial_style)
      .text('')
      .attr('lv', '')
  }

  //创建随机数函数，返回x和y的值
  var random = function() {
    numx = Math.floor(Math.random() * option.width)
    numy = Math.floor(Math.random() * option.height)
    return { numx, numy }
  }
  //创建已经没有数字的数组
  var havenot_num = []

  //获取没有数字的div函数
  var getHavenotNum = function() {
    havenot_num.splice(0, havenot_num.length)
    for (var y = 0; y < option.height; y++) {
      for (var x = 0; x < option.width; x++) {
        if ($('[numx=' + x + '][numy=' + y + ']').text() == '') {
          havenot_num.push({ x, y })
        }
      }
    }
  }

  //创建新增0,1等级的初始方块
  function createblock() {
    getHavenotNum()
    var random_length = Math.floor(Math.random() * havenot_num.length)
    var numx = havenot_num[random_length].x
    var numy = havenot_num[random_length].y
    if (Math.random() <= 0.5) {
      level($('[numx=' + numx + '][numy=' + numy + ']'), 0)
    } else {
      level($('[numx=' + numx + '][numy=' + numy + ']'), 1)
    }
  }

  // level($("[numx=1][numy=1]"),13);
  createblock()
  createblock()

  var judge = false
  //创建事件运行函数
  function gamerun(direction) {
    switch (direction) {
      case 'Right':
        for (var y = 0; y < option.height; y++) {
          var tem_array = [] //创建用来存储每行内容的数组
          //获取每行的内容，并清空每行
          for (var x = 0; x < option.width; x++) {
            gettem_array(x, y, tem_array)
          }
          var tem_num = option.width - 1
          //对数组进行判断
          if (tem_array.length > 1) {
            var tem = []
            getTem(tem_array, tem)
            tem = tem.reverse() //反转数组，好让输出到页面上
            tem.map(function(lv) {
              //循环数组每一个元素值
              level($('[numx=' + tem_num + '][numy=' + y + ']'), lv)
              tem_num = tem_num - 1
            })
          } else if (tem_array.length == 1) {
            //如果只有一个值的话，就直接将其输出到最后一个就行，么有值的话就什么都不用做
            level(
              $('[numx=' + (option.width - 1) + '][numy=' + y + ']'),
              tem_array[0]
            )
          }
        }
        createblock() //每次处理完都要新建一个方块
        break
      case 'Left':
        for (var y = 0; y < option.height; y++) {
          var tem_array = [] //创建用来存储每行内容的数组
          //获取每行的内容，并清空每行
          for (var x = 0; x < option.width; x++) {
            gettem_array(x, y, tem_array)
          }

          tem_array = tem_array.reverse()
          var tem_num = 0
          //对数组进行判断
          if (tem_array.length > 1) {
            var tem = []
            getTem(tem_array, tem)
            tem = tem.reverse() //反转数组，好让输出到页面上
            tem.map(function(lv) {
              //循环数组每一个元素值
              level($('[numx=' + tem_num + '][numy=' + y + ']'), lv)
              tem_num = tem_num + 1
            })
          } else if (tem_array.length == 1) {
            //如果只有一个值的话，就直接将其输出到最后一个就行，么有值的话就什么都不用做
            level($('[numx=' + 0 + '][numy=' + y + ']'), tem_array[0])
          }
        }
        createblock() //每次处理完都要新建一个方块
        break
      case 'Up':
        for (var x = 0; x < option.height; x++) {
          var tem_array = [] //创建用来存储每行内容的数组
          //获取每行的内容，并清空每行
          for (var y = 0; y < option.width; y++) {
            gettem_array(x, y, tem_array)
          }

          //    tem_array=tem_array.reverse();
          var tem_num = 0
          //对数组进行判断
          if (tem_array.length > 1) {
            var tem = []
            getTem(tem_array, tem)
            // tem=tem.reverse();                    //反转数组，好让输出到页面上
            tem.map(function(lv) {
              //循环数组每一个元素值
              level($('[numx=' + x + '][numy=' + tem_num + ']'), lv)
              tem_num = tem_num + 1
            })
          } else if (tem_array.length == 1) {
            //如果只有一个值的话，就直接将其输出到最后一个就行，么有值的话就什么都不用做
            level($('[numx=' + x + '][numy=' + 0 + ']'), tem_array[0])
          }
        }
        createblock() //每次处理完都要新建一个方块
        break
      case 'Down':
        for (var x = 0; x < option.height; x++) {
          var tem_array = [] //创建用来存储每行内容的数组
          //获取每行的内容，并清空每行
          for (var y = 0; y < option.width; y++) {
            gettem_array(x, y, tem_array)
          }

          tem_array = tem_array.reverse()
          var tem_num = option.height - 1
          //对数组进行判断
          if (tem_array.length > 1) {
            var tem = []
            getTem(tem_array, tem)
            // tem=tem.reverse();                    //反转数组，好让输出到页面上
            tem.map(function(lv) {
              //循环数组每一个元素值
              level($('[numx=' + x + '][numy=' + tem_num + ']'), lv)
              tem_num = tem_num - 1
            })
          } else if (tem_array.length == 1) {
            //如果只有一个值的话，就直接将其输出到最后一个就行，么有值的话就什么都不用做
            level($('[numx=' + x + '][numy=' + tem_num + ']'), tem_array[0])
          }
        }
        createblock() //每次处理完都要新建一个方块
        break
    }
  }
  function gettem_array(x, y, tem_array) {
    //获取每行的内容，并清空每行
    if ($('[numx=' + x + '][numy=' + y + ']').text() != '')
      tem_array.push(parseInt($('[numx=' + x + '][numy=' + y + ']').attr('lv')))
    initial($('[numx=' + x + '][numy=' + y + ']'))
  }

  function getTem(tem_array, tem) {
    tem.push(tem_array[0]) //在数组长度大于一个的时候，先将第一个值传入变更依据的数组
    for (var i = 1; i < tem_array.length; i++) {
      //循环对比后一个和前一个的值
      if (tem_array[i] == tem_array[i - 1]) {
        //如果一样，则将变更依据的数组最后一个删除，然后在添加加1的值（就是升级）
        tem.pop()
        tem.push(tem_array[i] + 1)
        tem_array[i] = tem_array[i] + 1 //将原本的数组值也升级好利于与后面的进行对比
      } else {
        tem.push(tem_array[i]) //如果不一样的话就将值传入变更依据的数组
      }
    }
    return tem
  }
  //键盘运行事件
  $('body').keydown(function(event) {
    if (gameover(judge)) {
      alert('Game over')
      location.reload()
    } else {
      var direction = ''
      switch (event.which) {
        case 37:
          direction = 'Left'
          break
        case 38:
          direction = 'Up'
          break
        case 39:
          direction = 'Right'
          break
        case 40:
          direction = 'Down'
          break
      }
      if (direction != '') gamerun(direction)
    }
  })
  //鼠标运行事件
  var down_p = [] //记录鼠标按下的位置
  var up_p = [] //记录鼠标抬起的位置
  $('body').mousedown(function(e) {
    //鼠标按下的位置事件
    e.preventDefault()
    down_p.splice(0, down_p.length)
    down_p.push(e.pageX)
    down_p.push(e.pageY)
    //    console.log(down_p);
    //    if (document.selection) {
    //     document.selection.empty();
    //     } else if (window.getSelection) {
    //     window.getSelection().removeAllRanges();
    //     }
  })
  $('body').mouseup(function(e) {
    //鼠标抬起的位置事件
    e.preventDefault()
    up_p.splice(0, up_p.length)
    up_p.push(e.pageX)
    up_p.push(e.pageY)
    // console.log(up_p);
    var direction = ''
    var distanceX = up_p[0] - down_p[0]
    var distanceY = up_p[1] - down_p[1]
    //处理上下左右
    if (Math.abs(distanceX) > 100 && Math.abs(distanceY) <= 100) {
      distanceX > 0 ? (direction = 'Right') : (direction = 'Left')
    }
    if (Math.abs(distanceX) <= 100 && Math.abs(distanceY) > 100) {
      distanceY > 0 ? (direction = 'Down') : (direction = 'Up')
    }
    if (Math.abs(distanceX) > 100 && Math.abs(distanceY) > 100) {
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        distanceX > 0 ? (direction = 'Right') : (direction = 'Left')
      }
      if (Math.abs(distanceX) < Math.abs(distanceY)) {
        distanceY > 0 ? (direction = 'Down') : (direction = 'Up')
      }
    }
    if (gameover(judge)) {
      alert('Game over')
      location.reload()
    } else {
      if (direction != '') gamerun(direction)
    }
  })

  //移动端touch事件
  var m_down_p = [] //记录手指按下的位置
  var m_up_p = [] //记录手指抬起的位置

  document.querySelector('#game').addEventListener('touchstart', function(e) {
    e.stopPropagation()
    e.preventDefault()
    m_down_p[0] = e.touches[0].pageX
    m_down_p[1] = e.touches[0].pageY
    console.log(m_down_p)
  })
  document.querySelector('#game').addEventListener('touchmove', function(e) {
    e.preventDefault()
    m_up_p[0] = e.touches[0].pageX
    m_up_p[1] = e.touches[0].pageY
    console.log(m_up_p)
  })
  document.querySelector('#game').addEventListener('touchend', function(e) {
    e.stopPropagation()
    e.preventDefault()

    var direction = ''
    var distanceX = m_up_p[0] - m_down_p[0]
    var distanceY = m_up_p[1] - m_down_p[1]
    //处理上下
    if (Math.abs(distanceX) <= 75) {
      if (Math.abs(distanceY) > 30) {
        if (distanceY > 0) direction = 'Down'
        if (distanceY < 0) direction = 'Up'
      }
    }
    //处理左右
    if (Math.abs(distanceY) <= 75) {
      if (Math.abs(distanceX) > 30) {
        if (distanceX > 0) direction = 'Right'
        if (distanceX < 0) direction = 'Left'
      }
    }
    if (gameover(judge)) {
      alert('Game over')
      location.reload()
    } else {
      if (direction != '') gamerun(direction)
    }
  })

  $('#game').on('swipeleft', function() {
    var direction = 'Left'
    if (gameover(judge)) {
      alert('Game over')
      location.reload()
    } else {
      if (direction != '') gamerun(direction)
    }
  })
  $('#game').on('swiperight', function() {
    var direction = 'Right'
    if (gameover(judge)) {
      alert('Game over')
      location.reload()
    } else {
      if (direction != '') gamerun(direction)
    }
  })
  //游戏结束判断

  function gameover(judge) {
    var b = []
    for (var y = 0; y < option.height; y++) {
      for (var x = 0; x < option.width; x++) {
        if ($('[numx=' + x + '][numy=' + y + ']').attr('lv')) {
          var center = $('[numx=' + x + '][numy=' + y + ']').attr('lv')
          if (
            $('[numx=' + x + '][numy=' + (y - 1) + ']').attr('lv') != center &&
            $('[numx=' + x + '][numy=' + (y - 1) + ']').attr('lv')
          ) {
            b.push(true)
          }
          if (
            $('[numx=' + x + '][numy=' + (y + 1) + ']').attr('lv') != center &&
            $('[numx=' + x + '][numy=' + (y + 1) + ']').attr('lv')
          ) {
            b.push(true)
          }
          if (
            $('[numx=' + (x - 1) + '][numy=' + y + ']').attr('lv') != center &&
            $('[numx=' + (x - 1) + '][numy=' + y + ']').attr('lv')
          ) {
            b.push(true)
          }
          if (
            $('[numx=' + (x + 1) + '][numy=' + y + ']').attr('lv') != center &&
            $('[numx=' + (x + 1) + '][numy=' + y + ']').attr('lv')
          ) {
            b.push(true)
          }
        }
        if (parseInt($('[numx=' + x + '][numy=' + y + ']').attr('lv')) == 13) {
          judge = true
          break
        } else judge = false
      }
    }
    if (
      b.length ==
      4 * 2 +
        (option.width + option.height - 4) * 6 +
        (option.width - 2) * (option.height - 2) * 4
    )
      judge = true
    else judge = false

    // console.log(b);
    // console.log(judge);
    return judge
  }
}
