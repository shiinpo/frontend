import * as React from 'react';
import CategoryList from './List';
import { connect } from 'react-redux';
import { getAllCategories } from './actions';

interface IProps {
    // getAllCategories: typeof getAllCategories
    getAllCategories: any
}

class Category extends React.Component<IProps> {
    componentDidMount() {
        this.props.getAllCategories()
    }

    public render() {
        return (
            <>
                <h1>Exercise Categories</h1>
                <CategoryList/>
            </>
        )
    }
}

// Object of action creators
const mapDispatchToProps = {
    getAllCategories,
}

export default connect(null, mapDispatchToProps)(Category);

