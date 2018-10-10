import BarChart from './BarChart';
import GeoMap from './GeoMap';
import LineChart from './LineChart';
import LineChartComparison from './LineChartComparison';
import LineChartIndex from './LineChartIndex';
import TileMap from './TileMap';

const charts = {};
charts.bar = BarChart;
charts.GeoMap = GeoMap;
charts.LineChart = LineChart;
charts.LineChartComparison = LineChartComparison;
charts.LineChartIndex = LineChartIndex;
charts.tileMap = TileMap;

export default charts;
