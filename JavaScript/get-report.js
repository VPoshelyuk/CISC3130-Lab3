// file system node module to be able to read files
const fs = require('fs');

/*
    main method that starts the program and handles the input
    * @return {string[]}
 */
const porcessConsoleInput = () => {
    // check if any arguments were provided by user
    const arg = process.argv.slice(2);
    if(arg.length > 1) { // if more than one argument is provided, exit with an error
        console.log("\x1b[31m", "Too many arguments provided", "\x1b[0m");
        process.exit(1);
    }
    // go with default if no input file provided in arguments
    const input = arg[0] || "../data/regional-global-daily-latest.csv";
    // try to read the input into a file
    // if there is an error, exit with appropriate message
    try {
        return fs.readFileSync(input, 'utf8').split('\n');
    } catch(error) {
        console.log("\x1b[31m", "Incorrect file path provided", "\x1b[0m");
        process.exit(1);
    }
}

/*
    * @param {string[]} data
    * @return {Object{}}
 */
const createArtistPairs = (data) => {
    let artists = {};
    data.forEach((line) => { // read every line of input file
        // we only need to process lines that start with a number,
        // since these are the ones that holding the data we need
        if("123456789".includes(line[0])){ 
            // split the line by a "special CSV regex" from where we need
            // only the 3rd argument, which is an artist name
            let artist = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[2];
            // remove quotation marks from the names consisting of 2 or more words
            if(artist.startsWith("\"")) {
                artist = artist.substring(1, artist.length - 1);
            }
            // if there is an artist with the processed name already exists
            // in the object, we update the appearances counter
            // else we create a new key:value pair for them
            artists[artist] = artists[artist] + 1 || 1;
        }
    });
    // return an object holding artist name:appearances pairs
    return artists;
}

/*
    * @param {Object{}} artists
    * @return {Object{}}
 */
const sortByName = (artists) => {
    const sorted = {}
    // sort keys in alphabetical order, then copy the elements of artist object
    // into sorted object in the correct order
    Object.keys(artists).sort((a, b) => a.localeCompare(b)).forEach(key => {
        sorted[key] = artists[key];
    });
    return sorted
}

/*
    * @param {Object{}} artists
    * @return {Object{}}
 */
const sortByNumOfAppearances = (artists) => {
    const sorted = {}
    // sort keys in descending order of their values, then copy the elements of
    // artist object into sorted object in the correct order
    console.log(Object.keys(artists).sort((a,b) => artists[b]-artists[a]))
    Object.keys(artists).sort((a,b) => artists[b]-artists[a]).forEach(key => {
        sorted[key] = artists[key];
    });
    return sorted
}

/*
    print artist names and their appearances numbers in the format of a table
    * @param {Object{}} artists
 */
const consoleLogData = (artists) => {
    console.log("---------------------------------------------------------");
    console.log("|            ARTIST            |     # OF APPEARANCES   |");
    console.log("---------------------------------------------------------");
    Object.keys(artists).forEach((artistName) => {
        console.log(`|${artistName.padStart(26)}    |${artists[artistName].toString().padStart(13)}           |`);
    });
    console.log("---------------------------------------------------------");
}

/*
    write artist names and their appearances numbers into a file
    * @param {Object{}} artists
    * @param {string} filePostfix
 */
const writeToFile = (artists, filePostfix) => {
    let inputFileName;
    // if an input file was provided, name the output file accordingly
    // else go with default
    if (process.argv.slice(2)[0]) {
        console.log(process.argv.slice(2)[0])
        const filePath = process.argv.slice(2)[0].split("/")
        inputFileName = filePath[filePath.length - 1].split(".")[0]
    } else {
        inputFileName = "regional-global-daily-latest"
    }
    // full file name including file path
    const fileName = `../created-reports/report-${inputFileName}-${filePostfix}.txt`;
    // open stream
    const writeStream = fs.createWriteStream(fileName);
    writeStream.write("---------------------------------------------------------\n");
    writeStream.write("|            ARTIST            |     # OF APPEARANCES   |\n");
    writeStream.write("---------------------------------------------------------\n");
    Object.keys(artists).forEach((artistName) => {
        writeStream.write(`|${artistName.padStart(26)}    |${artists[artistName].toString().padStart(13)}           |\n`);
    });
    writeStream.write("---------------------------------------------------------");
    writeStream.on('finish', () => {
        console.log("\x1b[32m", `All data was succesfully written to ${fileName}`, "\x1b[0m");
    });
    // close the stream
    writeStream.end();
}

// call the porcessConsoleInput method and handle the input data
const data = porcessConsoleInput();
// call the createArtistPairs method and process the input data
// to keep only the data we need(artists names && appearances numbers)
const artists = createArtistPairs(data);
// sort artists by name
const artistSortedByName = sortByName(artists);
// sort artists by appearances number
const artistSortedByAppNum = sortByNumOfAppearances(artists);
// output unsorted data to console(table format)
consoleLogData(artists);
// write sorted data to files
writeToFile(artistSortedByAppNum, "sortedByAppNumber");
writeToFile(artistSortedByName, "sortedByName");