import { useState } from "react";
import { connect } from "react-redux"
import File from "../inputs/File";
import Number from "../inputs/Number";
import Select from "../inputs/Select";
import Text from "../inputs/Text";
import invalid from "../../helpers/invalid";
import PermenantMessage from '../messages/PermenantMessage';
import branch from "../../api/branch";
import Preview from "../inputs/Preview";
import { Main } from "../../redux/dispatcher";
import Picture from "../../models/Picture";
import BranchForm from "../general/BranchForm";
import BranchFormRequest from "../../FormRequests/BranchFormRequest";
function CreateMultiSameBranches({ logo, getInputValue,errors }) {
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
                label="Number of branches"
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
                                label="Store Logo"
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
                        label="Shop Name"
                        name="store_name"
                        id="store_name"
                        icon={<i className="fas fa-store"></i>}
                        invalidMsg={invalid('store_name', errors)}
                        formKey={BranchFormRequest.createKey}
                    />
                </div>
            </div>
            {renderForms(parseInt(getInputValue('branches_number') ?? 2))}
        </>
    )
}


const mapStateToProps = (state) => ({
    getInputValue: (name) => {
        if (state.forms[BranchFormRequest.createKey]) {
            if (state.forms[BranchFormRequest.createKey][name]) {
                return state.forms[BranchFormRequest.createKey][name];
            }
        }
        return null;
    },
    logo: state.main.pictures,
})

export default connect(mapStateToProps)(CreateMultiSameBranches);