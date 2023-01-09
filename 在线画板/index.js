var log = console.log.bind(console)

var mycanvas = document.querySelector('#mycanvas')
var ctx = mycanvas.getContext('2d')
var earserEnable = false
var currenPenColor = 'black'
var currentPenWidth = 3

var drawLine = function (x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = currentPenWidth
    ctx.strokeStyle = currenPenColor
    // 先 closePath 方法闭合，然后调用 stroke, 这样画出的线就不会有很多的毛边
    ctx.closePath()
    ctx.stroke()
}

var eraserArea = function (x, y) {
    var rectregion = 10
    var halfregion = rectregion / 2
    ctx.clearRect(x - halfregion, y - halfregion, rectregion, rectregion)
}

var listenerCanvas = function (canvas) {
    var isMoveing = false
    var lastPoint = {
        x: undefined,
        y: undefined,
    }
    var headY = 110
    var handlestart = function (x, y) {

        isMoveing = true
        lastPoint = {
            x: x,
            y: y,
        }
    }
    var handlemove = function (newPoint) {
        if (!isMoveing) {
            return
        }
        if (earserEnable) {
            // 擦除
            eraserArea(lastPoint.x, lastPoint.y)
        } else {
            // 画线
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint
    }
    var handleend = function () {
        isMoveing = false
    }
    if (document.ontouchstart === undefined) {
        log('当前是PC端模式')
        canvas.onmousedown = function (event) {
            var x = event.clientX
            var y = event.clientY - headY
            log('mousedown', x, y, event)
            handlestart(x, y)
        }

        canvas.onmousemove = function (event) {
            var x = event.clientX
            var y = event.clientY - headY
            var newPoint = {
                x: x,
                y: y,
            }
            handlemove(newPoint)
        }

        canvas.onmouseup = handleend
    } else {
        log('当前是移动端模式')
        canvas.ontouchstart = function (touchevent) {
            var x = touchevent.touches[0].clientX
            var y = touchevent.touches[0].clientY
            handlestart(x, y)
        }
        canvas.ontouchmove = function (touchevent) {
            var x = touchevent.touches[0].clientX
            var y = touchevent.touches[0].clientY
            var newPoint = {
                x: x,
                y: y,
            }
            handlemove(newPoint)
        }
        canvas.ontouchend = handleend
    }

}

var listenerActions = function (canvas) {
    var earserButton = document.querySelector('.eraser')
    earserButton.addEventListener('click', function () {
        earserEnable = true
        earserButton.classList.add('active')
        brushButton.classList.remove('active')
    })
    
    var brushButton = document.querySelector('.brush')
    brushButton.addEventListener('click', function () {
        earserEnable = false
        brushButton.classList.add('active')
        earserButton.classList.remove('active')
    })

    var clearButton = document.querySelector('.clearCanvas')
    clearButton.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    })

    var saveButton = document.querySelector('.saveCanvas')
    saveButton.addEventListener('click', function () {
        // 先填充背景色
        canvas.fillStyle = "#FFFFFF"
        
        // 转成 image data-url
        var url = canvas.toDataURL("image/png", 1.0)
        var link = document.createElement('a')
        document.body.appendChild(link)
        link.href = url
        link.download = 'Untitled'
        link.click()

    })

    

}

var listenerColors = function(){
    var penColors = document.querySelector('.pensettings-colors')
    penColors.addEventListener('click', function (event) {
        var target = event.target
        var color = target.dataset.color
        currenPenColor = color

        var targetChild = target.parentElement.children
        for (var i = 0; i < targetChild.length; i++) {
            targetChild[i].classList.remove('selected')
        }
        target.classList.add('selected')

    })
}
var listenerThickness = function(){
    var thicknessPanel = document.querySelector('#thicknes-panel')
    var closeBtn = document.querySelector('#thicknes-panel .close')
    closeBtn.addEventListener('click', function(){
        thicknessPanel.classList.remove('active')
    })
    
    var thicknes = document.querySelector('.pensettings-thickness .thickness')
    thicknes.addEventListener('click', function(){
        thicknessPanel.classList.add('active')
    })

    var thicknessItems = document.querySelectorAll('.thickness-container .thickness')
    log(thicknessItems)
    for (let index = 0; index < thicknessItems.length; index++) {
        const element = thicknessItems[index];
        // 触发
        element.addEventListener('click', function(event){
            log('divtag click')
            let divTag = event.currentTarget
            let text = divTag.querySelector('span').innerText
            let targetCss = divTag.querySelector('.thickness-icon').style.cssText
            thicknes.children[0].style.cssText = targetCss
            thicknes.children[1].innerText = text
            currentPenWidth = parseInt(text) * 3
    
            thicknessPanel.classList.remove('active')
        })
    }
}

var autoSetCanvasSize = function (canvas) {
    var setCanvasSize = function () {
        var width = document.documentElement.clientWidth
        var height = document.documentElement.clientHeight
        log(`当前页面 width: ${width}, height: ${height}`)
        canvas.width = width
        canvas.height = height
    }
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }
}

var __main = function () {
    autoSetCanvasSize(mycanvas)
    listenerCanvas(mycanvas)
    listenerActions(mycanvas)
    listenerThickness()
    listenerColors()
}

__main()