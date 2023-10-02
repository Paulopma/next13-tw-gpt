'use client'

import { useEffect } from 'react'
import { themeChange } from 'theme-change'

export function Header() {
  useEffect(() => {
    themeChange(false)
  }, [])

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ]

  return (
    <main className="navbar flex justify-between bg-base-300 lg:px-10">
      <h1 className="font-semibold text-primary">Daniela Chaves</h1>
      <select
        data-choose-theme
        className="select select-secondary select-sm h-[20px] max-w-xs py-0 text-sm capitalize"
      >
        <option selected disabled>
          Escolha um tema :)
        </option>
        {themes.map((item) => {
          return (
            <option className="capitalize" key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </main>
  )
}
