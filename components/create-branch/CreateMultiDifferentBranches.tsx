import { connect } from "react-redux"
import Number from "../inputs/Number";
import invalid from "../../helpers/invalid";
import BranchForm from "../general/BranchForm";
import BranchFormRequest from "../../FormRequests/BranchFormRequest";
import t from "../../helpers/translate";
function CreateMultiDifferentBranches({ getInputValue, errors }) {
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
                label={t('Number of branches','عدد الافرع')}
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
})

export default connect(mapStateToProps)(CreateMultiDifferentBranches);