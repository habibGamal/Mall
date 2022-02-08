import React from 'react'
import t from '../../helpers/translate'
import Card from './Card'

export default function Cards() {
    return (
        <section className="info">
            <div className="container">
                <div className="row">
                    <Card
                        className="sales"
                        title={t('Total sales', 'المبيعات الكلية')}
                        icon="fas fa-coins"
                        value={2000}
                        unit={t('EL', 'جنية')}
                    />
                    <Card
                        className="views"
                        title={t('Total viwes', 'المشاهدات الكلية')}
                        icon="fas fa-users"
                        value={2000}
                        unit={t('view', 'المشاهدة')}
                    />
                    <Card
                        className="orders"
                        title={t('Total Orders', 'الطلبات الكلية')}
                        icon="fas fa-dolly"
                        value={2000}
                        unit={t('orders', 'الطلبات')}
                    />
                </div>
            </div>
        </section>
    )
}
