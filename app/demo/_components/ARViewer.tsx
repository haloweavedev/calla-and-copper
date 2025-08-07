'use client'

import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'

type ModelViewerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src: string
  alt?: string
  'camera-controls'?: boolean
  'auto-rotate'?: boolean
  ar?: boolean
  'ar-modes'?: string
  'ar-placement'?: string
  'environment-image'?: string
  'shadow-intensity'?: string | number
  style?: React.CSSProperties
}

const ModelViewer = 'model-viewer' as unknown as React.FC<ModelViewerProps>

export function ARViewer() {
  const [loading, setLoading] = useState(true)
  const modelViewerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const modelViewer = modelViewerRef.current
    if (!modelViewer) return

    const onLoad = () => setLoading(false)
    const onProgress = () => setLoading(false)

    modelViewer.addEventListener('load', onLoad as EventListener)
    modelViewer.addEventListener('progress', onProgress as EventListener)

    return () => {
      modelViewer.removeEventListener('load', onLoad as EventListener)
      modelViewer.removeEventListener('progress', onProgress as EventListener)
    }
  }, [])

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="lazyOnload"
      />
      <div className="w-full h-full relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <p className="font-bold animate-pulse">Loading 3D Model...</p>
          </div>
        )}
        <ModelViewer
          ref={modelViewerRef as unknown as React.Ref<HTMLElement>}
          src="https://cdn.glitch.global/2526f7bc-7148-4d8b-b41d-9e807db2cf9a/blackLeatherChair.glb?v=1724772841737"
          alt="A 3D model of a black leather chair"
          camera-controls
          auto-rotate
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          environment-image="neutral"
          shadow-intensity={1}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  )
}

