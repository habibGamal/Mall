import React from 'react'
import t from '../../helpers/translate'

export default function Sort() {
    return (
        <li className="dropdown">
            <span id="sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-sort" /> {t('Sort','ترتيب حسب')}
            </span>
            <div className="dropdown-menu" aria-labelledby="sort">
                <a className="dropdown-item" href="#">High price to low</a>
                <a className="dropdown-item" href="#">Low price to high</a>
                <a className="dropdown-item" href="#">New to old</a>
            </div>
        </li>
    )
}
