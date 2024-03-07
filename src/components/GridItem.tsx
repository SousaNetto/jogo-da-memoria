import { GridItemType } from '@/types/GridItemType'
import { items } from '@/data/items'
import interrogation from '../svgs/interrogation.svg'
import Image from 'next/image'

type Props = {
  item: GridItemType
  onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="mx-auto flex h-24 w-24 cursor-pointer items-center justify-center"
    >
      {!item.permanentShown && !item.shown && (
        <Image
          src={interrogation}
          alt="logo oculta"
          className="h-24 w-24 rounded-xl bg-gray-400 p-5 opacity-30"
        />
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <Image
          src={items[item.item].icon}
          alt="logo do item"
          className="h-24 w-24 rounded-xl bg-[#1550ff] p-3"
        />
      )}
    </div>
  )
}
