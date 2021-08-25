function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        let step = (target - obj.offsetLeft) / 10
        step = step < 0 ? Math.floor(step) : Math.ceil(step)

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
                // if (callback) { callback() }
                //another writting of the above 
                //only when both side true callback() will be run
                //if callback false, quit execute the following code
            callback && callback()
        }
        obj.style.left = obj.offsetLeft + step + 'px'


    }, 15)

}