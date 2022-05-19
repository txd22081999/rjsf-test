import './App.css'
import DefaultForm from '@rjsf/core'
import { withTheme } from '@rjsf/core'
import ThemeObject, { MyCustomWidget } from './components/MyCustomWidget'

const schema = {
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

const log = (type) => console.log.bind(console, type)

const Form = withTheme(ThemeObject)

function App() {
  return (
    <div className='App'>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
        dignissimos error odio velit ratione eligendi et, fugit quae optio eum,
        quaerat veniam reprehenderit? Tempore, rem? Nobis maiores voluptatum
        sequi et.
      </p>

      <DefaultForm
        schema={schema}
        onChange={log('changed')}
        onSubmit={log('submitted')}
        onError={log('errors')}
        widgets={{
          TextWidget: MyCustomWidget,
        }}
        // className='text-red-600'
      />
    </div>
  )
}

export default App
