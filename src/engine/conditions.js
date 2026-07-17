// Évaluation des conditions du graphe de dialogues.
// Formats acceptés (combinables — toutes les clauses doivent être vraies) :
//   { "flag": "a_mistiflouk" }            → le flag doit être posé
//   { "notFlag": "a_froisse_jules" }      → le flag doit être absent
//   { "reputation": { "axis": "coeur", "min": 2 } }
//   { "fragments": 3 }                    → au moins N fragments récoltés
export function evaluateCondition(condition, state) {
  if (!condition) return true

  if (condition.flag && !state.flags.includes(condition.flag)) return false
  if (condition.notFlag && state.flags.includes(condition.notFlag)) return false

  if (condition.reputation) {
    const { axis, min = 0 } = condition.reputation
    if ((state.reputation[axis] ?? 0) < min) return false
  }

  if (typeof condition.fragments === 'number') {
    if (state.fragments.length < condition.fragments) return false
  }

  return true
}

export function availableChoices(choices, state) {
  return (choices ?? []).filter((c) => evaluateCondition(c.condition, state))
}
