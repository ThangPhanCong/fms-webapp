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
        this.setState({padding: this.refs.events.offsetWidth/4});
    }
    componentWillMount() {
        this.setState({items: this.props.items});
        window.addEventListener("resize", this.updatePaddingDotsEvent.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePaddingDotsEvent.bind(this));
    }

    render() {
        let width = 0;
        this.state.items.map((item, i) => {
            if (item.myClass === 'selected') {
                width = this.state.padding*i+60;
            }
        })
        return (
            <section className="cd-horizontal-timeline">
                <div className="events-content">
                    <ol>
                        {this.state.items.map((item, i) => {
                            return (
                                <li key={i} className={item.myClass}>
                                    {/* <h2>{item.title}</h2>
                                    <em>{item.subtitle}</em> */}
                                    <p className='text-center'> {item.desc}</p>
                                </li>
                            )
                        })}

                    </ol>
                </div>

                <div className="timeline">
                    <div className="events-wrapper">
                        <div className="events" ref="events">
                            <span aria-hidden="true" className="timeline-eventline" style={{width: width+'px'}}></span>
                            <ol>
                                {this.state.items.map((item, i) => {
                                    return (
                                        <li key={i} style={{padding: this.state.padding*i+'px'}}>
                                            <a className={item.myClass} data-desc={item.desc}>{item.dataDate}
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
