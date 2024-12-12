import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

import { Stats } from '../../helpers/Stats'
import styles from './index.module.scss'
import { Scene } from './Scene'

const Geospatial = () => {
  return (
    <div className={styles.geospatial}>
      <Leva
        collapsed={false}
        oneLineLabels={false}
        flat={true}
        theme={{
          sizes: {
            titleBarHeight: '28px'
          },
          fontSizes: {
            root: '10px'
          }
        }}
      />
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
          position: [3, 2, 9]
        }}
        shadows
      >
        <Stats />
        <Scene />
      </Canvas>
    </div>
  )
}

export default Geospatial
