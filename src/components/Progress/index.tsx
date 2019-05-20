import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import { getAllRecords } from './actions';
import { IProgressState } from './reducer';

export interface IProgressProps {
    progress: IProgressState,
    getAllRecords: any,
}

class Progress extends React.Component<IProgressProps, any> {

    componentDidMount() {
        const { getAllRecords } = this.props;
        getAllRecords();
    }

    public render() {
        const { progress } = this.props
        return (
        <div>
            <h1>Progress</h1>
            {
                progress.records && progress.records.map(record => {
                    return (
                        <div>
                            { record.date_performed }
                        </div>
                    )
                })
            }
        </div>
        );
    }
}

const mapStateToProps = (state:IAppState) => ({
    progress: state.progress
})

const mapDispatchToProps = ({
    getAllRecords,
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
