import React from 'react'

// Décor de scène : ambiance surface (verts profonds, dorés) ou galeries
// (bleus nuit, bruns) traversée par l'orange/or de la lampe (Partie I §7).
export default function SceneBackdrop({ place, lampOn }) {
  return (
    <div className={`backdrop backdrop--${place}`}>
      {place === 'surface' && (
        <>
          <div className="backdrop__sun" />
          <div className="backdrop__hills" />
          <div className="backdrop__tree" />
        </>
      )}
      {place !== 'surface' && (
        <>
          <div className="backdrop__rock" />
          <div className="backdrop__spirals">𖦹&ensp;&emsp;𖦹&emsp;&ensp;𖦹</div>
          {lampOn && <div className="backdrop__lamp" />}
          <div className="backdrop__dust" />
        </>
      )}
      {place === 'salle' && <div className="backdrop__glow" />}
    </div>
  )
}
