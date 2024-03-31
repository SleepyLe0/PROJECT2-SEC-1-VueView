function monsterEasy(enemy) { 
    const actionSet = []
    for (let i = 0; i < enemy.skillPoint; i++) {
        let chargeCount = 0
        actionSet.forEach(action => {
            if (action === 3) chargeCount++
        })
        if (chargeCount === 4) {
            actionSet.push(Math.floor(Math.random() * 2) + 1)
        }
        actionSet.push(Math.floor(Math.random() * 3) + 1)
    } 
    actionSet.forEach(action => {
        if (action === 1) enemy.action.attack++
        else if (action === 2) enemy.action.defense++
        else enemy.action.charge++
    })
    enemy.skillPoint = 0
}

function monsterHard(enemy, player, turn) {
    const totalPlayerSkillPoint = (turn + 1 > 4 ? 4 : turn + 1) + player.action.charge
    for (let i = 0; i < enemy.skillPoint; i++) {
        const playerLatestHp = player.currentHP - (enemy.skillPoint - player.action.defense) * enemy.character.attack
        const enemyLatestHp = enemy.currentHP - (totalPlayerSkillPoint - enemy.action.defense) * player.character.attack
        if (playerLatestHp <= 0) enemy.action.attack++
        else if (enemyLatestHp <= 0) {
            if ((enemy.currentHP - (totalPlayerSkillPoint - enemy.skillPoint) * player.character.attack) <= 0) {
                if (enemy.action.charge < 4) enemy.action.charge++
                else enemy.action.defense++
            } 
            else enemy.action.defense++
        } else {
            if (enemy.skillPoint === 8) {
                if (player.action.defense < 5) enemy.action.attack++
                else {
                    if (enemy.action.charge < 4) enemy.action.charge++
                    else enemy.action.defense++
                } 
            } else if (player.currentHP > enemy.character.attack * 6) {
                if (player.action.defense >= enemy.skillPoint) {
                    if (enemy.action.charge < 4) enemy.action.charge++
                    else enemy.action.defense++
                } else enemy.action.attack++
            } else {
                if (player.action.defense === 0) enemy.action.attack++
                else if (enemy.action.charge < 4) enemy.action.charge++
                else enemy.action.defense++
            }
        }
    }
    enemy.skillPoint = 0
}

export { monsterEasy, monsterHard }