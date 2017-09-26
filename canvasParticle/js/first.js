window.onload = function () {
    window.onresize = function () {
        changeText();
    }
    //页面动画
    var mBtn = document.querySelector('.messageBtn');
    var mBox = document.querySelector('.message');
    mBtn.addEventListener('mouseenter', function () {
        mBox.style.cssText = "opacity:1;height:75px;transform:translate(-25%,-50%)";
        for (var i = 0; i < mBox.children.length; i++) {
            mBox.children[i].style.cssText = "opacity:1;height:25px;"
        }
    }, false)
    mBtn.addEventListener('mouseleave', function () {
        mBox.style.cssText = "opacity:0;height:0;transform:translate(-30%,82%)";
        for (var i = 0; i < mBox.children.length; i++) {
            mBox.children[i].style.cssText = "opacity:0;height:0;"
        }
    }, false)

    //跳动文字
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var TextScramble = function () {
        function TextScramble(el) {
            _classCallCheck(this, TextScramble);
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        TextScramble.prototype.setText = function setText(newText) {
            var _this = this;

            var oldText = this.el.innerText;
            var length = Math.max(oldText.length, newText.length);
            var promise = new Promise(function (resolve) {
                return _this.resolve = resolve;
            });
            this.queue = [];
            for (var i = 0; i < length; i++) {
                var from = oldText[i] || '';
                var to = newText[i] || '';
                var start = Math.floor(Math.random() * 40);
                var end = start + Math.floor(Math.random() * 40);
                this.queue.push({
                    from: from,
                    to: to,
                    start: start,
                    end: end
                });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        };

        TextScramble.prototype.update = function update() {
            var output = '';
            var complete = 0;
            for (var i = 0, n = this.queue.length; i < n; i++) {
                var _queue$i = this.queue[i];
                var from = _queue$i.from;
                var to = _queue$i.to;
                var start = _queue$i.start;
                var end = _queue$i.end;
                var char = _queue$i.char;

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += '<span class="dud">' + char + '</span>';
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        };

        TextScramble.prototype.randomChar = function randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        };

        return TextScramble;
    }();

    var phrases = ['Welcome !', 'Come to my personal website', 'Wrath of the Carrot'];
    var el = document.querySelector('.text');
    var fx = new TextScramble(el);

    var counter = 0;
    (function next() {
        fx.setText(phrases[counter]).then(function () {
            setTimeout(next, 800);
        });
        counter = (counter + 1) % phrases.length;
    })();




    //背景粒子特效
    var canvas = document.getElementById('bg');
    var ctx = canvas.getContext('2d');
    var defaultOption = {
        colors: ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'],
        r: 20,
        count: 3,
        bgNumber: 200
    }

    var particlesPool = [];
    var particlesMovePool = [];


    function Particle(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.dx = Math.sin(Math.random() * Math.PI * 2) * 2;
        this.dy = Math.sin(Math.random() * Math.PI * 2) * 2;
        this.mx = Math.cos(Math.random() * Math.PI * 2) * 6;
        this.my = Math.cos(Math.random() * Math.PI * 2) * 6;
        this.opacity = 0.8;
    }
    Particle.prototype = {
        moveInPool: function () {
            this.x += this.dx;
            this.y += this.dy;
            this.opacity = 0.2;
            this.r += Math.sin(Math.random() * Math.PI * 2) / 5;
            if (this.r < 0) this.r += defaultOption.r;
            if (this.r > defaultOption.r * 2) this.r -= defaultOption.r;
        },
        moveWithMouse: function () {
            var that = this;
            this.x += this.mx;
            this.y += this.my;
            this.r -= 0.5;
            //当直径小于0的时候，删除本身
            if (this.r < 0) {
                for (var j = 0; j < particlesMovePool.length; j++) {
                    particlesMovePool[j] == this && particlesMovePool.splice(j, 1);
                }
                return false;
            }
            return true;
        },
        draw: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        },
        isGround: function () {
            (this.x < 0 || this.x > parseInt(getComputedStyle(canvas).width)) && (this.dx = -this.dx);
            (this.y < 0 || this.y > parseInt(getComputedStyle(canvas).height)) && (this.dy = -this.dy);
        }
    }
    canvas.onmousemove = function (e) {
        // console.log(e.clientX, e.clientY);
        for (var i = 0; i < defaultOption.count; i++) {
            var randomColor = defaultOption.colors[Math.floor(Math.random() * defaultOption.colors.length)]
            var particle = new Particle(e.clientX, e.clientY, defaultOption.r, randomColor);
            particlesMovePool.push(particle);
        }
        var interVar = new Particle(e.clientX, e.clientY, Math.floor(Math.random() * defaultOption.r), randomColor);
        particlesPool.push(interVar)
        if (particlesPool.length > defaultOption.bgNumber) {
            particlesPool.shift();
        }
        // console.log(particlesMovePool.length)
        // console.log(particlesPool)
    }

    function show() {
        ctx.clearRect(0, 0, parseInt(getComputedStyle(canvas).width), parseInt(getComputedStyle(canvas).height));
        particlesMovePool.forEach(function (obj) {
            obj.moveWithMouse() && obj.draw();
        });
        particlesPool.forEach(function (obj) {
            obj.moveInPool();
            obj.isGround();
            obj.draw();
        });
        requestAnimationFrame(show);
    };
    show();


    //处理文字区域,画布区域大小,设置粒子个数
    function changeText() {
        var container = document.querySelector('.container');
        container.style.width = parseInt(getComputedStyle(document.getElementsByTagName('body')[0]).fontSize) * (phrases[1].length + 2) + 'px';
        container.style.height = parseInt(getComputedStyle(document.getElementsByTagName('body')[0]).fontSize) * 2 + 'px';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var cArea=window.innerHeight*window.innerWidth;
        if(cArea>=900000){
            defaultOption.bgNumber=250;
        }else if(cArea<900000&&cArea>=500000){
            defaultOption.bgNumber=200;
        }else if(cArea<500000&&cArea>=150000){
            defaultOption.bgNumber=120;
        }else{defaultOption.bgNumber=80;}
    }
    changeText();
};