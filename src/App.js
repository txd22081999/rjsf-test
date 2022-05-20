import './App.css'
import DefaultForm from '@rjsf/core'
import { withTheme } from '@rjsf/core'
import ThemeObject, { MyCustomWidget } from './components/MyCustomWidget'
import MuiForm2 from './components/MuiForm2'

export const sampleSchema = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      default: 'Chuck',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
      placeholder: 'Enter your last name',
      className: 'text-green-500',
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
}

export const sampleUiSchema = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'family-name',
  },
  lastName: {
    'ui:emptyValue': '',
    'ui:autocomplete': 'given-name',
  },
  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earthian year)',
  },
  bio: {
    'ui:widget': 'textarea',
  },
  password: {
    'ui:widget': 'password',
    'ui:help': 'Hint: Make it strong!',
  },
  date: {
    'ui:widget': 'alt-datetime',
  },
  telephone: {
    'ui:options': {
      inputType: 'tel',
    },
  },
}

const log = (type) => console.log.bind(console, type)

const Form = withTheme(ThemeObject)

function App() {
  return (
    <div className='App py-40'>
      <DefaultForm
        schema={sampleSchema}
        onChange={log('changed')}
        onSubmit={log('submitted')}
        onError={log('errors')}
        widgets={{
          TextWidget: MyCustomWidget,
        }}
        // className='text-red-600'
      />

      {/* <MuiForm /> */}
      <MuiForm2 />
    </div>
  )
}

export default App
