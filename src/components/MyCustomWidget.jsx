import cls from 'classnames'

export const MyCustomWidget = (props) => {
  console.log(props)
  return (
    <input
      type='text'
      className={cls(
        'custom text-purple-600 font-medium px-2 py-1 border-2 rounded-sm ml-2 mb-2',
        props.schema.className
      )}
      value={props.value}
      placeholder={props.schema.placeholder || ''}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)}
    />
  )
}

export const myWidgets = {
  myCustomWidget: MyCustomWidget,
}

const ThemeObject = { widgets: myWidgets }
export default ThemeObject
