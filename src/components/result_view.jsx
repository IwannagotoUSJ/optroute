import React from 'react';
import {withRouter} from "react-router-dom"
import logo from '../logo.svg';
import '../App.css';

import { Formik, Form as FormikForm, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

class ResultView extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="row col-12">
                    <p>hello</p>
                    {this.props.location.state.inputJson}
                </div>
            </div>
        );
    }
}

export default withRouter(ResultView);