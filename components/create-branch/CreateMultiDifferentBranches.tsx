import { useState } from "react";
import { connect } from "react-redux"
import Number from "../inputs/Number";
import invalid from "../../helpers/invalid";
import { Main } from "../../redux/dispatcher";
import Picture from "../../models/Picture";
import BranchForm from "../general/BranchForm";
import BranchFormRequest from "../../FormRequests/BranchFormRequest";
function CreateMultiDifferentBranches({ logo, getInputValue, errors }) {
    function renderForms(length: number) {
        let buffer: Array<Object> = [];
        for (let i = 1; i <= length; i++) {
            buffer.push(
                <BranchForm
                    key={i - 1}
                    index={i}
                    full={true}
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

export default connect(mapStateToProps)(CreateMultiDifferentBranches);