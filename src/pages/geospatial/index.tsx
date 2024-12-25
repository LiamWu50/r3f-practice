import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

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
        gl={{
          antialias: false,
          depth: false,
          stencil: false
        }}
      >
        <Stats />
        <Scene />
      </Canvas>
    </div>
  )
}

export default Geospatial
