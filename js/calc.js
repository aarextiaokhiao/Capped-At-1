function calc(dt) {
    if (tmp.end) {
        tmp.end_time += dt
    } else if (tmp.pass) {
        if (player.double) MAIN.charger.calc(dt)

        player.p = player.p.add(tmp.pGain.mul(dt)).min(1)
        if (player.double >= 6) finishBox()
	}

    tmp.pass = true
    tmp.time += dt
    player.p_time += dt
    player.time += dt
}