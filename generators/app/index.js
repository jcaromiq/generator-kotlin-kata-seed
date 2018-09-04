const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
module.exports = class extends Generator {


    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

    }

    async prompting() {
        this.params = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: 'kata'
        }, {
            type: 'input',
            name: 'packageName',
            message: 'Your project package',
            default: 'com.kata'
        }]);

        this.log('app name', this.params.name);
        this.log('package name', this.params.packageName);
    }

    paths() {
        this.destinationRoot(this.destinationPath(this.params.name));
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('build.gradle'),
            this.destinationPath('build.gradle'),
            {packageName: this.params.packageName}
        );

        this.fs.copy(
            this.templatePath('gradle/**/*'),
            this.destinationPath('gradle')
        );
        this.fs.copy(
            this.templatePath('gradlew'),
            this.destinationPath('gradlew')
        );
        this.fs.copy(
            this.templatePath('gradlew.bat'),
            this.destinationPath('gradlew.bat')
        );


        this.fs.copyTpl(
            this.templatePath('src/main/kotlin/Kata.kt'),
            this.destinationPath('src/main/kotlin/' + this.params.packageName.replace('.', '/') + '/' + this.params.name.capitalize() + '.kt'),
            {
                packageName: this.params.packageName,
                name: this.params.name.capitalize()
            }
        );

        this.fs.copyTpl(
            this.templatePath('src/test/kotlin/KataTest.kt'),
            this.destinationPath('src/test/kotlin/' + this.params.packageName.replace('.', '/') + '/' + this.params.name.capitalize() + 'Test.kt'),
            {
                packageName: this.params.packageName,
                name: this.params.name.capitalize()
            }
        );
    }

    install() {
        this.yarnInstall();
    }

};