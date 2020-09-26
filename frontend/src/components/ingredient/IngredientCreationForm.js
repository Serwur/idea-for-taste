import React from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import TextFieldGroup from '../common/TextFieldGroup'
import { setIngredientToEdit } from "../../actions/ingredientEditAction";
import { createIngredient, updateIngredient } from '../../services/ingredient.service';
import { isEmptyObject } from 'jquery';
import classnames from 'classnames';

class IngredientCreateForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredient: this.props.ingredient,
            errors: {},
            isLoading: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.canChangeField = this.canChangeField.bind(this);
        this.getValidateErrors = this.getValidateErrors.bind(this);
    }

    getValidateErrors() {
        let errors = {};

        if (!this.state.ingredient.name) {
            errors.name = "Name cannot be empty";
        }

        return {
            hasErrors: !isEmptyObject(errors),
            errors
        };
    }

    onSubmit(event) {
        event.preventDefault();
        const validateErrors = this.getValidateErrors();

        if (validateErrors.hasErrors) {
            this.setState({ errors: validateErrors.errors });
        } else {
            const ingredientToSend = { ...this.state.ingredient, creator_id: this.props.userId };

            this.setState({ errors: {}, isLoading: true });

            this.props.ingredientSaveRequest(ingredientToSend)
                .then(res => {
                    switch (res.status) {
                        case 200: //Updated / OK
                            this.props.setIngredientToEdit(ingredientToSend);
                            this.setState({ isLoading: false });
                            break;
                        case 201: //Created
                            this.props.setIngredientToEdit(res.data);
                            this.setState({
                                ingredient: res.data,
                                isLoading: false
                            });
                            break;
                        default:
                            this.setState({ errors: { general: "Ups...we cannot update this ingredient, something strange happened =(" } })
                            break;
                    }
                })
                .catch(err => this.setState({ errors: { general: err.data } }));
        }
    }

    onChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (this.canChangeField(name, value)) {
            const currIngredient = this.state.ingredient;
            this.setState({
                ingredient: {
                    ...currIngredient,
                    [event.target.name]: event.target.value
                }
            });
        }
    }

    canChangeField(fieldName, fieldValue) {
        return fieldName === "name" || !isNaN(fieldValue);
    }

    render() {
        const { name, carbohydrate, fat, organic_acid, protein, roughage, salt, sugar, alcohol, water } = this.state.ingredient;
        const buttonName = this.state.ingredient.id ? "Save" : "Create";
        const errors = this.state.errors;
        const isLoading = this.state.isLoading;
        const className = classnames({ [`${this.props.className}`]: this.props.className });

        return (
            <form className={className} onSubmit={this.onSubmit}>
                <TextFieldGroup
                    field="name"
                    label="Ingredient name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                />
                {/* <div className="row"> */}
                <TextFieldGroup
                    className="col-6"
                    field="carbohydrate"
                    label="Carbohydrate g/100"
                    value={carbohydrate}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    className="col-6"
                    field="fat"
                    label="Fat g/100"
                    value={fat}
                    onChange={this.onChange}
                />
                {/* </div>
                <div className="row"> */}
                <TextFieldGroup
                    className="col-6"
                    field="organic_acid"
                    label="Organic acid g/100"
                    value={organic_acid}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    className="col-6"
                    field="protein"
                    label="Protein g/100"
                    value={protein}
                    onChange={this.onChange}
                />
                {/* </div>
                <div className="row"> */}
                <TextFieldGroup
                    className="col-6"
                    field="roughage"
                    label="Roughage g/100"
                    value={roughage}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    className="col-6"
                    field="salt"
                    label="Salt g/100"
                    value={salt}
                    onChange={this.onChange}
                />
                {/* </div>
                <div className="row"> */}
                <TextFieldGroup
                    className="col-6"
                    field="sugar"
                    label="Sugar g/100"
                    value={sugar}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    className="col-6"
                    field="alcohol"
                    label="Alcohol g/100"
                    value={alcohol}
                    onChange={this.onChange}
                />
                {/* </div>
                <div className="row"> */}
                <TextFieldGroup
                    className="col-6"
                    field="water"
                    label="Water g/100"
                    value={water}
                    onChange={this.onChange}
                />
                {/* </div> */}
                <div className="row justify-content-center pt-2">
                    <button type="submit"
                        value="save"
                        disabled={isLoading}
                        className="btn btn-primary col-9">
                        {buttonName}
                    </button>
                </div>
            </form>
        );
    }
}

IngredientCreateForm.propTypes = {
    className: PropTypes.string,
    ingredient: PropTypes.object,
    ingredientSaveRequest: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        ingredient: state.ingredientEdit,
        ingredientSaveRequest: state.ingredientEdit.id ? updateIngredient : createIngredient,
        userId: state.auth.user.id
    };
}

export default connect(mapStateToProps, { setIngredientToEdit })(IngredientCreateForm);

// function IngredientCreateForm({ ingredient, ingredientSaveRequest }) {
//     const [ingr, setIngr] = useState(ingredient ? ingredient : createEmptyIngredient());

//     const onSubmit = (event) => {
//         event.preventDefault();
//         ingredientSaveRequest(ingr).then(data => console.log(data))
//             .catch(err => console.log(err));
//     }

//     const onChange = (event) => {
//         setIngr(createEmptyIngredient());
//     }

//     return (
//         <div className="row">
//             <form className="col-6 offset-3" onSubmit={onSubmit}>
//                 <TextFieldGroup
//                     field="name"
//                     label="Ingredient name"
//                     value={ingredient.name}
//                     onChange={onChange}
//                 />
//                 <button type="submit"
//                     value="save"
//                     className="btn btn-primary">
//                     {ingredient ? "Save" : "Create"}
//                 </button>
//             </form>
//         </div>
//     );
// }

// function createEmptyIngredient() {
//     return {
//         name: ""
//     };
// }