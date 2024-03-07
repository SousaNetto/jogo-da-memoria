'use client'
import { useEffect, useState } from 'react'
import { items } from '@/data/items'
import { GridItemType } from '@/types/GridItemType'
import { formatTimeElapsed } from '@/utils/FormatTimeElapsed'
import { InfoItem } from '@/components/infoItem'
import { Button } from '@/components/button'
import { GridItem } from '@/components/GridItem'
import Image from 'next/image'
import logo from '@/assets/devmemory_logo.png'
import RestartIcon from '@/svgs/restart.svg'
import play from '@/svgs/play.svg'

export const Infos = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, SetTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])
  const [starter, setStarter] = useState<boolean>(false)

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (starter) {
        if (playing) SetTimeElapsed(timeElapsed + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed, starter])

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true)
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems]
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShowCount(0)
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems]
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGridItems(tmpGrid)
            setShowCount(0)
          }, 1000)
        }
        setMoveCount((moveCount) => moveCount + 1)
      }
    }
  }, [showCount, gridItems])

  useEffect(() => {
    if (moveCount > 0 && gridItems.every((item) => item.permanentShown === true)) {
      setPlaying(false)
    }
  }, [moveCount, gridItems])

  const handleStartGame = () => {
    setStarter(true)
    setPlaying(true)
  }

  const resetAndCreateGrid = () => {
    SetTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)

    let tmpGrid: GridItemType[] = []
    for (let i = 0; i < items.length * 2; i++)
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      })
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = i
      }
    }
    setGridItems(tmpGrid)
    setPlaying(false)
    setStarter(false)
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems]
      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true
        setShowCount(showCount + 1)
      }
      setGridItems(tmpGrid)
    }
  }

  return (
    <div className="flex w-full flex-col md:mx-5 md:flex-row md:items-center ">
      <div className="mb-12">
        <div>
          <Image src={logo} alt="logo" className="mx-auto w-48" />
        </div>
        <div className="my-5 flex justify-around md:flex-col">
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </div>
        {!starter && <Button label="Iniciar" icon={play} onClick={handleStartGame} />}
        {starter && (
          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        )}
      </div>
      <div className="flex flex-1 items-center justify-center py-3 md:mx-0 md:justify-end">
        <div className="md:mx0 mx-2 grid w-[430px] grid-cols-3 gap-3 md:grid-cols-4">
          {gridItems.map((item, index) => (
            <GridItem key={index} item={item} onClick={() => handleItemClick(index)} />
          ))}
        </div>
      </div>
    </div>
  )
}
