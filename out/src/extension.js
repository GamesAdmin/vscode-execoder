// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

const child_process = require('child_process');

const path = require('path');

function getResultCmd(cmdName,toStart)
{
        //vscode.window.showInformationMessage("Building file started: "+vscode.window.activeTextEditor.document.fileName);

        var curFileName = vscode.window.activeTextEditor.document.fileName;
        var curFileNameParse = path.parse(curFileName);
        var curCompiler = "cpp";
        var cmd="cmd";
        this._config = vscode.workspace.getConfiguration("execoder");
        var cmd = this._config.get("executorMap")[curCompiler][cmdName];
        if (toStart)
        {
            cmd+=" && \"$fileNameWithoutExt.exe\"";
        }
        var placeholders = [
            //A placeholder that has to be replaced by the code file name without its extension
            { "regex": /\$fileNameWithoutExt/g, "replaceValue":  curFileNameParse.name},
            //A placeholder that has to be replaced by the full code file name
            { "regex": /\$fullFileName/g, "replaceValue": curFileName},
            //A placeholder that has to be replaced by the code file name without the directory
            { "regex": /\$fileName/g, "replaceValue": curFileNameParse.base},
            //A placeholder that has to be replaced by the directory of the code file
            { "regex": /\$dir/g, "replaceValue": curFileNameParse.dir}
        ];
        placeholders.forEach(function (placeholder) {
            cmd = cmd.replace(placeholder.regex, placeholder.replaceValue);
        });
        return cmd;
}

function startCmdMod(resCmd,runType)
{
        //var runningCommand="g++.exe \""+curFileName+"\" -o "+"\""+curFileNameParse.dir+"\\"+curFileNameParse.name+".exe\"";        
        //console.log("Running command: "+resCmd);
        /*this.outputChannel = vscode.window.createOutputChannel("Compiler Output");
        this.outputChannel.append("Run Cmd> "+resCmd+"\n");
        if (runType=="build")
            this.outputChannel.append("Building started!\n");
        else if (runType=="compile")
            this.outputChannel.append("Compile started!\n");
        else if (runType=="link")
            this.outputChannel.append("Link started!\n");*/
        //compilingoutputChannel.show(false);
        //child_process.exec(resCmd, function(err, stdout, stderr) { 
            // Node.js will invoke this callback when the 
            /*vscode.window.showInformationMessage(stdout);
            vscode.window.showInformationMessage(stderr);
            vscode.window.showInformationMessage(err);*/
            /*this.outputChannel.append(stdout);
            this.outputChannel.append(stderr);
            this.outputChannel.append(err);*/
            /*console.log(stdout);
            console.log(stderr);*/
        //});

        this.terminal = vscode.window.createTerminal("ExeCoder");
        this.terminal.show(true);
        this.terminal.sendText(resCmd);

        //vscode.window.createTerminal("Compilling","g++.exe", [curFileName, "-o", curFileNameParse.dir+"\\"+curFileNameParse.name+".exe"]);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "compiler-controller" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var buildFileCommand = vscode.commands.registerCommand('execoder.BuildFile', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');
        /*vscode.commands.executeCommand("g++.exe","\"C:/Users/MazyCrazy/Documents/Visual Studio Code/test_main.cpp\"", 
        "-o", "C:/test_main.exe");*/
        //vscode.workspace.textDocuments[0].fileName;

        var resCmd = getResultCmd("build");

        startCmdMod(resCmd,"build");
    });

    var compileFileCommand = vscode.commands.registerCommand('execoder.CompileFile', function () {
        // The code you place here will be executed every time your command is executed

        var resCmd = getResultCmd("compile");

        startCmdMod(resCmd,"compile");
    });

    var linkFileCommand = vscode.commands.registerCommand('execoder.LinkFile', function () {
        // The code you place here will be executed every time your command is executed

        var resCmd = getResultCmd("link");

        startCmdMod(resCmd,"link");
    });

    var buildnStartFileCommand = vscode.commands.registerCommand('execoder.BuildnStartFile', function () {
        // The code you place here will be executed every time your command is executed

        var resCmd = getResultCmd("build",true);

        startCmdMod(resCmd,"build");
    });

    var linknStartFileCommand = vscode.commands.registerCommand('execoder.LinknStartFile', function () {
        // The code you place here will be executed every time your command is executed

        var resCmd = getResultCmd("link",true);

        startCmdMod(resCmd,"link");
    });

    var startFileCommand = vscode.commands.registerCommand('execoder.StartFile', function () {
        // The code you place here will be executed every time your command is executed

        var curFileName = vscode.window.activeTextEditor.document.fileName;
        var curFileNameParse = path.parse(curFileName);
        
        var resCmd="\""+curFileNameParse.dir+"\\"+curFileNameParse.name+".exe\"";

        /*this.outputChannel = vscode.window.createOutputChannel("Compiler Output");
        this.outputChannel.append("Run Cmd> "+resCmd+"\n");
        this.outputChannel.append("Running started!\n");*/

        this.terminal = vscode.window.createTerminal("ExeCoder");
        this.terminal.show(true);
        this.terminal.sendText(resCmd);

        /*child_process.exec(resCmd, function(err, stdout, stderr) {
            this.outputChannel.append(stdout);
            this.outputChannel.append(stderr);
            this.outputChannel.append(err);
        });*/
    });


    context.subscriptions.push(buildFileCommand);
    context.subscriptions.push(compileFileCommand);
    context.subscriptions.push(linkFileCommand);
    context.subscriptions.push(buildnStartFileCommand);
    context.subscriptions.push(linknStartFileCommand);
    context.subscriptions.push(startFileCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;