import React,{Component} from "react";
import {Row, Col, Form, FormGroup, Label, FormControl} from "react-bootstrap";
import FmsTable from "../FmsTable/FmsTable";

class FmsHeader extends Component {
  render() {
    return (
        <div className="ibox">
            <div className="ibox-content">
                <Row>
                    <Col sm={4}>
                        <Form>
                            <FormGroup>
                                <label className="control-label" htmlFor="product_name">Project Name</label>
                                <FormControl type="text" id="product_name" name="product_name" value="" placeholder="Project Name" className="form-control" />
                            </FormGroup>
                        </Form>

                    </Col>
                    <Col sm={2}>
                        <FormGroup>
                            <label className="control-label" htmlFor="price">Name</label>
                            <FormControl type="text" id="price" name="price" value="" placeholder="Name" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col sm={2}>
                        <FormGroup>
                            <label className="control-label" htmlFor="quantity">Company</label>
                            <FormControl type="text" id="quantity" name="quantity" value="" placeholder="Company" className="form-control" />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label className="control-label" htmlFor="status">Status</label>
                            <select name="status" id="status" className="form-control">
                                <option value="1" selected="">Completed</option>
                                <option value="0">Pending</option>
                            </select>
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        <FmsTable />
                    </Col>

                </Row>
            </div>
        </div>
    );
  }
}

export default FmsHeader;