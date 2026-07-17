import { useGameStore } from './store/gameStore.js'
import TitleScreen from './screens/TitleScreen.jsx'
import VillageMap from './screens/VillageMap.jsx'
import EncounterScreen from './screens/EncounterScreen.jsx'
import NotebookScreen from './screens/NotebookScreen.jsx'
import EndingScreen from './screens/EndingScreen.jsx'

const SCREENS = {
  title: TitleScreen,
  map: VillageMap,
  encounter: EncounterScreen,
  notebook: NotebookScreen,
  ending: EndingScreen,
}

export default function App() {
  const screen = useGameStore((s) => s.screen)
  const Screen = SCREENS[screen] ?? TitleScreen
  return <Screen />
}
