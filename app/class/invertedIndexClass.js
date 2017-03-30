/**
 * Inverted Index class
 * @class
 */
class InvertedIndex {

  /**
   * class constructor
   * @constructor
  */
  constructor() {
    this.indices = {};
    this.indexedFiles = {};
  }

  /**
   * function to read uploaded files
   * @function
   * @param {object} file
   * @returns {Promise}
  */
  readFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        try {
          return resolve(JSON.parse(fileReader.result));
        } catch (e) {
          return reject('improperly formatted JSON file');
        }
      };
    });
  }

  /**
   * function to genereate indexes from read files
   * @function
   * @param {Array} fileName
   * @param {string} file
   * @returns {boolean} returns a boolean
  */
  createIndex(fileName, file) {
    if (!file) { return false; }

    const words = [];
    const indexedWords = {};

    file.forEach((book) => {
      words.push(this.tokenize(book));
    });

    words.forEach((book, index) => {
      for (let i = 0; i < book.length; i += 1) {
        if (!indexedWords.hasOwnProperty(book[i])) {
          indexedWords[book[i]] = [];
        }
        indexedWords[book[i]].push(index);
      }
    });

    if (!this.indices.hasOwnProperty(fileName)) {
      this.indices[fileName] = indexedWords;
    }

    this.indexedFiles[fileName] = file.length;
    return true;
  }

  /**
   * function to fetch generated indices
   * @function
   * @param {string} fileName
   * @returns {Object} indices
  */
  getIndices(fileName) {
    if (Object.keys(fileName) === 0) {
      return false;
    }
    return typeof fileName === 'undefined'
    || typeof fileName !== 'string' ? this.indices : this.indices[fileName];
  }

  /**
   * function to search through created indices
   * @function
  * @param {String} fileName uploaded valid JSON file
  * @param {String} query word(s) or terms to search for
  * @returns {array} returns array searchResults contained search indices
  */
  searchIndices(fileName, query) {
    const searchResults = [];
    const result = {};
    let indices = {};

    if (this.getIndices(fileName)) {
      indices[fileName] = this.getIndices(fileName);
    } else {
      indices = this.indices;
    }

    Object.keys(indices).forEach((book) => {
      query.split(' ').forEach((word) => {
        if (Object.prototype.hasOwnProperty.call(indices[book], word)) {
          if (!Object.prototype.hasOwnProperty.call(result, book)) {
            result[book] = {
              terms: {},
              fileName: book
            };
          }
          result[book].terms[word] = indices[book][word];
        }
      });

      searchResults.push(result[book]);
    });

    if (typeof searchResults[0] === 'undefined') {
      return false;
    }

    return searchResults;
  }


  /**
   * function to validate user uploaded files
   * @function
   * @param {object} file
   * @returns {boolean} return boolean for all test cases
  */
  validateFile(file) {
    let isValid = file;

    if (file.length > 0) {
      for (let i = 0; i < file.length; i += 1) {
        if (file[i] === undefined
          || file[i].title === '' || file[i].text === ''
          || !file[i].title || !file[i].text
          || typeof file[i].text !== 'string') {
          isValid = false;
        }
      }
    } else isValid = false;

    return isValid;
  }

  /**
   * remove duplicates from word array
   * @function
   * @param {array} array
   * @returns {array} array equivalent with unique items
  */
  getUnique(array) {
    return array.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  /**
   * format JSON object joining title and text values together
   * @function
   * @param {object} file
   * @returns {array} formatted array
  */
  formatJSON(file) {
    let text;
    let title;
    let newDoc = [];

    for (let item in file) {
      title = file.title;
      text = file.text;
      newDoc.push(`${title} ${text}`);
    }

    newDoc = newDoc.join(' ');
    return newDoc;
  }

  /**
   * trim, remove special characters, white spaces and special characters
   * remove word duplicates
   * @function
   * @param {string} text document title and text
   * @returns {Array} tokens
  */
  tokenize(text) {
    let tokens = [];

    tokens = this.formatJSON(text)
      .trim()
      .toLowerCase()
      .match(/\w+/g)
      .sort();

    tokens = this.getUnique(tokens);
    return tokens;
  }
}
