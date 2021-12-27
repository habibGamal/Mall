import { GetServerSideProps } from 'next'
import store from '../../api/store';
import SingleStore from '../../components/stores/Store'
import Filtering from '../../components/filter/Filtering'
import Products from '../../components/products/Products'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const res = await store.show(ctx.params.id);
        return {
            props: {
                rawBranch: res.data
            }
        }
    } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            notFound: true,
        }
    }
}
interface ShowBranchProps {
    rawBranch: any
}
export default function ShowBranch({ rawBranch }: ShowBranchProps) {
    console.log(rawBranch);
    
    return (
        <section className="single-store">
            <div className="background-store">
                <img src="../images/background-store-1.jpg" />
            </div>
            <div className="container info-control-container">
                <div className="info-control">
                    <SingleStore
                        src="../images/logo_1.jpg"
                        name={rawBranch.name}
                        inside={true}
                    />
                    <div className="control-panel">
                        <Filtering
                            requirements={['sort', 'filter', 'search']}
                        />
                    </div>
                </div>
            </div>
            <Products
                title="Latest Products"
            />
            <Products
                title="Top Sales"
            />
            <Products
                title="Men"
            />
            <Products
                title="Women Fashion"
            />
        </section>
    )
}