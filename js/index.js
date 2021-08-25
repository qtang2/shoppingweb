window.addEventListener('load', function() {
    // console.log('loadddd');
    let arrow_l = this.document.querySelector('.arrow-l')
    let arrow_r = this.document.querySelector('.arrow-r')
    let focus = this.document.querySelector('.focus')
    let focusWidth = focus.offsetWidth

    //when scroll, the toggleTool will excute which lead to change li's background color many times, so set a flag to control it
    let canScroll = true


    //after refresh page if still need to show the fixedtool
    toggleTool()


    //when mouse enter, arrow left and right show up
    focus.addEventListener('mouseenter', function() {

        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer)
        timer = null
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(() => {
            arrow_r.click()
        }, 2000);
    })

    //dynamically create circles 
    let ol = focus.querySelector('.circle')
    let ul = focus.querySelector('ul')
    let circleNo = focus.querySelector('ul').children.length
        // console.log('circleNo' + circleNo)
    for (let i = 0; i < circleNo; i++) {
        let li = this.document.createElement('li')
        li.setAttribute('index', i)
        ol.appendChild(li)

        //When click circle, circle become white
        li.addEventListener('click', function() {
            let lis = ol.children
            for (let i = 0; i < lis.length; i++) {
                lis[i].className = ''
            }
            this.className = 'current'

            let index = this.getAttribute('index')
            num = index
            circle = index
                //click li them move ul position to get diff pic
            let moveLen = -(index * focusWidth)
            animate(ul, moveLen)


        })
    }
    //set default circle to be white
    ol.children[0].className = 'current'

    //copy the first child in ul, append it to ul
    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
        //infinite loop pictures
    let num = 0
    let circle = 0

    //set a flag to prevent user click arrow too fast, when true can click , when false cannot. Only set true after the animation is completed, which can happen in callback function of animate()
    let flag = true
    arrow_r.addEventListener('click', function() {
        if (flag) {
            //set flag to false to prevent click too fast
            flag = false
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++

            //set flag to true in callback function
            animate(ul, -num * focusWidth, function() {
                flag = true
            })

            circle++
            if (circle == 4) {
                circle = 0
            }
            setCircleBG()
        }

    })

    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * focusWidth
            }
            num--
            animate(ul, -num * focusWidth, function() {
                flag = true
            })

            circle--
            if (circle < 0) {
                circle = ol.children.length - 1
            }
            setCircleBG()
        }

    })

    function setCircleBG() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    }

    let timer = setInterval(() => {
        //Manually call the click event of arrow_r element
        arrow_r.click()
    }, 2000);



    function toggleTool() {
        if ($(document).scrollTop() >= $('.recom').offset().top) {
            $(".fixedtool").fadeIn()
        } else {
            $(".fixedtool").fadeOut()

        }
    }
    $(this.window).scroll(function() {
        toggleTool()
        if (canScroll) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current')
                }
            })
        }
        // toggleTool()
        // $('.floor .w').each(function(i, ele) {
        //     if ($(document).scrollTop() >= $(ele).offset().top) {
        //         $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current')
        //     }
        // })
    })

    $('.fixedtool ul').on("click", "li", function() {
        canScroll = false
        let current = $('.floor .w').eq($(this).index()).offset().top
            //callback function will set canScroll to true again , then can scroll to change li's backgrounds
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            canScroll = true
        })
        $(this).addClass('current').siblings().removeClass('current')

    })
})