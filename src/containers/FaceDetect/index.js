import React, { Component } from 'react'
import Clarifai from 'clarifai'
import Button from 'components/Button'
import Form from 'components/Form'
import {
  FormContainer,
  InputContainer,
  ImageContainer,
  BoundingBox
} from './styled'

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API
})

class FaceDetect extends Component {
  state = {
    imageURL: '',
    inputValue: '',
    imgWidth: '',
    imgHeight: '',
    boundingBoxes: []
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  onImageLoad = ({ target: img }) => {
    this.setState(
      { imgWidth: img.offsetWidth, imgHeight: img.offsetHeight },
      this.processToClarifai()
    )
  }

  calculateFacePositions = faces => {
    const { imgWidth, imgHeight } = this.state

    const boundingBoxes = faces.map((face, index) => {
      const { top_row, left_col, bottom_row, right_col } = face

      const boxDimensions = {
        height: (bottom_row - top_row) * imgHeight,
        width: (right_col - left_col) * imgWidth,
        positionTop: top_row * 100,
        positionLeft: left_col * 100
      }

      return boxDimensions
    })

    this.setState({ boundingBoxes: boundingBoxes })
  }

  processToClarifai = () => {
    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', this.state.inputValue)
      .then(
        response => {
          const results = response.outputs[0].data.regions

          const faces = results.map(
            (result, index) => result.region_info.bounding_box
          )

          this.calculateFacePositions(faces)
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
    const { imageURL, boundingBoxes } = this.state

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
          <ImageContainer className="relative">
            <img
              src={imageURL}
              className="pa3"
              onLoad={this.onImageLoad}
              alt="to-detect"
            />
            {boundingBoxes.map(
              ({ height, width, positionTop, positionLeft }, index) => (
                <BoundingBox
                  key={index}
                  className="absolute"
                  height={`${height}px`}
                  width={`${width}px`}
                  top={`${positionTop}%`}
                  left={`${positionLeft}%`}
                />
              )
            )}
          </ImageContainer>
        )}
      </div>
    )
  }
}

export default FaceDetect
