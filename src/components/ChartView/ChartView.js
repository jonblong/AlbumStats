import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts';
import './chartView.css';

function ChartView(props) {
    const [valenceActive, setValenceActive] = React.useState(true)
    const [danceabilityActive, setDanceabilityActive] = React.useState(false)
    const [tempoActive, setTempoActive] = React.useState(false)

    const SongTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className='song-tooltip'>
                    {/* Shows song name */}
                    <p className='tooltip-song-name'>{payload[0].payload.name}</p>
                    
                    {/* Shows song valance if active */}
                    {valenceActive &&(
                        <p className='tooltip-song-valence'>Happiness: {payload[0].payload.valence}</p>
                    )}

                    {/* Shows song danceability if active */}
                    {danceabilityActive && (
                        <p className='tooltip-song-valence'>Danceability: {payload[0].payload.danceability}</p>
                    )}
                    
                    {/* Shows song tempo if active */}
                    {tempoActive && (
                        <p className='tooltip-song-valence'>Tempo: {payload[0].payload.tempo}</p>
                    )}
                </div>
            )
        }
        return null;
    }

    return (
        <div id='chart-view'>
            <div id='chart-container'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart className='chart' data={props.trackData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                        {/* Shows left Y Axis if needed */}
                        {(valenceActive || danceabilityActive) && (
                            <YAxis yAxisId='left' width={35} type='number' domain={[0, 100]}/>
                        )}

                        {/* Shows valence graph if active */}
                        {valenceActive && (
                            <Line strokeWidth={3} yAxisId='left' dot={{r: 1}} isAnimationActive={false}
                                type='monotone' dataKey='valence' stroke='#3299bb' />
                        )}

                        {/* Shows danceability graph if active */}
                        {danceabilityActive && (
                            <Line strokeWidth={3} yAxisId='left' dot={{r: 1}} isAnimationActive={false}
                                type='monotone' dataKey='danceability' stroke='#ff9900' />
                        )}

                        {/* Shows right Y axis if needed */}
                        {tempoActive && (
                            <YAxis yAxisId='right' width={35} orientation='right' type='number' domain={[0, 200]}/>
                        )}

                        {/* Shows tempo graph if active */}
                        {tempoActive && (
                            <Line  strokeWidth={3} yAxisId='right' dot={{r: 1}} isAnimationActive={false}
                                type='monotone' dataKey='tempo' stroke='#424242' />
                        )}
                        
                        <CartesianGrid vertical={false} stroke='#424242' strokeDasharray="5 5"/>
                        <Tooltip content={<SongTooltip />}/>
                    </LineChart>
                </ResponsiveContainer> 
            </div>

            <form id="chart-controls">
                {/* Valence checkbox */}
                <label>
                    <input
                        id='valence-checkbox'
                        className='checkbox'
                        name='checkValence'
                        type='checkbox'
                        checked={valenceActive}
                        onChange={() => setValenceActive(!valenceActive)} />
                    <span>{' '}Happiness</span>
                </label>
                
                {/* Danceability checkbox */}
                <label>
                    <input
                        id='danceability-checkbox'
                        className='checkbox'
                        name='checkDanceability'
                        type='checkbox'
                        checked={danceabilityActive}
                        onChange={() => setDanceabilityActive(!danceabilityActive)} />
                    <span>{' '}Danceability</span>
                </label>
                
                {/* Tempo checkbox */}
                <label>
                    <input
                        id='tempo-checkbox'
                        className='checkbox'
                        name='checkTempo'
                        type='checkbox'
                        checked={tempoActive}
                        onChange={() => setTempoActive(!tempoActive)} />
                    <span>{' '}Tempo (BPM)</span>
                </label>
            </form>
        </div>
    );
}

export default ChartView;