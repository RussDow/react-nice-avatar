import React from 'react'

import './index.scss'

export default function sectionWrapper(props: {
  className?: string,
  children: JSX.Element,
  switchConfig: () => void,
  tip: string
}): HTMLElement {
  const { className = "", children, switchConfig, tip } = props
  return (
    <div className='flex flex-col justify-center items-center text-black font-bold gap-1'>
      <div>{tip}</div>
      <div
        className={"SectionWrapper " + className}      
        onClick={switchConfig}>
        <div className="relative w-full h-full">
          <div className="childrenWrapper group absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>      
      </div>
    </div>
  )
}