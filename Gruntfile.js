module.exports = function (grunt) {
	/*
		execute All task registred.
	*/
	grunt.registerTask('All', ['greeting', 'test']);

	/*
		Just test grunt command
	*/
	grunt.registerTask('greeting', function(){
		console.log('Hello Grunt');
	}); 

	/*
		test my app
	*/
	grunt.registerTask('test', function (){
		console.log('go test automatically');
	});

	/*
		첫번째 파라미터는 task 이름
		두번째 파라미터는 task 설명
		서번째 파라미터는 콜백함수로 수행할 태스크
	*/
	grunt.registerTask('Love', 'Love Test', function () {
		var love = ['I Love You', 'You Love Me', 'He Loves You', 'I love him', 'She Loves You', 'I Love Her'];
		var isLove = love[Math.floor(Math.random()*love.length)];
		grunt.log.writeln(isLove);
	});
}

