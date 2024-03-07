import Image from 'next/image'

type Props = {
  label: string
  icon?: any
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({ label, icon, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="mx-auto flex h-5 w-40 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1550ff] p-5 text-white transition-all hover:bg-[#1550ff70] md:mx-0 md:w-52"
    >
      <div>
        <Image src={icon} alt="icone do botão" className="h-5 w-5" />
      </div>
      <div className="">{label}</div>
    </div>
  )
}
