var tmp = {}
var tmp_update = []

function resetTemp() {
    keep = []
    tmp = {
        progress: 0,
        time: 0,
        pass: true,

        resUpgs: {
            scale: 1,
            cost: [],
            effect: [],
        },

        tab: 'box',
    }
}

function updateTemp() {
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
}