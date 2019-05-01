
import { combineProps } from 'rx-react-container'
import { mapObjIndexed } from 'ramda'

const rxConnector = controller => component => {
  const container = controller(component)

  const forwardedBaseProps = mapObjIndexed((v, k, _) => component.getProp(k), component.props)
  return combineProps(
    {...forwardedBaseProps, ...container.output},
    container.input,
    container.sub
  )
}

export default rxConnector
