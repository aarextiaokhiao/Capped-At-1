const RES_UPGS = [
    {
        unl: ()=>true,
        desc: `Double <b>Points</b> generation.`,
        cost: E(1)
    },{
        unl: ()=>true,
        desc: `Boost production based on <b>Points</b>.`,
        cost: E(2),
        effect() {
			let p = player.p
			if (hasResearchUpg(5)) p = p.mul(4)

			let r = E(2).mul(player.p.min(1))
			if (hasResearchUpg(4)) r = r.mul(2)
			r = r.add(1)
			if (hasResearchUpg(3)) r = r.pow(researchUpgEff(3))
			return r
        },
        effDesc: x=>formatMult(x),
    },{
        unl: ()=>player.reset>=3,
        desc: `Compacted Box's reset time boosts <b>Points</b>.`,
        cost: E(2),
        effect() {
            return E(player.p_time).div(10).add(1).cbrt()
        },
        effDesc: x=>formatMult(x),
    },{
        unl: ()=>player.reset>=5,
        desc: `Compacted Box raises <b>2nd Research Upgrade</b>.`,
        cost: E(4),
        effect() {
            return E(player.reset/4)
        },
        effDesc: x=>"^"+format(x),
    },{
        unl: ()=>player.reset>=5,
        desc: `<b>Double</b> 2nd Research Upgrade's base.`,
        cost: E(4)
    },{
        unl: ()=>player.reset>=6,
        desc: `Points boost 2nd Research Upgrade as you had <b>4x</b> more.`,
        cost: E(3)
    }
]

const RES_UPGS_LEN = RES_UPGS.length

function hasResearchUpg(i) { return player.res_upgs.includes(i) }
function researchUpgEff(i,def=1) { return tmp.resUpgs.effect[i]||def }

function buyResearchUpg(i) {
    let cost = tmp.resUpgs.cost[i]

    if (tmp.unspentResearch.gte(cost) && !player.res_upgs.includes(i)) {
        player.res_upgs.push(Number(i))
        player.res_spent[i] = cost

        updateTemp()
    }
}

function revertResearchUpg(i) {
    if (!player.res_upgs.includes(i)) return

    player.res_upgs.splice(player.res_upgs.indexOf(i), 1)
    player.res_spent[i] = E(0)

    player.p = E(0)
    if (player.double < 2) player.p_time = 0

    updateTemp()
}

function respecResearch() {
    player.res_upgs = []
    player.res_spent = []

    player.p = E(0)
    if (player.double < 2) player.p_time = 0

    updateTemp()
}

function updateRUTemp() {
    let tru = tmp.resUpgs
    for (let x in RES_UPGS) {
        let ru = RES_UPGS[x]

        tru.cost[x] = ru.cost
        if (ru.effect) tru.effect[x] = ru.effect()
    }
}

tmp_update.push(()=>{
    updateRUTemp()
})