module.exports = function (grunt) {
	/* 
		디렉토리를 생성하고 지워보자.
		새로운 디렉토리를 생성하고
		원본 소스를 복사해서 이동시켜보자.
		그리고 실행할 때마다 목적 디렉토리를 지우고 
		다시 갱신된 소스로 재반복하게 되는 작업을 진행해보자.
	*/

	grunt.config.init({
		copyFiles: {
			options: {
				workingDirectory: 'dist',
				manifest: [
					'index.html',
					'css/',
					'js/'
				]
			}
		}
	});

	grunt.registerTask('create', 'Create destination Folder', function () {
		grunt.config.requires('copyFiles.options.workingDirectory');
		grunt.file.mkdir(grunt.config.get('copyFiles.options.workingDirectory'));
	});

	
	grunt.registerTask('clean', 'Delete destination folder', function(){
		grunt.config.requires('copyFiles.options.workingDirectory');
		grunt.file.delete(grunt.config.get('copyFiles.options.workingDirectory'));
	});


	// grunt.registerTask('copy','copy and paste file to the destination', function (){
	// 	var files, workingDirectory;

	// 	grunt.config.requires('copyFiles.options.workingDirectory');
	// 	grunt.config.requires('copyFiles.options.manifest');

	// 	files = grunt.config.get('copyFiles.options.manifest');
	// 	workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

	// 	files.forEach(function (file){
	// 		var destination = workingDirectory + '/' + file;
	// 		grunt.log.writeln('Copying ' + file + ' to ' + destination);
	// 		grunt.file.copy(file, destination);
	// 	});
	// });
	

	grunt.registerTask('copy','copy and paste file to the destination', function (){
		var files, workingDirectory, recursiveCopy;

		grunt.config.requires('copyFiles.options.workingDirectory');
		grunt.config.requires('copyFiles.options.manifest');

		files = grunt.config.get('copyFiles.options.manifest');
		workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

		recursiveCopy = function (source, destination) {
			if(grunt.file.isDir(source)){ // 디렉토리이면 
				grunt.file.recurse(source, function (file) {
					recursiveCopy(file, destination);
				});
			}else{
				grunt.log.writeln('Copying ' + source + ' to ' + destination);
				grunt.file.copy(source, destination + '/' + source);
			}
		};

		files.forEach(function (item){
			recursiveCopy(item, workingDirectory);
		});
	});

	grunt.registerTask('deploy', 'Deploy project', ['clean', 'create', 'copy']);

}

