import { RingWorld as HelloRingWorld } from "@hello-worlds/planet"
import { RingWorld } from "@hello-worlds/react"
import { Html } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as React from "react"
import { useStore } from "statery"
import { DoubleSide, Mesh } from "three"
import FlyCamera from "../cameras/FlyCamera"
import ringWorker from "./RingWorld.worker"
import { useTheme } from "./Theme"
import { CERES_RADIUS } from "./WorldBuilder.math"
import { ECS, store } from "./WorldBuilder.state"

export const RingWorldRender = React.forwardRef<Mesh, HelloRingWorld>(
  (
    {
      position,
      radius = CERES_RADIUS,
      seed,
      focused,
      name,
      labelColor,
      type,
      length,
      // atmosphereRadius,
    },
    ref,
  ) => {
    const theme = useTheme()

    const camera = useThree(store => store.camera)

    const initialData = React.useMemo(
      () => ({
        seed,
        type,
      }),
      [],
    )
    const state = useStore(store)

    return (
      <RingWorld
        ref={ref}
        position={position}
        radius={radius}
        minCellSize={32 * 8}
        minCellResolution={32 * 2}
        inverted
        length={length}
        lodOrigin={camera.position}
        worker={ringWorker}
        data={initialData}
      >
        {focused && <FlyCamera />}
        {state.showPlanetLabels && (
          <Html>
            <i style={{ color: labelColor.getStyle() }}>{name}</i>
          </Html>
        )}
        {/* <mesh>
          <directionalLight color={0xffffff} intensity={0.3} castShadow />
          <sphereGeometry args={[radius / 100, 32, 16]}></sphereGeometry>
          <meshStandardMaterial
            color={0xffffff}
            emissive={0xffffff}
            emissiveIntensity={0.4}
          />
        </mesh> */}
        <meshStandardMaterial side={DoubleSide} vertexColors />
      </RingWorld>
    )
  },
)

export const RingWorlds: React.FC = () => {
  return (
    <ECS.ManagedEntities tag="ringWorld">
      {entity => {
        return (
          <ECS.Component name="mesh" key={entity.name}>
            <RingWorldRender {...entity} />
          </ECS.Component>
        )
      }}
    </ECS.ManagedEntities>
  )
}
