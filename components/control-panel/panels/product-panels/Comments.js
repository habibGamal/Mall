import React from 'react'

export default function Comments() {
    return (
        <div className="comments">
            <div className="comment">
                <div className="avatar"><i className="fas fa-user"></i></div>
                <div className="content">
                    <h5>Ali Ahmed</h5>
                    <p>How much this piece ?</p>
                </div>
            </div>
            <div className="comment">
                <div className="avatar"><i className="fas fa-user"></i></div>
                <div className="content">
                    <h5>Mona Ahmed</h5>
                    <p>مفيش منو لون اسود ؟</p>
                </div>
            </div>
            <div className="comment write">
                <div className="avatar"><i className="fas fa-user"></i></div>
                <form action="">
                    <input className="content" type="text" name="comment" placeholder="Write a comment"/>
                </form>
            </div>
        </div>
    )
}
