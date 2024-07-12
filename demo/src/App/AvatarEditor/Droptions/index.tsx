import React from 'react'

import './index.scss'

export default function dropdownOptions(props: {
  className?: string,
  id?: string,
  children: JSX.Element,
  updateConfig: () => void
}): HTMLElement {
  const { className = "", children, id } = props
  return (
    <div
      id={id}
      className={"DropdownOptions " + className}>
      {children}
    </div>
  )
}