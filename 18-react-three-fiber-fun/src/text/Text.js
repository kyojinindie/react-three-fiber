import { Text } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

export default function TextC({
  delay,
  position,
  font,
  fontSize,
  content,
  duration,
  from,
  to
}) {
  const { opacity } = useSpring({
    from,
    to,
    config: { duration },
    delay
  });

  return (
    <Text fontSize={fontSize} font={font} position={position}>
      {content}
      <a.meshStandardMaterial attach="material" opacity={opacity} />
    </Text>
  );
}
