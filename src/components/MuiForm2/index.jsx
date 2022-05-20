/* eslint-disable no-undef */
// Library
import React, { useState } from 'react'
import { isEqual } from 'lodash'

// Material UI
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import Paper from '@mui/material/Paper'

// Custom interceptors
import translateRangeDate from '@react-jsonschema-form-interceptors/translate-range-date/dist'
import translateRatings from '@react-jsonschema-form-interceptors/translate-ratings/dist'

// Internal
// import Form from '../../../../src/framework'
import Form from 'react-jsonschema-form-material-ui'
import useStyles from './example-styles'
import Source from './Source'

// Custom Components
import CustomRating from './custom-components/rating.component'
import CustomComponent from './custom-components/range-picker.component'

const FormComponent = ({
  givenSchema,
  givenXhrSchema,
  givenUISchema,
  givenFormData,
  givenUIData,
  onCancel,
  onSubmit,
  onUpload,
  onFormChanged,
  onError,
}) => (
  <Form
    schema={givenSchema}
    xhrSchema={givenXhrSchema || {}}
    uiSchema={givenUISchema}
    formData={givenFormData}
    onCancel={onCancel}
    onSubmit={onSubmit}
    onStepNext={onSubmit}
    onUpload={onUpload}
    onChange={onFormChanged}
    onError={onError}
    interceptors={{
      translateRatings,
      translateRangeDate: ({
        value: givenData,
        uiValue: givenUiData,
        options,
      }) => {
        const startDate = givenData.startDate || givenData.start_date
        const endDate = givenData.endDate || givenData.end_date
        if (startDate && endDate) {
          const { formData, uiData } = translateRangeDate({
            data: {
              startDate,
              endDate,
            },
            options: {
              useLocaleString: 'us',
            },
          })
          return {
            formData,
            uiData,
          }
        }
        return {
          formData: givenData,
          uiData: typeof givenUiData === 'string' ? givenUiData : ' ',
        }
      },
    }}
    components={{
      customComponent: ({ onChange, ...rest }) => (
        <CustomComponent
          onChange={onChange}
          formData={givenFormData}
          uiData={givenUIData}
          {...rest}
        />
      ),
      customRating: ({ onChange, ...rest }) => (
        <CustomRating
          onChange={onChange}
          formData={givenFormData}
          uiData={givenUIData}
          {...rest}
        />
      ),
    }}
    validations={{
      confirmPassword: ({ schema, validations, formData, value }) =>
        formData &&
        formData.pass2 &&
        formData.pass1 &&
        formData.pass2 !== formData.pass1 && {
          message: validations.confirmPassword.message,
          inline: true,
        },
    }}
    submitOnEnter
    activityIndicatorEnabled
  />
)

const SourceSchema = ({
  locationHash,
  classes,
  validSchema,
  schema,
  uiSchema,
  xhrSchema,
  formData,
  onChange,
  hasSchemaError,
  showStuff,
}) => (
  <div className={classes.sourceCtr}>
    <div>
      <Source
        key={`${locationHash}Schema`}
        title={'JSONSchema.json'}
        source={schema}
        onChange={onChange('schema')}
      />
      {Object.keys(xhrSchema).length ? (
        <Source
          key={`${locationHash}xhrSchema`}
          title={'xhrSchema.json (Optional)'}
          source={xhrSchema}
          onChange={onChange('xhrSchema')}
        />
      ) : (
        ''
      )}
    </div>
    <div>
      <Source
        key={`${locationHash}UISchema`}
        title={'uiSchema.json (Optional)'}
        source={uiSchema}
        onChange={onChange('uiSchema')}
      />
      <Source
        key={`${locationHash}FormData`}
        title={'formData.json'}
        schema={validSchema}
        hasSchemaError={hasSchemaError}
        source={formData}
        onChange={onChange('formData')}
      />
    </div>
  </div>
)

