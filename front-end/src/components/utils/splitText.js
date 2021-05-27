var splitText = (input) => {

    var ret = []
    var tmp = ''
    var start, i = 0
    for (i = 0; i< input.length; i++) {
        if (input[i] !== ' ') {
            if (tmp === '') {
                start = i
            }
            tmp = tmp+input[i]
        }
        else {
            ret.push({Word: tmp, Start: start})
            tmp = ''
        }
    }
    ret.push({Word: tmp, Start: start})
    return ret
}
export {splitText}