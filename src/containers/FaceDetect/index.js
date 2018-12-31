import React, { Component } from 'react'
import Clarifai from 'clarifai'
import Button from 'components/Button'
import Form from 'components/Form'
import { FormContainer, InputContainer } from './styled'
import { colors } from 'styles/palette'

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API
})

class FaceDetect extends Component {
  state = {
    imageURL: '',
    inputValue: '',
    imgWidth: '',
    imgHeight: '',
    boundingBox: {
      height: 0,
      width: 0,
      positionTop: 0,
      positionLeft: 0
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  onImageLoad = ({ target: img }) => {
    this.setState({ imgWidth: img.offsetWidth, imgHeight: img.offsetHeight })
    this.processToClarifai()
  }

  calculateFacePositions = boundingBox => {
    const { top_row, left_col, bottom_row, right_col } = boundingBox
    const { imgWidth, imgHeight } = this.state

    const boxDimensions = {
      height: (bottom_row - top_row) * imgHeight,
      width: (right_col - left_col) * imgWidth,
      positionTop: top_row * 100,
      positionLeft: left_col * 100
    }

    this.setState({ boundingBox: boxDimensions })
  }

  processToClarifai = () => {
    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', this.state.inputValue)
      .then(
        response => {
          const boundingBox =
            response.outputs[0].data.regions[0].region_info.bounding_box
          this.calculateFacePositions(boundingBox)
        },
        err => {
          console.log('failed to retrieve data from Clarifai')
        }
      )
  }

  onInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  onSubmit = () => {
    this.setState({ imageURL: this.state.inputValue })
  }

  render() {
    const { onInputChange, onSubmit } = this
    const { imageURL, boundingBox } = this.state

    return (
      <div
        className="flex flex-column justify-center items-center"
        style={{ height: '100vh' }}
      >
        <FormContainer>
          <InputContainer className="flex items-start pt4 pb2 ph4">
            <Form.Input
              id="image"
              label="Image link"
              placeholder="Image link"
              onChange={onInputChange}
            />
            <Button
              className="ml3"
              size="small"
              type="button"
              onClick={onSubmit}
            >
              DETECT
            </Button>
          </InputContainer>
        </FormContainer>
        {imageURL && (
          <div style={{ height: '60%', position: 'relative' }}>
            <img
              src={imageURL}
              className="pa3"
              onLoad={this.onImageLoad}
              alt="to-detect"
              style={{ maxHeight: '100%' }}
            />
            <div
              style={{
                border: `2px solid ${colors.primary}`,
                position: 'absolute',
                height: boundingBox.height,
                width: boundingBox.width,
                top: `${boundingBox.positionTop}%`,
                left: `${boundingBox.positionLeft}%`
              }}
            />
          </div>
        )}
      </div>
    )
  }
}

export default FaceDetect