const MuiForm2 = ({ data }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const iniFormData =
    typeof data.formData === 'string' ? data.formData : { ...data.formData }
  const [fullscreenMode, setFullScreenMode] = useState(false)
  const [oldHash, setOldHash] = useState(window.location.hash)
  const [state, setState] = useState({ ...data })
  const [formDataState, setFormData] = useState(iniFormData)
  const [schemaErrors, setSchemaErrors] = useState(null)
  const [validSchema, setValidSchema] = useState(null)

  if (!isEqual(oldHash, window.location.hash)) {
    setState(data)
    setFormData({ ...data.formData })
    setValidSchema(null)
    setSchemaErrors(null)
    setOldHash(window.location.hash)
  }

  const onChange = (type) => (value) => {
    setState({ ...state, [type]: value || '' })
  }

  const onFormChanged = ({
    formData,
    uiSchema,
    uiData,
    schemaErrors: givenSchemaErrors,
    validSchema: givenValidSchema,
  }) => {
    // console.log('formData is', formData);
    setState({ ...state, formData, uiSchema, uiData, validSchema })
    setSchemaErrors(givenSchemaErrors)
    setValidSchema(givenValidSchema)
    setFormData(formData)
  }

  const onSubmit = (value, callback) => {
    console.log('onSubmit: %s', JSON.stringify(value)) // eslint-disable-line no-console
    setTimeout(() => callback && callback(), 2000)
  }

  const onUpload = (value) => {
    console.log('onUpload:', value) // eslint-disable-line no-console
  }

  const onFormError = (error = {}) => {
    // eslint-disable-next-line no-console
    console.log('error is', error)
  }

  const onCancel = () => {
    setState({
      ...data,
    })
  }

  const { formData, uiSchema, schema, title, uiData, xhrSchema } = state

  const hash = window.location.hash.replace('#', '')
  const oldHashs = oldHash.replace('#', '')

  if (!isEqual(oldHashs, hash)) {
    return <div> Loading... </div>
  }

  const editorSchema = [
    {
      uri: 'http://json-schema.org/draft-07/schema',
      fileMatch: ['JSONSchema.json'],
      schema: undefined,
    },
    {
      uri: 'http://json-schema.org/draft-07/schema',
      fileMatch: ['uiSchema.json'],
      schema: undefined,
    },
    {
      uri: `${window.location.origin}/schema/${hash}/schema.json`,
      fileMatch: ['formData.json'],
      schema: validSchema || data.schema,
    },
  ]
  return fullscreenMode ? (
    <Paper className={classes.fullScreenRoot}>
      <h3>{title}</h3>
      <div className={classes.ctr}>
        <IconButton
          className={classes.fullScreenButton}
          color='inherit'
          aria-label='full-screen-exit-code'
          onClick={() => {
            setFullScreenMode(false)
            if (uiSchema['ui:page']) {
              if (uiSchema['ui:page'].tabs && uiSchema['ui:page'].tabs.style) {
                uiSchema['ui:page'].tabs.style.width = '29vw'
              }
              if (uiSchema['ui:page'].onload) {
                xhrSchema['ui:page'].onload.xhrProgress = false
              }
            }
            setState({
              ...state,
              formData,
              uiSchema,
              xhrSchema,
              uiData,
              validSchema,
            })
          }}
        >
          <FullscreenExitIcon />
        </IconButton>
        <FormComponent
          locationHash={hash}
          givenSchema={schema || data.schema}
          givenUISchema={uiSchema || data.uiSchema}
          givenFormData={formData}
          givenXhrSchema={xhrSchema || data.xhrSchema || {}}
          givenUIData={uiData}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onUpload={onUpload}
          onFormChanged={onFormChanged}
          onError={onFormError}
        />
      </div>
    </Paper>
  ) : (
    <Paper className={classes.root}>
      <h3>{title}</h3>
      <div className={classes.ctr}>
        <SourceSchema
          locationHash={hash}
          classes={classes}
          schema={schema || data.schema}
          validSchema={editorSchema || data.schema}
          uiSchema={uiSchema || data.uiSchema}
          formData={formData}
          xhrSchema={xhrSchema || data.xhrSchema || {}}
          hasSchemaError={schemaErrors}
          onChange={onChange}
        />
        <div className={classes.display}>
          <IconButton
            className={classes.fullScreenButton}
            color='inherit'
            aria-label='full-screen-code'
            onClick={() => {
              setFullScreenMode(true)
              if (uiSchema['ui:page']) {
                if (
                  uiSchema['ui:page'].tabs &&
                  uiSchema['ui:page'].tabs.style
                ) {
                  uiSchema['ui:page'].tabs.style.width = '81vw'
                }
                if (uiSchema['ui:page'].onload) {
                  xhrSchema['ui:page'].onload.xhrProgress = false
                }
              }
              setState({
                ...state,
                formData,
                xhrSchema,
                uiSchema,
                uiData,
                validSchema,
              })
            }}
          >
            <FullscreenIcon />
          </IconButton>
          <FormComponent
            locationHash={hash}
            givenSchema={schema || data.schema}
            givenUISchema={uiSchema || data.uiSchema}
            givenFormData={formData}
            givenXhrSchema={xhrSchema || data.xhrSchema || {}}
            givenUIData={uiData}
            onCancel={onCancel}
            onSubmit={onSubmit}
            onUpload={onUpload}
            onFormChanged={onFormChanged}
            onError={onFormError}
          />
        </div>
      </div>
    </Paper>
  )
}

export default MuiForm2
