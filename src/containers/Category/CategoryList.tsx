import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import { ICategory } from '../../reducers/categoryReducer';

// Create the containers interface
interface IProps {
  categories: ICategory[];
}

class CategoryList extends React.Component<IProps> {
  public render() {
    const { categories } = this.props;
    return (
      <div className="name-container">
        {categories &&
          categories.map(category => {
            return (
              <div key={category.id} className="name">
                {category.name}
              </div>
            );
          })}
      </div>
    );
  }
}

// Grab the category from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    categories: store.categoryState.categories,
  };
};

export default connect(mapStateToProps)(CategoryList);