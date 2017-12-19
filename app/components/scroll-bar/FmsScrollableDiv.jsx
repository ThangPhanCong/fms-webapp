import React from 'react';
import ReactDOM from 'react-dom';

class FmsScrollableDiv extends React.Component {
	componentDidMount() {
		const list = ReactDOM.findDOMNode(this.refs.list);
		if (this.props.handleLoadMore) {
			list.addEventListener('scroll', () => {
				if ($(list).scrollTop() + $(list).innerHeight() >= $(list)[0].scrollHeight - 64) {
					this.props.handleLoadMore();
				}
			});
		}
    $(list).scrollbar();
	}
	render() {
		return (
			<div ref="list" className={this.props.className + " scrollbar-inner"}>
				{this.props.children}
			</div>
		)
	}
}

export default FmsScrollableDiv;