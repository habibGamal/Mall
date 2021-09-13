import React, { useState } from 'react'
import Navigation from '../general/navigation/Navigation';
import Comments from './panels/product-panels/Comments';
import Description from './panels/product-panels/Description';
import ShopDetails from './panels/product-panels/ShopDetails';
import Specifications from './panels/product-panels/Specifications';

export default function Product() {
    const [activeTap, setActiveTap] = useState('description');
    const taps = {
        'description':<Description />,
        'specifications':<Specifications />,
        'comments':<Comments />,
        'shop':<ShopDetails />,
    }
    return (
        <>
            <div className="control-panel">
                <Navigation
                    activeTap={activeTap}
                    setActiveTap={setActiveTap}
                    taps={[
                        {
                            name: 'description',
                            content: (<>Description</>),
                        },
                        {
                            name: 'specifications',
                            content: (<>Specifications</>),
                        },
                        {
                            name: 'comments',
                            content: (<>Comments</>),
                        },
                        {
                            name: 'shop',
                            content: (<>Shop Details</>),
                        },
                    ]}
                />
            </div>
            {taps[activeTap]}
        </>
    )
}
