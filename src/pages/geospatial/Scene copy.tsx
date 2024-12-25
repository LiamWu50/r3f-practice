import { useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { PrecomputedTexturesLoader } from '@takram/three-atmosphere'
import {
  type AtmosphereApi,
  AerialPerspective,
  Atmosphere,
  Sky,
  Stars
} from '@takram/three-atmosphere/r3f'
import {
  GLTFExtensionsPlugin,
  GoogleCloudAuthPlugin,
  TileCompressionPlugin,
  TilesFadePlugin,
  UpdateOnChangePlugin
} from '3d-tiles-renderer/plugins'
import {
  GlobeControls,
  TilesPlugin,
  TilesRenderer
} from '3d-tiles-renderer/r3f'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { type FC, useRef } from 'react'
import { DRACOLoader } from 'three-stdlib'

import { googleMapsApiKey } from '../../common/token'
import {
  type LocalDateControlsParams,
  useLocalDateControls
} from '../../helpers/useLocalDateControls'
import { TileCreasedNormalsPlugin } from '../../packages/3d-tiles/TileCreasedNormalsPlugin'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

const Globe: FC = () => {
  const apiKey = googleMapsApiKey
  return (
    <TilesRenderer
      key={apiKey} // Reconstruct tiles when API key changes.
    >
      <TilesPlugin plugin={GoogleCloudAuthPlugin} args={{ apiToken: apiKey }} />
      <TilesPlugin plugin={GLTFExtensionsPlugin} dracoLoader={dracoLoader} />
      <TilesPlugin plugin={TileCompressionPlugin} />
      <TilesPlugin plugin={UpdateOnChangePlugin} />
      <TilesPlugin plugin={TilesFadePlugin} />
      <TilesPlugin
        plugin={TileCreasedNormalsPlugin}
        args={{ creaseAngle: radians(30) }}
      />
      {/* Controls */}
      <GlobeControls enableDamping={true} />
    </TilesRenderer>
  )
}

interface SceneProps extends LocalDateControlsParams {
  exposure?: number
  longitude?: number
  latitude?: number
  heading?: number
  pitch?: number
  distance?: number
}

const Scene: FC<SceneProps> = ({
  exposure = 10,
  longitude = 139.7671,
  latitude = 35.6812,
  heading = 180,
  pitch = -30,
  distance = 4500,
  ...localDate
}) => {
  const motionDate = useLocalDateControls({ longitude, ...localDate })

  const { correctAltitude, correctGeometricError, photometric } = useControls(
    'atmosphere',
    {
      correctAltitude: true,
      correctGeometricError: true,
      photometric: true
    }
  )

  const precomputedTextures = useLoader(PrecomputedTexturesLoader, '/assets')

  const { performance } = useControls('Monitoring', {
    performance: false
  })

  const atmosphereRef = useRef<AtmosphereApi>(null)
  useFrame(() => {
    atmosphereRef.current?.updateByDate(new Date(motionDate.get()))
  })

  return (
    <>
      {performance && <Perf position='top-left' />}

      <Atmosphere
        ref={atmosphereRef}
        textures='atmosphere'
        correctAltitude={correctAltitude}
        photometric={photometric}
      >
        <Sky />
        <Stars data='atmosphere/stars.bin' />
        {/* <Globe /> */}
        <EffectComposer enableNormalPass>
          <AerialPerspective skyIrradiance sunIrradiance />
        </EffectComposer>
      </Atmosphere>
    </>
  )
}

export { Scene }
