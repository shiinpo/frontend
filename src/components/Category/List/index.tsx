import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../store/Store';
import { ICategoryState } from '../reducer';

// Create the containers interface
interface IProps {
  categories: ICategoryState;
}

class CategoryList extends React.Component<IProps> {
  public render() {
    const { categories } = this.props;
    return (
      <div className="name-container">
        {categories[1] &&
          Object.keys(categories).map((key:string) => {
            const { id, name} = categories[Number(key)];
            return (
              <div key={id} className="name">
                {name}
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
    categories: store.categories,
  };
};

export default connect(mapStateToProps)(CategoryList);