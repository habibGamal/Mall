import { GetServerSideProps } from 'next'
import branch from '../../api/branch';
import SingleStore from '../../components/stores/Store'
import Filtering from '../../components/filter/Filtering'
import Products from '../../components/products/Products'
import BackendBranch from '../../BackendTypes/BackendBranch';
import Branch from '../../models/Branch';
import BackendProduct from '../../BackendTypes/BackendProduct';
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const res = await branch.show(ctx.params.id);

        return {
            props: {
                rawBranch: res.data.branch,
                rawProducts: res.data.products
            }
        }
    } catch (err) {
        console.log(err);

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
    rawBranch: BackendBranch,
    rawProducts: Array<BackendProduct>
}
export default function ShowBranch({ rawBranch, rawProducts }: ShowBranchProps) {
    const branch = new Branch(rawBranch);
    console.log(rawBranch);

    return (
        <section className="single-store">
            <div className="background-store">
                <img src="../images/background-store-1.jpg" />
            </div>
            <div className="container info-control-container">
                <div className="info-control">
                    <SingleStore
                        src={branch.logo.path}
                        name={rawBranch.name}
                        inside={true}
                        href={null}
                    />
                    <div className="control-panel">
                        <Filtering
                            requirements={['sort', 'filter', 'search']}
                        />
                    </div>
                </div>
            </div>
            {
                rawProducts.length === 0
                    ? <div className='empty-products'>
                        <i className="fas fa-box-open"></i>
                        <strong>There isn't products yet</strong>
                    </div>
                    : <Products
                        title="Latest Products"
                        rawProducts={rawProducts}
                    />
            }

        </section>
    )
}