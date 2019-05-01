import { connect } from 'rx-react-container'
import rxConnector from '../rxConnector'

import component from './component'
import controller from './controller'

export default connect(rxConnector(controller))(component)

