import { draco } from '@gltf-transform/functions'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import gltf from 'vite-plugin-gltf'

export default () => {
  const plugins = [
    react(),
    glsl(),
    gltf({
      transforms: [draco()]
    })
  ]

  return plugins
}
