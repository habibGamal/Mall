import React from 'react'
import Category from './Category'

export default function CategoryFilter() {
    return (
        <div className="categories filter-option">
            <h4>Categories</h4>
            <div className="content">
                <Category
                    name="Phones"
                    parentId="level_1_1"
                    id="for_1_1"
                    subcategories={[
                        <Category
                            name="samsong"
                            lastCategory={true}
                        />,
                        <Category
                            name="Apple"
                            parentId="level_2_11_1"
                            id="for_2_11_1"
                            subcategories={[
                                <Category
                                    name="iphone 12 series"
                                    parentId="level_3_21_11_1"
                                    id="for_3_21_11_1"
                                    subcategories={[
                                        <Category
                                            name="iPhone 12 pro max"
                                            lastCategory={true}
                                        />,
                                        <Category
                                            name="iPhone 12 pro"
                                            lastCategory={true}
                                        />,
                                        <Category
                                            name="iPhone 12s"
                                            lastCategory={true}
                                        />,
                                    ]}
                                />
                            ]}
                        />
                    ]}
                />
                <Category
                    name="Electronics"
                    parentId="level_1_2"
                    id="for_1_2"
                    subcategories={[
                        <Category
                            name="Pc"
                            lastCategory={true}
                        />,
                        <Category
                            name="TVs"
                            parentId="level_2_12_1"
                            id="for_2_12_1"
                            subcategories={[
                                <Category
                                    name="Samsong"
                                    parentId="level_3_21_12_1"
                                    id="for_3_21_12_1"
                                    subcategories={[
                                        <Category
                                            name="4k"
                                            lastCategory={true}
                                        />,
                                        <Category
                                            name="2k"
                                            lastCategory={true}
                                        />,
                                        <Category
                                            name="Full HD"
                                            lastCategory={true}
                                        />,
                                    ]}
                                />
                            ]}
                        />
                    ]}
                />
            </div>
        </div>
    )
}
