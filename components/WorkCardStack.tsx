'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  images: string[]
  title: string
  fit?: 'cover' | 'contain'
  className?: string
}

const CARD_TRANSFORMS = [
  'rotate(3deg) scale(0.97)',
  'rotate(-5deg) scale(0.94)',
]

export function WorkCardStack({ images, title, fit = 'cover', className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  const close = () => setOpen(false)
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, prev, next])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const backCards = images.slice(1).reverse()

  return (
    <>
      {/* Stacked card thumbnail */}
      <div
        className={`relative aspect-[4/3] cursor-pointer overflow-visible ${className}`}
        onClick={() => { setIdx(0); setOpen(true) }}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setIdx(0); setOpen(true) } }}
        aria-label={`View ${images.length} photos of ${title}`}
      >
        {backCards.map((src, si) => (
          <div
            key={src}
            className={`absolute inset-0 overflow-hidden rounded-xl ${fit === 'contain' ? 'bg-black' : 'bg-white'}`}
            style={{
              transform: CARD_TRANSFORMS[si] ?? CARD_TRANSFORMS[CARD_TRANSFORMS.length - 1],
              zIndex: si + 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            <Image src={src} alt="" fill className={fit === 'contain' ? 'object-contain' : 'object-cover'} sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ))}

        {/* Front card */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-xl ${fit === 'contain' ? 'bg-black' : 'bg-white'}`}
          style={{ zIndex: images.length, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            className={fit === 'contain' ? 'object-contain' : 'object-cover'}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {images.length > 1 && (
            <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-0.5 font-mono text-[10px] text-white">
              {images.length} photos
            </span>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={close}
        >
          <button
            className="absolute right-5 top-5 text-3xl leading-none text-white/60 transition-colors hover:text-white"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>

          <div
            className="relative w-full max-w-4xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                key={idx}
                src={images[idx]}
                alt={`${title} — photo ${idx + 1} of ${images.length}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-x-14 -translate-y-1/2 text-5xl leading-none text-white/50 transition-colors hover:text-white"
                  onClick={prev}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  className="absolute right-0 top-1/2 translate-x-14 -translate-y-1/2 text-5xl leading-none text-white/50 transition-colors hover:text-white"
                  onClick={next}
                  aria-label="Next photo"
                >
                  ›
                </button>
                <div className="mt-4 flex justify-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-200 ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/35'}`}
                      onClick={() => setIdx(i)}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
