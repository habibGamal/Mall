import React from 'react'
import { connect } from 'react-redux'
import Message from './Message';
function Messages({messages}) {
    return (
        <div className="message">
            {
                messages.map(m=> <Message key={m.index} index={m.index} type={m.type} content={m.content} />)
            }
        </div>
    )
}
const mapStateToProps = state => ({
    messages: state.messages
})
export default connect(mapStateToProps)(Messages);
