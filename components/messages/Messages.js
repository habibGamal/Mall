import React from 'react'
import { connect } from 'react-redux'
import InstantMessage from './InstantMessage';
function Messages({ messages }) {
    return (
        <div className="message">
            {
                messages.map(m => <InstantMessage key={m.index} index={m.index} type={m.type} content={m.content} />)
            }
        </div>
    )
}
const mapStateToProps = state => ({
    messages: state.messages
})
export default connect(mapStateToProps)(Messages);
