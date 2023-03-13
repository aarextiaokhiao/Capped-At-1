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

		b2: {
			ch: {}
		},
		b3: {
			glyph: {
				len: 3,
				total: 0,
				unspent: 0,
				gain: [],
				eff: [],
			},
		},


        tab: 'box',

        end: false,
        end_time: 0,
    }
}

function updateTemp() {
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
}