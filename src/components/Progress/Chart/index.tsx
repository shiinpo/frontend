import * as React from 'react';
import { ResponsiveLine, LineComputedSerieData } from '@nivo/line'
import { LegendMouseHandlerData } from '@nivo/legends'
import { IRecord } from '../reducer';

const colorBy = (data: LineComputedSerieData) => data.color as string

interface IChartProps {
    data: IChartData[]
}

export interface IChartData {
    id: string
    // color: string
    exercise_id: number
    data: IChartPoint[]
}

export interface IChartPoint {
    x: any
    y: number
}

declare module '@nivo/line' {
    interface LineProps {
        enableDots: boolean
        dotSize: number
        enableDotLabel: boolean
        enableStackTooltip: boolean
        colorBy: typeof colorBy
        tooltip: any
        // pointLabel: string
    }
}

const Chart: React.FunctionComponent<IChartProps> = (props: IChartProps) => {
    return (
        <>
            <h1>Chart</h1>
            <div
                style={{
                    height: 400,
                }}
            >
                <ResponsiveLine
                    data={props.data}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                        type: 'linear',
                        stacked: false, 
                        min: 'auto', 
                        max: 'auto'
                    }}
                    axisLeft={{
                        legend: 'ORM',
                        legendOffset: -36,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 1 days',
                        legend: 'Date',
                        legendOffset: 36,
                    }}
                    axisTop={null}
                    axisRight={null}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    curve="monotoneX"
                    lineWidth={3}
                    colors={{ scheme: 'nivo' }}
                    colorBy={colorBy}
                    dotSize={12}
                    enableDots={true}
                    enableDotLabel={true}
                    enableStackTooltip={true}
                    enablePointLabel={true}
                    enableGridX={true}
                    enableGridY={true}
                    useMesh={true}
                    isInteractive={true}
                    animate={true}
                    // motionStiffness={150}
                    // motionDamping={15}
                    pointColor={'white'}
                    pointSize={10}
                    pointBorderWidth={3}
                    pointBorderColor={'black'}
                    enableCrosshair={false}
                    tooltip={({point}:any) => {
                        // point:
                        //     borderColor: "black"
                        //     color: "white"
                        //     data: {x: Wed May 29 2019 00:00:00 GMT-0400 (Eastern Daylight Time), y: 415, xFormatted: "2019-05-29", yFormatted: 415}
                        //     id: "DEADLIFT.2"
                        //     index: 12
                        //     serieColor: "#f1e15b"
                        //     serieId: "DEADLIFT"
                        //     x: 232
                        //     y: 60
                        return (
                            <div
                                style={{
                                    background: 'white',
                                    padding: '9px 12px',
                                    border: '1px solid #ccc',
                                }}
                            >
                                <div>{point.serieId}</div>
                                <div>{point.x}lbs</div>
                            </div>
                        )
                    }}

                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            // symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </>
    );
};

export default Chart;
