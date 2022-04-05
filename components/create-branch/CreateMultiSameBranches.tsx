import { connect } from "react-redux"
import File from "../inputs/File";
import Number from "../inputs/Number";
import Text from "../inputs/Text";
import invalid from "../../helpers/invalid";
import Preview from "../inputs/Preview";
import { Main } from "../../redux/dispatcher";
import Picture from "../../models/Picture";
import BranchForm from "../general/BranchForm";
import BranchFormRequest from "../../FormRequests/BranchFormRequest";
import t from "../../helpers/translate";
function CreateMultiSameBranches({ logo, getInputsValue, errors }) {
    const { branches_number } = getInputsValue || {};
    function logoInit(e: React.ChangeEvent<HTMLInputElement>) {
        // => save just one picture
        Main.emptyPictures();
        Picture.init(e);
    }
    function renderForms(length: number) {
        let buffer: Array<Object> = [];
        for (let i = 1; i <= length; i++) {
            buffer.push(
                <BranchForm
                    key={i - 1}
                    index={i}
                    full={false}
                    formKey={BranchFormRequest.createKey}
                    errors={errors}
                />
            )
        }
        return buffer;
    }
    return (
        <>
            <Number
                label={t('Number of branches', 'عدد الافرع')}
                name="branches_number"
                id="branches_number"
                invalidMsg={invalid('branches_number', errors)}
                min={2}
                step={1}
                max={5}
                addClass=""
                defaultValue="2"
                formKey={BranchFormRequest.createKey}
            />
            <div className="groups branch">
                <h3>Store info</h3>
                <div className="form-row">
                    <div className="col-md-6">
                        <div className="row align-items-center">
                            <File
                                label={t('Store Logo', 'صورة المحل او Logo')}
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
                    <Text
                        label={t('Shop Name', 'اسم المتجر')}
                        name="store_name"
                        id="store_name"
                        icon={<i className="fas fa-store"></i>}
                        invalidMsg={invalid('store_name', errors)}
                        formKey={BranchFormRequest.createKey}
                    />
                </div>
            </div>
            {renderForms(parseInt(branches_number ?? 2))}
        </>
    )
}


const mapStateToProps = (state) => ({
    logo: state.main.pictures,
    getInputsValue : state.forms?.[BranchFormRequest.createKey]
})

export default connect(mapStateToProps)(CreateMultiSameBranches);