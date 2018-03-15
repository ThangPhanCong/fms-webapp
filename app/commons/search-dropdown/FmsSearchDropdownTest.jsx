import FmsSearchDropdown from "./FmsSearchDropdown";
import React, {Component} from "react";

class FmsSearchDropdownTest extends Component {

    state = {
        query: '',
        items: ['ok men 1', 'ok men 2']
    };

    onSearchChange(query) {
        console.log('onsearchchange', query);
        this.setState({query});
    }

    onSelectItem(index) {
        const {items} = this.state;
        const filteredItems = items.filter((item, i) => i !== index);
        this.setState({items: filteredItems});
    }

    render() {
        const {
            items,
            query
        } = this.state;

        return (
            <FmsSearchDropdown
                query={query}
                onSearchChange={this.onSearchChange.bind(this)}
                onSelectItem={this.onSelectItem.bind(this)}
                items={items}
            />
        )
    }
}

export default FmsSearchDropdownTest;