import React from 'react';
import { TextField, Card, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
    card: {
      maxWidth: 345,
    },
  };

export class AutoComplete extends React.Component {
    componentDidMount(){
        // this.renderAutoComplete();
    }

    renderAutoComplete(){
        // const ac = this.autocomplete = new window.google.maps.places.AutoComplete(this.props.input)

        return (
            <div>
                <Card>
                    <TextField id="search" label="Search places" type="search" />
                </Card>
            </div>
        )
    }

    render() {
        return null;
    }
}

AutoComplete.propTypes = {
    input: PropTypes.object
}
export default withStyles(styles)(AutoComplete);