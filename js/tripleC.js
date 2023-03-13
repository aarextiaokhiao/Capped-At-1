MAIN.triple = {
	formula() {
		let x = 10
		x += Math.sqrt(player.triple) / 2

		return player.double / x
	},
	penalty() {
		return (player.triple / 10 + 1) ** 0.5
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
	}
}

MAIN.glyph = {
	get_glyph() {
		let b = 3

		if (player.triple>=9) b += 0.6

		let r = player.triple

		let x = Math.floor(Math.max(0,r*b))

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

		if (g==0) return E(0)

		let l = player.glyph_level[i]

		let x = Decimal.pow(10,g**1.25-2).div(i==3?1e9:(3+i)**i).div(Decimal.pow(2,l**1.1))

		return x
	},
	glyph_eff: [
		[
			l=>{
				let x = 1+l/5

				if (l>50) x *= 1+(l-50)/2

				return x
			},
			x=>"<b>^"+format(x,2)+"</b> to <b>Points</b> gain"
		],[
			l=>{
				let x = 1+l/10

				if (l>50) x *= 1+(l-50)/2

				return x
			},
			x=>"<b>x"+format(x,2)+"</b> to <b>ψ</b> base"
		],[
			l=>{
				let x = player.triple >= 7 ? l**0.61/15 : l**0.5/15

				return x
			},
			x=>"<b>+^"+format(x)+"</b> to <b>Double Compacted Box</b>'s claim formula"
		],[
			l=>{
				let x = player.triple >= 8 ? 1+l/80 : 1+l**0.9/90

				return x
			},
			x=>"<b>x"+format(x)+"</b> to <b>Double Compacted Box</b>'s weakness"
		],
	],

	addGlyph(i,a) {
		if (a > 0 && tmp.glyph.unspent <= 0) return;

		player.glyph_eq[i] = Math.max(0,player.glyph_eq[i]+a*(a>0?tmp.glyph.unspent:tmp.glyph.total))
	},

	milestone: [
		{
			r: 2,
			desc: `Start with 10 <b>Double Compacted Boxes</b>. Keep chargers on <b>Triple Compacted Box</b>. <b>Charge Core</b>'s active time is <b>10x</b> faster.`,
		},{
			r: 3,
			desc: `Automate <b>Double Compacted Box</b>. Unlock new <b>Ancient Glyph</b>'s type.`,
		},{
			r: 4,
			desc: `Keep <b>Research Upgrades</b> bought on <b>Double Compacted Box</b>.`,
		},{
			r: 5,
			desc: `Add <b>1</b> to <b>Upgrade Charger</b> per <b>Triple Compacted Box</b>, starting at 4.`,
		},{
			r: 6,
			desc: `First 2 <b>Research Upgrade</b> provides an exponential boost. <b>Li</b> boosts eighth <b>Research Upgrade</b>.`,
		},{
			r: 7,
			desc: `<b>Su</b>'s effect is stronger.`,
		},{
			r: 8,
			desc: `<b>Ling</b>'s effect is stronger.`,
		},{
			r: 9,
			desc: `<b>Triple Compacted Box</b>'s bonus base is increased by <b>0.6</b>.`,
		},{
			r: 10,
			desc: `Beat the game!`,
		},
	],
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
	if (player.triple >= 3) tg.len++

	let s = 0
	for (let i=0; i<GLYPH_LEN; i++) {
		s += player.glyph_eq[i]

		tg.gain[i] = mg.glyph_gain(i)
		tg.eff[i] = mg.glyph_eff[i][0](player.glyph_level[i])
	}
	tg.unspent = Math.max(0, tg.total-s)
})