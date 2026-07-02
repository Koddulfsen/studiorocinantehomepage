import Image from 'next/image'

interface Props {
  images: string[]
  title: string
  fit?: 'cover' | 'contain'
  className?: string
}

export function WorkCardStack({ images, title, fit = 'cover', className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-md bg-black ${className}`}>
      <Image
        src={images[0]}
        alt={title}
        width={800}
        height={1200}
        className="w-full h-auto"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}
