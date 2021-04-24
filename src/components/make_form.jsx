import React from 'react';
import {withRouter} from "react-router-dom"
import logo from '../logo.svg';
import '../App.css';

import { Formik, Form as FormikForm, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

class MakeForm extends React.Component {

    genreArray = [
        {value:"", name:"選択"},
        {value:0, name:"観光"},
        {value:1, name:"食事"},
        {value:2, name:"娯楽"}
    ]
    
    state = {
        modalOpen: false,
        terms: [],
        type: "ジャンル",
    }

    handleSubmit1 = (values) => {
        alert(JSON.stringify(values));
    }

    handleSubmit2 = (values) => {
        alert(JSON.stringify(values.terms));
        this.props.history.push({
            pathname: "/result",
            state: {
                inputJson: JSON.stringify(values.terms)
            }
        });

    }

    handleTypeChange = (evt) => {
        this.setState({type: evt.target.value});
    }
    
    handleTermAdd = async (term) => {
        const _terms = [...this.state.terms];
        _terms.push(term);
        await this.setState({ terms: _terms });
        this.handleModalClose();
    }

    handleModalClose = () => {
        this.setState({
            modalOpen: false,
        });
    }

    handleModalOpen = () => {
        this.setState({
            modalOpen: true,
        });
    }

    handleTermDelete = (index) => {
        // alert(index);
        const _terms = [...this.state.terms];
        _terms.splice(index, 1);
        this.setState({ terms: _terms });
    }

    render() {
        return (
            <div className="container">
                <h3 className="my-5 text-center">動的フォームテスト</h3>

                <h4 className="my-4">おでかけコース条件設定</h4>
                <Formik
                    enableReinitialize
                    initialValues={{ type:"ジャンル", value:"", count:1, terms: this.state.terms }}
                    onSubmit={values => this.handleSubmit2(values)}
                    validationSchema={Yup.object().shape({
                        terms: Yup.array().min(1),
                    })}
                >
                    {
                        ({ handleSubmit, handleBlur, handleChange, values, errors, touched, validateField, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <legend className="col-form-label">条件</legend>
                                    <div>
                                        <Button type="button" size="sm" color="success" onClick={() => {
                                            // setFieldValue('term', '');
                                            this.handleModalOpen();
                                        }}>条件を追加 +</Button>
                                        {
                                            this.state.terms.map((term, index) => (
                                                <div className="row container" key={index}>
                                                    <Input
                                                        type="text"
                                                        value={`${term.type}が、${this.genreArray[parseInt(term.value)+1].name}　（${term.count}箇所）`}
                                                        disabled
                                                        className="col-11 my-3"
                                                    />
                                                    <Button
                                                        className="col-1 my-3 px-1"
                                                        type="button"
                                                        onClick={() => this.handleTermDelete(index)}
                                                    >削除X</Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <p className="text-danger"><small>{touched.terms && errors.terms ? errors.terms : null}</small></p>
                                </FormGroup>

                                <Modal isOpen={this.state.modalOpen}>
                                    <ModalHeader toggle={this.handleModalClose}>条件</ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <Label>種別</Label>
                                            <select
                                                name="type"
                                                onChange={(evt) => {
                                                    handleChange(evt);
                                                    this.handleTypeChange(evt)
                                                    values.value = "";
                                                    values.count = 1;
                                                }}
                                                onBlur={handleBlur}
                                            >
                                                <option value="ジャンル">ジャンル</option>
                                                <option value="場所">場所</option>
                                            </select>
                                            <div class="row m-1">
                                                {this.state.type==="場所" ? (<>
                                                    <Label>場所</Label>
                                                    <Input
                                                        type="text"
                                                        name="value"
                                                        value={values.value}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        invalid={Boolean(touched.hobby && errors.hobby)}
                                                    />
                                                </>) : (<>
                                                    <Label>ジャンル</Label>
                                                    <select
                                                        name="value"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {this.genreArray.map((genre, index) => (
                                                            <option value={genre.value}>{genre.name}</option>
                                                        ))}
                                                    </select>
                                                </>)}
                                            </div>
                                            {this.state.type==="ジャンル" && (<div class="row m-1">
                                                <label>回数</label>
                                                <select
                                                    name="count"
                                                    value={values.count}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                </select>
                                            </div>)}

                                            <FormFeedback>{errors.term}</FormFeedback>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type="button" color="info" onClick={() => {
                                            this.handleTermAdd({type:values.type, value:values.value, count:values.count});
                                        }}>追加</Button>
                                        <Button type="button" color="secondary" onClick={this.handleModalClose}>キャンセル</Button>
                                    </ModalFooter>
                                </Modal>

                                <div>
                                    <Button type="submit" type="submit" color="primary">検索</Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default withRouter(MakeForm);