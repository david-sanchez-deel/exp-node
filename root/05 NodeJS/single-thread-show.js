let filePath = '/a/b/c"';
filePath = '/'.repeat(100) + '\n';
if (filePath.match(/(\/.+)+$/)) {
    console.log('valid path');
}
else {
    console.log('invalid path');
}