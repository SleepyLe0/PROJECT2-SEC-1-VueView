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

function monsterMedium(enemy, player) {
    
}

function monsterHard(enemy, player) {
    
}

export { monsterEasy, monsterMedium, monsterHard }