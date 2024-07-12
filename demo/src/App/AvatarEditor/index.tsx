import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { defaultOptions } from "react-nice-avatar/utils"
import Face from "react-nice-avatar/face/index"
import Hair from "react-nice-avatar/hair/index"
import Hat from "react-nice-avatar/hat/index"
import Eyes from "react-nice-avatar/eyes/index"
import Glasses from "react-nice-avatar/glasses/index"
import Ear from "react-nice-avatar/ear/index"
import EyeBrow from "react-nice-avatar/eyebrow/index"
import Nose from "react-nice-avatar/nose/index"
import Mouth from "react-nice-avatar/mouth/index"
import Shirt from "react-nice-avatar/shirt/index"
import ColorPicker from "react-nice-avatar/colorPicker/index"

import Droptions from "./Droptions/index"
import SectionWrapper from "./SectionWrapper/index"

import './index.scss'

export default class AvatarEditor extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    shape: PropTypes.string.isRequired,
    updateConfig: PropTypes.func.isRequired,
    updateShape: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isCodeShow: false
    }
    this.myDefaultOptions = this.genDefaultOptions(defaultOptions)
    this.shapes = ['circle', 'rounded', 'square']
  }

  // Modification on defaultOptions for convenient
  genDefaultOptions (opts) {
    const hairSet = new Set(opts.hairStyleMan.concat(opts.hairStyleWoman))
    return {
      ...opts,
      hairStyle: Array.from(hairSet),
      eyeBrowStyle: opts.eyeBrowWoman,
      bgColor: opts.bgColor.concat(opts.gradientBgColor)
    }
  }

  switchConfig (type, currentOpt) {
    const { updateConfig } = this.props
    const opts = this.myDefaultOptions[type]
    const currentIdx = opts.findIndex(item => item === currentOpt)
    const newIdx = (currentIdx + 1) % opts.length
    updateConfig(type, opts[newIdx])
  }

  switchHairColor (event) {
    const { updateConfig } = this.props
    updateConfig('hairColor', event.target.value)
  }

  applyConfig (type, value) {
    const { updateConfig } = this.props
    updateConfig(type, value)
  }

  switchShape (currentShape) {
    const { updateShape } = this.props
    const currentIdx = this.shapes.findIndex(item => item === currentShape)
    const newIdx = (currentIdx + 1) % this.shapes.length
    updateShape(this.shapes[newIdx])
  }

  toggleCodeShow () {
    const { isCodeShow } = this.state
    this.setState({
      isCodeShow: !isCodeShow
    })
  }

  genCodeString (config) {
    const ignoreAttr = ['id']
    const myConfig = Object.keys(config)
      .filter(key => !ignoreAttr.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: config[key] }), {})
    return "const config = " +
    JSON.stringify(myConfig, null, 2) +
    "\n" +
    "const myConfig = genConfig(config)\n" +
    "<NiceAvatar style={{ width: '5rem', height: '5rem' }} {...myConfig} />"
  }

  render () {
    const { config, shape, download } = this.props
    const { isCodeShow } = this.state
    
    return (
      <div className="AvatarEditor rounded-2xl px-3 py-2 flex gap-3 items-center bg-white bg-opacity-70">
        {/* Face */}
        
          <SectionWrapper
            className="w-12 h-12 rounded-full p-2 mx-2"
            tip="Face"
            switchConfig={this.switchConfig.bind(this, 'faceColor', config.faceColor)}>
            <Face color={config.faceColor} />          
          </SectionWrapper>
          {/* <Droptions id="faceOptions" className="w-16 p-2 pt-4 mt-2 absolute top-10 flex flex-col gap-2">
            {this.myDefaultOptions['faceColor'].map((color, idx) =>                   
              <div key={color} className="relative w-12 h-12 rounded-full p-2" onClick={this.applyConfig.bind(this, 'faceColor', color)}>
                <div className="optionWrapper relative top-0 left-0 w-full h-full flex justify-center">
                  <Face color={color} />
                </div>
              </div>                  
            )}                                  
          </Droptions> */}
        
        {/* Hair style */}
        
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Hair"
          switchConfig={this.switchConfig.bind(this, 'hairStyle', config.hairStyle)}>
          <Hair style={config.hairStyle} color={config.hairColor} colorRandom={true} />
        </SectionWrapper>
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2 relative"
          tip="Hair Color"
          switchConfig={() => { null }}>
          <input type="color" className="colorPicker bg-transparent border-0 opacity-0 absolute h-12 cursor-pointer" value={config.hairColor} 
          onChange={(e) => this.switchHairColor(e)} />
          <div className='w-12 h-12 absolute'>
            <ColorPicker />
          </div>
        </SectionWrapper>
        {/* Eyes style */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Eyes"
          switchConfig={this.switchConfig.bind(this, 'eyeStyle', config.eyeStyle)}>
          <Eyes style={config.eyeStyle} color="#fff" />
        </SectionWrapper>
        {/* EyeBrow style */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Eyebrows"
          switchConfig={this.switchConfig.bind(this, 'eyeBrowStyle', config.eyeBrowStyle)}>
          <EyeBrow style={config.eyeBrowStyle} color="#fff" />
        </SectionWrapper>
        {/* Glasses style */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Glasses"
          switchConfig={this.switchConfig.bind(this, 'glassesStyle', config.glassesStyle)}>
          { config.glassesStyle == "none" ? <span className="text-2xl">🚫</span> : <Glasses style={config.glassesStyle} color="#fff" />}
        </SectionWrapper>
        {/* Nose style */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Nose"
          switchConfig={this.switchConfig.bind(this, 'noseStyle', config.noseStyle)}>
          <Nose style={config.noseStyle} color="#fff" />
        </SectionWrapper>
        {/* Mouth style */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Mouth"
          switchConfig={this.switchConfig.bind(this, 'mouthStyle', config.mouthStyle)}>
          <Mouth style={config.mouthStyle} color="#fff" />
        </SectionWrapper>
        {/* Shirt style */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Shirt"
          switchConfig={this.switchConfig.bind(this, 'shirtStyle', config.shirtStyle)}>
          <Shirt style={config.shirtStyle} color="#fff" />
        </SectionWrapper>

        {/* Background Color */}
        <SectionWrapper
          className="w-12 h-12 rounded-full p-2 mx-2"
          tip="Background"
          switchConfig={this.switchConfig.bind(this, 'bgColor', config.bgColor)}>
          <div
            className={"w-7 h-7 bg-white rounded-full"} style={{background: config.bgColor}} />
        </SectionWrapper>
        
        <div className="divider h-14 rounded mx-2" />
        <i
          className="iconfont icon-download text-4xl text-black mr-2 cursor-pointer"
          data-tip="Download"
          onClick={download} />
      </div>
    )
  }
}
