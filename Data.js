export default {
	startTime: null,
	startType: 'humberRunner',
	events: ['swimmer', 'bicycle', 'running', 'stop'], // hard coded for testing
	cliffPratt: {
		competitors: [
			{ name: 'James Bray', number: 64, racing: false },
			{ name: 'Chris Ellerston', number: 16, racing: false },
			{ name: 'Kirsty Drakeford', number: 21, racing: false },
			{ name: 'Jason Kenning', number: 47, racing: false },
			{ name: 'Chris Nation', number: 11, racing: false },
			{ name: 'Simon Pick', number: 45, racing: false },
			{ name: 'Andy Smith', number: 63, racing: false },
			{ name: 'Derek Brown', number: 2, racing: false },
			{ name: 'Ken Pearson', number: 35, racing: false },
			{ name: 'Dave Maskell', number: 31, racing: false },
			{ name: 'Paul Wilkinson', number: 40, racing: false },
			{ name: 'Chris Wiles', number: 6, racing: false },
			{ name: 'Paul Ridpath', number: 26, racing: false },
			{ name: 'Pam Edgar', number: 62, racing: false },
			{ name: 'Amanda Dean', number: 23, racing: false },
			{ name: 'Paul Reed', number: 4, racing: false },
			{ name: 'Dinah Ashbridge', number: 24, racing: false },
			{ name: 'Charlie Robinson', number: 15, racing: false },
			{ name: 'Rachel Darling Love', number: 3, racing: false },
			{ name: 'Andy Leahom', number: 27, racing: false },
			{ name: 'Andy Naylor', number: 25, racing: false },
			{ name: 'Richard Stone', number: 39, racing: false },
			{ name: 'Mark Padley', number: 43, racing: false },
			{ name: 'Michelle Hillaby', number: 34, racing: false },
			{ name: 'Leanne Kilvington', number: 41, racing: false },
			{ name: 'Jacqui Ker', number: 36, racing: false },
			{ name: 'Jo Brown', number: 48, racing: false },
		],
	},
	humberRunner: {
		competitors: [
			{ name: 'Robert Fletcher', number: 20, racing: false },
			{ name: 'James Godfrey', number: 29, racing: false },
			{ name: 'Adrian Messingham', number: 17, racing: false },
			{ name: 'Daniel Scott', number: 28, racing: false },
			{ name: 'Chris Ellerston', number: 16, racing: false },
			{ name: 'Darren Atkinson', number: 37, racing: false },
			{ name: 'Luke Davison', number: 44, racing: false },
			{ name: 'Chris Nation', number: 11, racing: false },
			{ name: 'Jason Kenning', number: 47, racing: false },
			{ name: 'Simon Pick', number: 45, racing: false },
			{ name: 'Derek Brown', number: 2, racing: false },
			{ name: 'Graham Justice', number: 50, racing: false },
			{ name: 'Ellen Messingham', number: 53, racing: false },
			{ name: 'Dave Maskell', number: 31, racing: false },
			{ name: 'Pam Edgar', number: 62, racing: false },
			{ name: 'Paul Ridpath', number: 26, racing: false },
			{ name: 'Rachel Darling Love', number: 3, racing: false },
			{ name: 'Dinah Ashbridge', number: 24, racing: false },
			{ name: 'Charlie Robinson', number: 15, racing: false },
			{ name: 'Andy Naylor', number: 25, racing: false },
			{ name: 'Michelle Hillaby', number: 34, racing: false },
			{ name: 'Leanne Kilvington', number: 41, racing: false },
			{ name: 'Jo Brown', number: 48, racing: false },
			{ name: 'John Route', number: 12, racing: false },
			{ name: 'Sue Taft', number: 7, racing: false },
		],
	},
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
			lapTimes: {
				'lap-1': 0,
				'lap-2': 0,
				'lap-3': 0,
				overall: 0,
			},
			name: 'testName 22',
			number: 22,
		},
	],
};
