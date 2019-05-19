import * as React from 'react';
import CategoryList from '../../containers/Category/CategoryList';

class Category extends React.Component {
    public render() {
        return (
            <>
                <h1>Exercise Categories</h1>
                <CategoryList/>
            </>
        )
    }
}

export default Category

