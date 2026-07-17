import React, { useEffect } from 'react'
import { useGame } from './store/gameStore.js'
import TitleScreen from './screens/TitleScreen.jsx'
import VillageCut from './screens/VillageCut.jsx'
import SceneScreen from './screens/SceneScreen.jsx'
import EndingScreen from './screens/EndingScreen.jsx'
import { setSoundEnabled } from './engine/soundManager.js'

export default function App() {
  const screen = useGame((s) => s.screen)
  const sceneId = useGame((s) => s.sceneId)
  const sound = useGame((s) => s.settings.sound)

  useEffect(() => {
    setSoundEnabled(sound)
  }, [sound])

  if (screen === 'scene') return sceneId ? <SceneScreen /> : <VillageCut />
  if (screen === 'map') return <VillageCut />
  if (screen === 'fin') return <EndingScreen />
  return <TitleScreen />
}
