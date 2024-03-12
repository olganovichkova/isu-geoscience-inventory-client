interface smallLabel {
  label: string;
}

export default function SmallLabel(prop: smallLabel) {
  return (
    <small className="font-thin text-sm block text-muted">{prop.label}</small>
  );
}
