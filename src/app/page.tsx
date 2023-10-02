'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import JSZip from 'jszip'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function Home() {
  const [response, setResponse] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [imagesBlob, setImagesBlob] = useState<Blob[]>([])
  const [activeTab, setActiveTab] = useState(1)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [hostUrl, setHostUrl] = useState('')

  function sendMessage() {
    setIsLoading(true)
    fetch(`http://${hostUrl}/api/cast-listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        treatResponse(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  // const responseAux =
  //   'Daniel Azcar - 40 anos\nAline Souza - 28 anos - Asa Norte\nElton Moreira - 35 anos\nFernando Aquino - 25 anos\nPhelipe Mendes Xavier - 26 anos\nAnanda Ribeiro - 20 anos - 61996992002 - Asa Norte\nCésar Santos - 38 anos\nPaulo Lara - 40 anos\nAndressa Leila - 25 anos\nDaniel Azcar - 40 anos\nAline Souza - 28 anos - Asa Norte\nElton Moreira - 35 anos\nFernando Aquino - 25 anos\nPhelipe Mendes Xavier - 26 anos\nAnanda Ribeiro - 20 anos - 61996992002 - Asa Norte\nCésar Santos - 38 anos\nPaulo Lara - 40 anos\nAndressa Leila - 25 anos'
  // const resArray = responseAux.split('\n')

  function treatResponse(response: string) {
    console.log(response)
    setResponse(response.split('\n'))
  }

  function handleFileCall(info: string) {
    setName(info)
    const fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    const imageFiles = files.filter((item) => item.type.includes('image'))

    const imageBlobs = await Promise.all(
      imageFiles.map(async (item) => new Blob([item], { type: item.type })),
    )

    const zipFiles = files.filter((item) => item.name.endsWith('.zip'))

    if (zipFiles.length > 0) {
      const zip = new JSZip()
      const unzipPromises = zipFiles.map(async (item) => {
        const loadedZip = await zip.loadAsync(item)
        const promises: Promise<Blob>[] = []
        loadedZip.forEach((relativePath, file) => {
          if (!file.dir && /\.(jpg|jpeg|png|gif)$/i.test(relativePath)) {
            promises.push(
              file
                .async('blob')
                .then((content) => new Blob([content], { type: item.type })),
            )
          }
        })
        return Promise.all(promises)
      })

      const unzippedImageBlobs = await Promise.all(unzipPromises)

      unzippedImageBlobs.forEach((blobs) => imageBlobs.push(...blobs))
    }

    setImagesBlob(imageBlobs)

    if (screenWidth < 1024) {
      setActiveTab(2)
    }
  }

  async function saveAll() {
    if (imagesBlob.length === 0) return
    const zip = new JSZip()

    imagesBlob.forEach((blob, index) => {
      zip.file(`${name}(${index + 1}).jpeg`, blob)
    })

    const content = await zip.generateAsync({ type: 'blob' })

    const zipUrl = URL.createObjectURL(content)

    const link = document.createElement('a')
    link.href = zipUrl
    link.download = `${name}.zip`

    link.click()

    URL.revokeObjectURL(zipUrl)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    const host = window.location.hostname
    setHostUrl(host)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className="items-center p-5 lg:flex lg:items-start lg:justify-around">
      <div className="mb-3 flex w-full justify-center lg:hidden">
        {/* eslint-disable-next-line prettier/prettier */}
        <div className="tabs tabs-boxed w-fit">
          <a
            onClick={() => setActiveTab(1)}
            className={cn(`tab px-10 ${activeTab === 1 ? 'tab-active' : ''}`)}
          >
            Texto
          </a>
          <a
            onClick={() => setActiveTab(2)}
            className={cn(`tab px-10 ${activeTab === 2 ? 'tab-active' : ''}`)}
          >
            Fotos
          </a>
        </div>
      </div>
      {activeTab === 1 && (
        <section className="lg:w-[50%]">
          <div className="flex flex-col items-center gap-4">
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              className="textarea textarea-secondary w-full"
              placeholder="Insira o texto"
              cols={30}
              rows={10}
            ></textarea>
            <button onClick={sendMessage} className="btn btn-primary btn-md">
              {isLoading && <span className="loading loading-spinner"></span>}
              Fazer a mágica 🪄
            </button>
          </div>
          {response.length > 0 && (
            <ol className="mt-4 list-decimal rounded-lg border-[1px] border-secondary p-4">
              {response.map((item) => {
                return (
                  <li
                    className="ml-4 cursor-pointer transition-all hover:underline"
                    key={item}
                    onClick={() => handleFileCall(item)}
                  >
                    {item}
                  </li>
                )
              })}
            </ol>
          )}
          <input
            className="hidden"
            accept=".jpg,.jpeg,.png,.gif,.zip"
            type="file"
            multiple
            id="fileInput"
            onChange={(e) => handleFiles(e)}
          />
        </section>
      )}
      {(imagesBlob.length > 0 && activeTab === 2) ||
      (screenWidth > 1024 && imagesBlob.length > 0) ? (
        <section className="lg:w-[40%]">
          <button className="w-full" onClick={saveAll}>
            <h1 className="mb-2 text-center text-lg text-accent">{name}</h1>
          </button>
          <div className="columns-2 md:columns-3 lg:columns-4">
            {imagesBlob.map((item) => {
              return (
                <a
                  key={item.name}
                  href={URL.createObjectURL(item)}
                  download={`${name}.jpeg`}
                >
                  <Image
                    className="mb-2 w-auto"
                    height={200}
                    width={200}
                    src={URL.createObjectURL(item)}
                    alt={item.name}
                    aria-label={item.name}
                    sizes="50vw"
                  />
                </a>
              )
            })}
          </div>
        </section>
      ) : null}
    </main>
  )
}
