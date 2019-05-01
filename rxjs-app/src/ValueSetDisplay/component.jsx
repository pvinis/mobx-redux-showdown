import React from 'react'
import PropTypes from 'prop-types'

/** show the display of a value set code */
class ValueSetDisplay extends React.Component {

    static propTypes = {
        valueSet: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.rxsub = this.props.requiredToObserve.subscribe()
    }
  
    componentWillUnmount() {
        this.rxsub.unsubscribe()
    }
    
    render () {
        const { isLoading, error, code, display } = this.props

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>Error: {JSON.stringify(error)}</div>
        }

        return (
            <div>Display for <b>{code}</b> is:
                <b>{display || '-'}</b>
            </div>
        )
    }
}

export default ValueSetDisplay
