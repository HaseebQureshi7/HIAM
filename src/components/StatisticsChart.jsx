import { ResponsiveBar } from '@nivo/bar'

export const StatisticsChart = ({ props }) => {
    return (
        <ResponsiveBar
            data={props}
            keys={["number"]}
            indexBy="name"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.4}
            valueScale={{ type: "linear" }}
            colors="#6200EE"
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "NUMBERS",
                legendPosition: "middle",
                legendOffset: -40
            }}
        />
    )
}