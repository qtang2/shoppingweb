window.addEventListener('load', function() {
    // console.log('loadddd');
    let arrow_l = this.document.querySelector('.arrow-l')
    let arrow_r = this.document.querySelector('.arrow-r')
    let focus = this.document.querySelector('.focus')
    let focusWidth = focus.offsetWidth
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
    arrow_r.addEventListener('click', function() {
        if (num == ul.children.length - 1) {
            ul.style.left = 0
            num = 0
        }
        num++
        animate(ul, -num * focusWidth)

        circle++
        if (circle == 4) {
            circle = 0
        }
        setCircleBG()
    })

    arrow_l.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * focusWidth
        }
        num--
        animate(ul, -num * focusWidth)

        circle--
        if (circle < 0) {
            circle = ol.children.length - 1
        }
        setCircleBG()
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
})