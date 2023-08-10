function calc(dt) {
    if (tmp.end) {
        tmp.end_time += dt
    } else if (tmp.pass) {
        if (player.double) MAIN.charger.calc(dt)

        player.p = player.p.add(tmp.pGain.mul(dt)).min(1)
        if (player.double >= 6 || player.triple >= 3) finishBox()
        if (player.triple >= 4) MAIN.double.reset()

		for (let x = 0; x < GLYPH_LEN; x++) {
			if (player.glyph_eq[x] > 0) {
				let t = player.glyph[x].add(tmp.b3.glyph.gain[x].mul(dt))

				while (t.gte(1)) {
					let l = ++player.glyph_level[x]

					t = t.sub(1).div(Decimal.pow(2,l**1.1)).mul(Decimal.pow(2,(l-1)**1.1))
				}

				player.glyph[x] = t
			}
		}
	}

    tmp.pass = true
    tmp.time += dt
    player.p_time += dt
    player.time += dt
}