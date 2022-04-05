import { connect } from "react-redux"
import File from "../inputs/File";
import Text from "../inputs/Text";
import invalid from "../../helpers/invalid";
import Preview from "../inputs/Preview";
import { Main } from "../../redux/dispatcher";
import Picture from "../../models/Picture";
import BranchFormRequest from "../../FormRequests/BranchFormRequest";
import t from "../../helpers/translate";
function CreateSingleBranch({ logo, errors }) {
    function logoInit(e: React.ChangeEvent<HTMLInputElement>) {
        // => save just one picture
        Main.emptyPictures();
        Picture.init(e);
    }
    return (
        <div className="groups branch">
            <h3>Store info</h3>
            <div className="form-row">
                <Text
                    label={t('Shop Name','اسم المتجر')}
                    name="store_name"
                    id="store_name"
                    icon={<i className="fas fa-store"></i>}
                    invalidMsg={invalid('store_name', errors)}
                    formKey={BranchFormRequest.createKey}
                />
                <Text
                    label={t('Address','العنوان')}
                    name="address"
                    id="address"
                    icon={<i className="fas fa-map-marker-alt"></i>}
                    invalidMsg={invalid('address', errors)}
                    formKey={BranchFormRequest.createKey}
                />
            </div>
            <div className="form-row">
                <div className="col-md-6">
                    <div className="row align-items-center">
                        <File
                            label={t('Store Logo','صورة المحل او Logo')}
                            onChange={logoInit}
                            name="logo"
                            multiple={false}
                            id="logo"
                            invalidMsg={invalid('logo', errors)}
                        />
                        <div className="col-md-6">
                            <div className="row justify-content-center">
                                {logo.length > 0 ? <Preview picture={logo[0]} to="logo" /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="productName">Gps Location</label>
                    <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    logo: state.main.pictures,
})

export default connect(mapStateToProps)(CreateSingleBranch);