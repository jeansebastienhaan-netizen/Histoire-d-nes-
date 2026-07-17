// Évaluation des conditions des nœuds : flags, réputation.
export function evalCond(cond, { flags, rep }) {
  if (!cond) return true
  if (cond.flag) return !!flags[cond.flag]
  if (cond.notFlag) return !flags[cond.notFlag]
  if (cond.anyFlag) return cond.anyFlag.some((f) => !!flags[f])
  if (cond.allFlags) return cond.allFlags.every((f) => !!flags[f])
  if (cond.rep) {
    const [axis, min] = cond.rep
    return (rep[axis] || 0) >= min
  }
  return true
}

// Détermine la voie (coeur/ruse/det) d'une scène à partir d'un préfixe de flag.
export function resolveVariant(prefix, flags) {
  if (flags[`${prefix}_coeur`]) return 'coeur'
  if (flags[`${prefix}_ruse`]) return 'ruse'
  if (flags[`${prefix}_det`]) return 'det'
  return 'coeur'
}
