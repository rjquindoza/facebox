import React, { Component, Fragment } from 'react'
import Clarifai from 'clarifai'
import { RingLoader } from 'react-spinners'
import Button from 'components/Button'
import Form from 'components/Form'
import { colors } from 'styles/palette'
import { FormContainer, InputContainer, ImageContainer, BoundingBox, ErrorMsg } from './styled'

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API
})

class FaceDetect extends Component {
  state = {
    noFaceFound: false,
    isLoading: true,
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
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.inputValue).then(
      response => {
        const results = response.outputs[0].data.regions

        if (results) {
          const faces = results.map((result, index) => result.region_info.bounding_box)
          this.setState({ isLoading: false })
          this.calculateFacePositions(faces)
        } else {
          this.setState({ noFaceFound: true, isLoading: false })
        }
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
    this.setState({
      imageURL: this.state.inputValue,
      noFaceFound: false,
      isLoading: true,
      boundingBoxes: []
    })
  }

  render() {
    const { onInputChange, onSubmit } = this
    const { imageURL, boundingBoxes, noFaceFound, isLoading } = this.state

    return (
      <div className="flex flex-column justify-center items-center" style={{ height: '100vh' }}>
        <FormContainer className="mb2">
          <InputContainer className="flex items-start pt4 pb2 ph4">
            <Form.Input
              id="image"
              label="Image link"
              placeholder="Image link"
              onChange={onInputChange}
            />
            <Button className="ml3" size="small" type="button" onClick={onSubmit}>
              DETECT
            </Button>
          </InputContainer>
        </FormContainer>
        {imageURL && (
          <Fragment>
            <RingLoader sizeUnit={'px'} size={50} color={colors.primary} loading={isLoading} />
            <ImageContainer className="relative ma3">
              <img src={imageURL} onLoad={this.onImageLoad} alt="to-detect" />
              {boundingBoxes.map(({ height, width, positionTop, positionLeft }, index) => (
                <BoundingBox
                  key={index}
                  className="absolute"
                  height={`${height}px`}
                  width={`${width}px`}
                  top={`${positionTop}%`}
                  left={`${positionLeft}%`}
                />
              ))}
            </ImageContainer>
          </Fragment>
        )}
        {noFaceFound && <ErrorMsg>No face found in your image</ErrorMsg>}
      </div>
    )
  }
}

export default FaceDetect
