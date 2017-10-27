'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import uuid from 'uuid';

import projectApi from 'ProjectApi';

class FmsProjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteProjectClick = this.deleteProjectClick.bind(this);
  }
  renderPageItem() {
    let self = this;
    let project = this.props.data;
    let pages = project.pages;
    const MAX_ITEM = 5;

    if (pages && Array.isArray(pages) && pages.length > 0) {
      let pageComponents = pages.filter((item, index) => {
        return index <= MAX_ITEM;
      })
        .map(page => {
          let pageAva = `https://graph.facebook.com/v2.10/${page.fb_id}/picture`;

          return (
            <img key={page.fb_id} src={pageAva}></img>
          )
        });

      if (pages.length > MAX_ITEM) {
        let moreText = '+' + (pages.length - MAX_ITEM);
        let itemMorePage = <div className="more" key={uuid()}>{moreText}</div>;
        pageComponents.push(itemMorePage);
      }
      return pageComponents;
    } else {
      return <div></div>
    }
  }
  deleteProjectClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let self = this;
    let projectAlias = this.props.data.alias;

    self.props.handleDeleteProject(projectAlias);
  }
  render() {
    let self = this;
    let project = this.props.data;
    let projectName = project.name;

    return (
      <div className="col-md-4">
        <div className="project-item panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{projectName}</h3>
            <span className="glyphicons glyphicons-bin"></span>
          </div>
          <div className="panel-body">
            <div className="page-wrapper">{self.renderPageItem()}</div>
            <button className="btn btn-danger" onClick={self.deleteProjectClick}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FmsProjectItem;
