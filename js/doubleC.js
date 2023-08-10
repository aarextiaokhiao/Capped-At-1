MAIN.double = {
	formula() {
		let x = 10
		x += (player.double * tmp.b3.penalty / 2) ** (0.5 * tmp.b3.penalty)

		return player.reset / x
	},
	penalty() {
		return Math.max((player.double / 5 + 1) ** (0.5 * tmp.b3.penalty) - glyphEff(2, 0), 0)
	},

	reset() {
		if (tmp.b2.formula >= 1) {
			player.double_unl = true
			player.double++
			this.doReset()
		}
	},
	doReset(order = "b2") {
		player.p = E(0)
		player.p_time = 0
		if (player.triple < 2 || order != "b2") {
			player.reset = 0
			player.res_upgs = []
			player.res_spent = []
			player.res_charge = []
		}

		updateTemp()
	},

	milestone: [
		{
			r: 2,
			desc: `Increase <b>Charge Core</b>'s size to <b>2x1</b>.`,
		},{
			r: 3,
			desc: `<b>Compacted Box</b> doesn't reset its time.`,
		},{
			r: 4,
			desc: `Increase <b>Charge Core</b>'s size to <b>2x2</b>. You can select 1x2 of <b>Charge Cores</b>.`,
		},{
			r: 5,
			desc: `+1 <b>Research Point</b> per Double Compacted Box starting at 5. Unlock new Research Upgrades.`,
		},{
			r: 6,
			desc: `Automate Compacted Boxes.`,
		},{
			r: 7,
			desc: `You can select 2x2 of <b>Charge Cores</b>.`,
		},{
			r: 8,
			desc: `Increase <b>Charge Core</b>'s size to <b>2x3</b>.`,
		},{
			r: 9,
			desc: `Increase <b>Charge Core</b>'s size to <b>2x4</b>.`,
		},{
			r: 10,
			desc: `Unlock Triple Compacted Boxes.`,
		}
	],
}

MAIN.charger = {
	calc(dt) {
		for (let y = 0; y < tmp.b2.ch.size[0]; y++) for (let x = 0; x < tmp.b2.ch.size[1]; x++) {
			let yy = y+1, xx = x+1
			let c = player.charge[y]
			c[x] = MAIN.charger.touched(yy+''+xx) ? Math.min(1, c[x] + dt/5) : player.triple >= 2 ? c[x] : Math.max(0,c[x] - dt/200)
		}
	},
	effect() {
		let r = E(1)
		for (let y = 0; y < tmp.b2.ch.size[0]; y++) {
			let ry = E(1)
			for (let x = 0; x < tmp.b2.ch.size[1]; x++) {
				if (hasResearchUpg(6)) ry = ry.mul(player.charge[y][x] + 1)
				else ry = ry.add(player.charge[y][x])
			}
			r = r.mul(ry)
			r = r.mul(glyphEff(1))
		}
		return r
	},
	touched(loc) {
		let y = Math.floor(loc / 10), x = loc % 10, sel = tmp.b2.ch.sel
		let c = player.charge_ch
		let cy = Math.floor(c / 10), cx = c % 10
		if (c == "") return
		return (y >= cy && y <= cy + sel[0] - 1) &&
			(x >= cx && x <= cx + sel[1] - 1)
	}
}

tmp_update.push(()=>{
	let md = MAIN.double
	let td = tmp.b2

	td.penalty = md.penalty()
	td.formula = md.formula()

	//Charger
	let cd = td.ch
	cd.size = [1,1]
	if (player.double >= 2) cd.size = [1,2]
	if (player.double >= 4) cd.size = [2,2]
	if (player.double >= 8) cd.size = [2,3]
	if (player.double >= 9) cd.size = [2,4]

	cd.sel = [1,1]
	if (player.double >= 4) cd.sel = [1,2]
	if (player.double >= 7) cd.sel = [2,2]
	if (player.triple >= 3) cd.sel = [100,100]

	cd.eff = MAIN.charger.effect()
})