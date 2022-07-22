export default {
	startTime: null,
	startType: 'humberRunner',
	events: ['swimmer', 'bicycle', 'running', 'stop'], // hard coded for testing
	competitorList: [],
	competitors: [],
	results: [],
};

const test = {
	events: ['run', 'bike'],
	competitors: [
		{
			lapTimes: {
				'lap-1': 0,
				'lap-2': 0,
				'lap-3': 0,
				overall: 0,
			},
			name: 'testName 22',
			number: 22,
			times: {
				startTime: 1655988335868,
				eventA: '00000000000',
				eventB: ' 00000000000',
				eventC: '00000000000',
				stop: '00000000',
			},
		},
	],
	results: [
		{
			name: 'Derek Brown',
			number: 2,
			position: 1,
			results: {
				Bike: 5798,
				'Run 1': 4591,
				overall: 10394,
			},
		},
	],
};
