import React from 'react'
import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui'
import { sampleUiSchema } from '../../App'

const MuiForm = () => {
  //   const [formData, setFormData] = React.useState(givenFormData)
  const [formData, setFormData] = React.useState({})

  return (
    <MaterialJsonSchemaForm
      schema={sampleUiSchema}
      uiSchema={sampleUiSchema}
      //   xhrSchema={givenXhrSchema || {}} // Optional
      theme={{}} // Optional - You need to explicitly provide your custom theme from MUI5 onwards
      formData={formData}
      onChange={({ formData }) => setFormData(formData)}
      onSubmit={(submittedData) => console.log('form submitted', submittedData)}
    />
  )
}

export default MuiForm
