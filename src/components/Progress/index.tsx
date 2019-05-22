import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import { getAllRecords } from './actions';
import { IProgressState, IRecord } from './reducer';
import Chart, { IChartData, IChartPoint } from './Chart';

export interface IProgressProps {
    progress: IProgressState,
    getAllRecords: any,
}

class Progress extends React.Component<IProgressProps, any> {

    componentDidMount() {
        const { getAllRecords } = this.props;
        getAllRecords();
    }

    sortDates = (a:IChartPoint, b:IChartPoint):number => {
        return new Date(a.x).getTime() - new Date(b.x).getTime();
    }

    constructData = ():IChartData[] => {
        const { records, exercises } = this.props.progress;

        let obj:{[key: number]: IChartPoint[]} = {};
        records.forEach(record => {
            const point:IChartPoint = {
                x: record.date_performed.split('T')[0], 
                y: record.max
            }
            if(obj[record.exercise_id]){
                obj[record.exercise_id].push(point)
            } else {
                obj[record.exercise_id] = [point]
            }
        })

        let chartData:IChartData[] = Object.keys(obj).map((key: string) => {
            const data:IChartPoint[] = obj[Number(key)].sort(this.sortDates);
            const { name, id } = exercises[Number(key)];
            return {
                data,
                exercise_id: id,
                id: name
            }
        })

        console.log(chartData);
        return chartData;
    }

    public render() {
        const { progress } = this.props
        return (
        <div>
            <h1>Progress</h1>
            {
                Object.keys(progress.exercises).length && progress.records && <Chart data={this.constructData()}/>
            }
            {
                progress.records && progress.records.map(record => {
                    return (
                        <div key={record.id}>
                            { record.max }
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
