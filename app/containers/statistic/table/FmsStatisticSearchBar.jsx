import React, {Component} from 'react';
import {
    Row,
    Col,
    Form,
    FormGroup,
    FormControl
} from "react-bootstrap";

class FmsStatisticSearchBar extends Component {

    render() {
        return (
            <Row>
                <Col sm={4}>
                    <Form>
                        <FormGroup>
                            <label className="control-label" htmlFor="product_name">Project Name</label>
                            <FormControl type="text" id="product_name" name="product_name" value=""
                                         placeholder="Project Name" className="form-control"/>
                        </FormGroup>
                    </Form>

                </Col>
                <Col sm={2}>
                    <FormGroup>
                        <label className="control-label" htmlFor="price">Name</label>
                        <FormControl type="text" id="price" name="price" value="" placeholder="Name"
                                     className="form-control"/>
                    </FormGroup>
                </Col>
                <Col sm={2}>
                    <FormGroup>
                        <label className="control-label" htmlFor="quantity">Company</label>
                        <FormControl type="text" id="quantity" name="quantity" value="" placeholder="Company"
                                     className="form-control"/>
                    </FormGroup>
                </Col>
                <Col sm={4}>
                    <FormGroup>
                        <label className="control-label" htmlFor="status">Status</label>
                        <select name="status"
                                id="status"
                                className="form-control"
                                defaultValue=""
                        >
                            <option value="1">Completed</option>
                            <option value="0">Pending</option>
                        </select>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

export default FmsStatisticSearchBar;