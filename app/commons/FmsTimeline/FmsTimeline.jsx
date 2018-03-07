import React from 'react';
import propTypes from 'prop-types';
// import './FmsTimeline.scss';

class FmsTimeline extends React.Component {
    state = {
        items: [],
        padding: 0
    }
    componentDidMount() {
        this.updatePaddingDotsEvent();
    }
    updatePaddingDotsEvent() {
        const length = this.props.items.length;
        this.setState({padding: this.refs.events.offsetWidth/length});
    }
    componentWillMount() {
        this.setState({items: this.props.items});
        window.addEventListener("resize", this.updatePaddingDotsEvent.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePaddingDotsEvent.bind(this));
    }

    render() {
        const {padding, items} = this.state;
        let width = (items.length - 1) * padding + 90;
        return (
            <section className="cd-horizontal-timeline">
                {/* <div className="events-content">
                    <ol>
                        {items.map((item, i) => {
                            return (
                                <li key={i} className={item.class + (i === items.length-1 ? ' selected' : ' older-event')}>
                                    <p> {item.note}</p>
                                    <em>{item.created_time}</em>
                                </li>
                            )
                        })}
                    </ol>
                </div> */}

                <div className="timeline">
                    <div className="events-wrapper">
                        <div className="events" ref="events">
                            <span aria-hidden="true" className="timeline-eventline" style={{width: width+'px'}}></span>
                            <ol>
                                {items.map((item, i) => {
                                    return (
                                        <li key={i} style={{padding: padding*i+'px'}}>
                                            <a className={item.class + (i === items.length-1 ? ' selected' : ' older-event')}
                                                data-note={item.note}>
                                                {item.created_time}
                                                <br/>
                                                {item.content}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

FmsTimeline.propTypes = {
    items: propTypes.array.isRequired
};

export default FmsTimeline;
