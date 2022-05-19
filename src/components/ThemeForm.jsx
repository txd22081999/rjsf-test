import { withTheme } from '@rjsf/core'

const theme = { widgets: { test: () => <div>test</div> } }

const ThemedForm = withTheme(theme)

export default ThemedForm
