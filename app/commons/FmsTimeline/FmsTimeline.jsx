import React from 'react';
import propTypes from 'prop-types';

class FmsTimeline extends React.Component {
    state = {
        padding: 0
    };

    updatePaddingDotsEvent() {
        const {items} = this.props;
        const length = this.props.items.length;
        this.setState({padding: this.refs.events.offsetWidth / length});
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePaddingDotsEvent.bind(this));
    }

    componentDidMount() {
        this.updatePaddingDotsEvent();
        window.addEventListener("resize", this.updatePaddingDotsEvent.bind(this));
    }

    componentWillReceiveProps() {
        this.updatePaddingDotsEvent();
    }

    render() {
        const {padding} = this.state;
        const {items} = this.props;
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
                            <span aria-hidden="true" className="timeline-eventline" style={{width: width + 'px'}}/>
                            <ol>
                                {items.map((item, i) => {
                                    return (
                                        <li key={i} style={{padding: padding * i + 'px'}}>
                                            <a className={item.class + (i === items.length - 1 ? ' selected' : ' older-event')}>
                                                {item.created_time || ""}
                                                <br/>
                                                {item.content || ""}
                                                <br/>
                                                {item.note || ""}
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
