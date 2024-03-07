type Props = {
  label: string
  value: string
}

export const InfoItem = ({ label, value }: Props) => {
  return (
    <div>
      <div className="text-sm text-label">{label}</div>
      <div className="text-4xl font-bold text-value">{value}</div>
    </div>
  )
}
