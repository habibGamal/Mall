import React from 'react'
import { connect } from 'react-redux'
import invalid from '../../helpers/invalid'
import t from '../../helpers/translate'
import Picture from '../../models/Picture'
import { Main } from '../../redux/dispatcher'
import File from '../inputs/File'
import Preview from '../inputs/Preview'
import Text from '../inputs/Text'

function BranchForm({ index, full, formKey, errors ,logo }) {
    function branchLogoInit(e){
        Main.removePictureById(index);
        Picture.init(e,index);
    }
    function getBranchLogo(){
        return logo.filter(l => l.id == index)[0];
    }
    if (!full) {
        return (
            <div className="groups branch">
                <h3>Branch ({index})</h3>
                <div className="form-row">
                    <Text
                        label={t('Shortcut name for the branch','اسم مختصر او مميز للفرع')}
                        name={`short_branch_name-${index}`}
                        id={`short_branch_name-${index}`}
                        placeholder="مثال : فرع النميس"
                        icon={<i className="fas fa-store"></i>}
                        invalidMsg={invalid('short_branch_names.' + (index - 1), errors)}
                        formKey={formKey}
                    />
                    <Text
                    label={t('Address','العنوان')}
                        name={`address-${index}`}
                        id={`address-${index}`}
                        icon={<i className="fas fa-map-marker-alt"></i>}
                        invalidMsg={invalid('addresses.' + (index - 1), errors)}
                        formKey={formKey}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productName">Gps Location</label>
                    <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                </div>
            </div>
        )
    }
    return (
        <div className="groups branch">
            <h3>{t('Branch','الفرع')} ({index})</h3>
            <div className="form-row">
                <Text
                    label={t('Branch Name','اسم الفرع')}
                    name={`branch_name-${index}`}
                    id={`branch_name-${index}`}
                    icon={<i className="fas fa-store"></i>}
                    invalidMsg={invalid('branch_names.' + (index - 1), errors)}
                    formKey={formKey}
                />
                <Text
                    label={t('Address','العنوان')}
                    name={`address-${index}`}
                    id={`address-${index}`}
                    icon={<i className="fas fa-map-marker-alt"></i>}
                    invalidMsg={invalid('addresses.' + (index - 1), errors)}
                    formKey={formKey}
                />
            </div>
            <div className="form-row">
                <div className="col-md-6">
                    <div className="row align-items-center">
                        <File
                            label={t('Store Logo','صورة المتجر او Logo')}
                            onChange={branchLogoInit}
                            name={`logo-${index}`}
                            multiple={false}
                            id={`logo-${index}`}
                            invalidMsg={invalid('logos.' + (index - 1), errors)}
                            formKey={formKey}
                        />
                        <div className="col-md-6">
                            <div className="row justify-content-center">
                                {getBranchLogo() ? <Preview picture={getBranchLogo()} to="logo" /> : ''}
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

export default connect(mapStateToProps)(BranchForm)