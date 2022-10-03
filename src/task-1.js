var os = require('os');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if (input === null || input === undefined) return;
    var output = input.split(os.EOL)[0].split('').reverse().join('');
    process.stdout.write(output + '\n');
});