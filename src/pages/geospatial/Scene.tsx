import { useFrame } from '@react-three/fiber'
import {
  type AtmosphereApi,
  Atmosphere,
  Sky,
  useAtmosphereTextureProps
} from '@takram/three-atmosphere/r3f'
import { useRef } from 'react'
import { Vector3 } from 'three'

const Scene = () => {
  const atmosphereRef = useRef<AtmosphereApi>(null)
  useFrame(() => {
    // Computes sun direction, moon direction and ECI to ECEF rotation
    // matrix by the date, then propagates them to descendant components via
    // context.
    atmosphereRef.current?.updateByDate(new Date())
  })

  // The choice of precomputed textures depends on whether single-precision
  // float or half-float textures are supported. Some devices don't support
  // single-precision textures, so this hook fallbacks to half-float textures
  // when necessary.
  const textureProps = useAtmosphereTextureProps('/assets')
  return (
    <Atmosphere ref={atmosphereRef} {...textureProps}>
      <Sky sun={true} moon={true} moonDirection={new Vector3(0, 0, 0)} />
    </Atmosphere>
  )
}

export { Scene }
