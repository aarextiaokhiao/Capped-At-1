MAIN.triple = {
	formula() {
		let x = 10
		x += player.triple

		return player.double / x
	},
	penalty() {
		return player.triple / 20 + 1
	},

	reset() {
		if (tmp.b3.formula >= 1) {
			player.triple_unl = true
			player.triple++

			if (player.triple >= 10) tmp.end = true
			else this.doReset()
		}
	},
	doReset(order='b3') {
		player.double = 0
		player.charge_ch = ''
		
		for (let x = 0; x < 5; x++) {
			let p = []
			for (let y = 0; y < 5; y++) p.push(0)
			player.charge[x] = p
		}

		MAIN.double.doReset(order)
	},

	milestone: [
		{
			r: 2,
			desc: `<b>Charger Core</b> doesn't decrease. Double Compacted Boxes only reset Points.`,
		},{
			r: 3,
			desc: `You can select all <b>Charger Cores</b>. Automate Compacted Boxes.`,
		},{
			r: 4,
			desc: `Automate Double Compacted Boxes. Unlock the Ling glyph.`,
		},{
			r: 6,
			desc: `Glyphs scale 2x faster.`,
		},{
			r: 8,
			desc: `Su effect is better.`,
		},{
			r: 9,
			desc: `The final stretch. No rewards for this.`,
		},{
			r: 10,
			desc: `Escape and beat the game!`,
		},
	],
}

MAIN.glyph = {
	get_glyph() {
		let b = 1
		let x = Math.floor(Math.max(0,player.triple*b))
		return x
	},

	glyph_name: [
		['智','Zhi'],
		['力','Li'],
		['速','Su'],
		['灵','Ling'],
	],
	glyph_gain(i) {
		let g = player.glyph_eq[i]
		if (g == 0) return E(0)

		let l = player.glyph_level[i]
		let x = E(3).pow((g - l) * (player.triple >= 6 ? .5 : 1)).div(20)
		return x
	},
	glyph_eff: [
		[
			l=>l+1,
			x=>"<b>"+format(x,1)+"x</b> to Points gain"
		],[
			l=>l/3+1,
			x=>"<b>"+format(x,1)+"x</b> to Charger base row"
		],[
			l=>player.triple>=8?l/15:l/20,
			x=>"<b>-"+format(x,2)+"x</b> to Double Compacted Box's penalty"
		],[
			l=>2-1/(l/20+1),
			x=>"<b>^"+format(x,2)+"</b> to 3rd Research Upgrade"
		],
	],

	addGlyph(i,a) {
		let tt = tmp.b3.glyph
		if (a > 0 && tt.unspent <= 0) return;
		player.glyph_eq[i] = Math.max(0,player.glyph_eq[i]+a*(a>0?tt.unspent:tt.total))
	},
}

function glyphEff(x, def = 1) {
	return tmp.b3?.glyph.eff[x] ?? def
}

const GLYPH_LEN = MAIN.glyph.glyph_name.length

tmp_update.push(()=>{
	let mt = MAIN.triple
	let tt = tmp.b3
	tmp.b3.formula = mt.formula()
	tmp.b3.penalty = mt.penalty()

	//Glyphs
	let mg = MAIN.glyph
	let tg = tt.glyph

	tg.total = mg.get_glyph()
	tg.len = 3
	if (player.triple >= 4) tg.len++

	let s = 0
	for (let i=0; i<GLYPH_LEN; i++) {
		s += player.glyph_eq[i]

		tg.gain[i] = mg.glyph_gain(i)
		tg.eff[i] = mg.glyph_eff[i][0](player.glyph_level[i])
	}
	tg.unspent = Math.max(0, tg.total-s)
})