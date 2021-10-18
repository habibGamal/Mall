import React, { useState } from 'react'
import Category from './Category'

export default function Subcategories({ buttonsT, setButtonsT, data }) {
    return data.map(c =>
        <Category
            name={c.as}
            id={c.value}
            key={c.value}
            level={c.level}
            buttonsT={buttonsT}
            setButtonsT={setButtonsT}
            subCategories={c.children}
        />
    )
}
